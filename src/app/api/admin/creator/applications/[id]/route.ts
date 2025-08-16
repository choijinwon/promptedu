import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth';
import { getUserById } from '@/lib/supabase-db';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const token = extractTokenFromHeader(request.headers.get('authorization') || undefined);
    if (!token) {
      return NextResponse.json(
        { error: '인증이 필요합니다.' },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: '유효하지 않은 토큰입니다.' },
        { status: 401 }
      );
    }

    // 관리자 권한 확인
    const adminUser = await getUserById(payload.userId);

    if (!adminUser || adminUser.role !== 'ADMIN') {
      return NextResponse.json(
        { error: '관리자 권한이 필요합니다.' },
        { status: 403 }
      );
    }

    const { action, feedback } = await request.json();

    // 유효한 액션인지 확인
    if (!['approve', 'reject'].includes(action)) {
      return NextResponse.json(
        { error: '유효하지 않은 액션입니다.' },
        { status: 400 }
      );
    }

    // 임시 응답 (실제 데이터베이스 연동 전까지)
    return NextResponse.json({
      message: action === 'approve' 
        ? '크리에이터 신청이 승인되었습니다.' 
        : '크리에이터 신청이 거부되었습니다.',
      application: {
        id: id,
        status: action === 'approve' ? 'APPROVED' : 'REJECTED',
        reviewedAt: new Date().toISOString(),
        reviewedBy: payload.userId,
        feedback: feedback || null
      }
    });

  } catch (error) {
    console.error('Update creator application error:', error);
    return NextResponse.json(
      { error: '신청서 처리에 실패했습니다.' },
      { status: 500 }
    );
  }
} 