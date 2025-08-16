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

    // 임시 통계 데이터 (실제 데이터베이스 연동 전까지)
    const mockData = {
      totalUsers: 2,
      totalPrompts: 0,
      totalRevenue: 0,
      totalOrders: 0,
      monthlyStats: [
        { month: '2024년 8월', users: 2, prompts: 0, revenue: 0 },
        { month: '2024년 7월', users: 0, prompts: 0, revenue: 0 },
        { month: '2024년 6월', users: 0, prompts: 0, revenue: 0 },
        { month: '2024년 5월', users: 0, prompts: 0, revenue: 0 },
        { month: '2024년 4월', users: 0, prompts: 0, revenue: 0 },
        { month: '2024년 3월', users: 0, prompts: 0, revenue: 0 }
      ],
      categoryStats: [],
      topCreators: [],
      recentActivity: [
        {
          type: 'user',
          description: '테스트 사용자님이 가입했습니다.',
          timestamp: new Date().toISOString()
        },
        {
          type: 'user',
          description: '관리자님이 가입했습니다.',
          timestamp: new Date().toISOString()
        }
      ]
    };

    return NextResponse.json(mockData);

  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json(
      { error: '통계 데이터를 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
} 