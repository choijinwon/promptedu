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

    const { role } = await request.json();

    // 유효한 역할인지 확인
    const validRoles = ['USER', 'CREATOR', 'ADMIN'];
    if (!validRoles.includes(role)) {
      return NextResponse.json(
        { error: '유효하지 않은 역할입니다.' },
        { status: 400 }
      );
    }

    // 자기 자신의 역할을 변경하려는 경우 방지
    if (id === payload.userId) {
      return NextResponse.json(
        { error: '자기 자신의 역할은 변경할 수 없습니다.' },
        { status: 400 }
      );
    }

    // 임시 응답 (실제 데이터베이스 연동 전까지)
    return NextResponse.json({
      message: '사용자 역할이 성공적으로 변경되었습니다.',
      user: {
        id: id,
        email: 'user@example.com',
        username: 'user',
        name: '사용자',
        role: role,
        isVerified: false,
        createdAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Update user role error:', error);
    return NextResponse.json(
      { error: '사용자 역할 변경에 실패했습니다.' },
      { status: 500 }
    );
  }
} 