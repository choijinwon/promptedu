import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth';
import { getUserById } from '@/lib/supabase-db';

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

    // 관리자 권한 확인
    const user = await getUserById(payload.userId);

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: '관리자 권한이 필요합니다.' },
        { status: 403 }
      );
    }

    // 임시 데이터 (실제 데이터베이스 연동 전까지)
    const mockData = {
      users: [
        {
          id: '47bb0342-bedc-4d44-9af5-2aa4e5ff3cfa',
          email: 'a@test.com',
          username: 'testuser',
          name: '테스트 사용자',
          role: 'USER',
          isVerified: false,
          createdAt: new Date().toISOString(),
          _count: { prompts: 0 }
        },
        {
          id: 'c950dc88-2f43-4c12-a957-1eebe05660a7',
          email: 'admin@example.com',
          username: 'admin',
          name: '관리자',
          role: 'ADMIN',
          isVerified: false,
          createdAt: new Date().toISOString(),
          _count: { prompts: 0 }
        }
      ]
    };

    return NextResponse.json(mockData);

  } catch (error) {
    console.error('Get users error:', error);
    return NextResponse.json(
      { error: '사용자 목록을 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
} 