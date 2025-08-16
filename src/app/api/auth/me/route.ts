import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getUserById } from '@/lib/supabase-db';

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json(
        { error: '토큰이 필요합니다.' },
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

    // 임시 사용자 토큰 처리
    if (payload.userId === 'temp-user-id') {
      return NextResponse.json({
        user: {
          id: 'temp-user-id',
          email: 'a@test.com',
          username: 'testuser',
          name: '테스트 사용자',
          role: 'USER',
          isVerified: true,
        }
      });
    }

    // 임시 관리자 토큰 처리
    if (payload.userId === 'temp-admin-id') {
      return NextResponse.json({
        user: {
          id: 'temp-admin-id',
          email: 'admin@example.com',
          username: 'admin',
          name: '관리자',
          role: 'ADMIN',
          isVerified: true,
        }
      });
    }

    // Supabase에서 사용자 정보 조회 시도
    try {
      const user = await getUserById(payload.userId);
      if (user) {
        const { password: _, ...userWithoutPassword } = user;
        return NextResponse.json({
          user: userWithoutPassword
        });
      }
    } catch (error) {
      console.error('Supabase user lookup failed:', error);
    }

    return NextResponse.json(
      { error: '사용자를 찾을 수 없습니다.' },
      { status: 404 }
    );

  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { error: '사용자 정보를 가져오는데 실패했습니다.' },
      { status: 500 }
    );
  }
} 