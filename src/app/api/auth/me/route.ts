import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
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

    // 임시 토큰 처리
    if (token === 'temp-token-for-testing') {
      console.log('✅ Temporary token detected, returning test user');
      return NextResponse.json({
        user: {
          id: 'temp-user-id',
          email: 'a@test.com',
          username: 'testuser',
          name: '테스트 사용자',
          role: 'USER',
          isVerified: true,
          createdAt: new Date().toISOString(),
        },
        isTemporary: true
      });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: '유효하지 않은 토큰입니다.' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        role: true,
        isVerified: true,
        createdAt: true,
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: '사용자를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      user,
    });

  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { error: '사용자 정보를 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
} 