import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
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

    // 임시 응답 (실제 데이터베이스 연동 전까지)
    return NextResponse.json({
      application: null
    });

  } catch (error) {
    console.error('Get application error:', error);
    return NextResponse.json(
      { error: '신청서 조회에 실패했습니다.' },
      { status: 500 }
    );
  }
}

// PUT /api/creator/applications - 승인/거부 처리 (관리자)
export async function PUT(request: NextRequest) {
  try {
    const token = extractTokenFromHeader(request.headers.get('authorization') || undefined);
    if (!token) return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
    const payload = verifyToken(token);
    if (!payload) return NextResponse.json({ error: '유효하지 않은 토큰입니다.' }, { status: 401 });

    const { applicationId, action, reviewNote } = await request.json();
    if (!applicationId || !['APPROVED', 'REJECTED'].includes(action)) {
      return NextResponse.json({ error: '잘못된 요청입니다.' }, { status: 400 });
    }

    // 임시 응답 (실제 데이터베이스 연동 전까지)
    return NextResponse.json({ 
      message: '처리 완료', 
      application: {
        id: applicationId,
        status: action,
        reviewedBy: payload.userId,
        reviewedAt: new Date().toISOString(),
        reviewNote: reviewNote || null,
        user: {
          id: 'temp-user-id',
          name: '사용자',
          email: 'user@example.com'
        }
      }
    });
  } catch (error) {
    console.error('Approve/reject creator application error:', error);
    return NextResponse.json({ error: '처리 실패' }, { status: 500 });
  }
} 