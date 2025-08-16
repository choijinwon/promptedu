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

    // 임시 관리자 토큰 처리
    if (token === 'temp-admin-token-for-testing') {
      console.log('✅ Temporary admin token detected for dashboard');
      return NextResponse.json({
        stats: {
          totalUsers: 150,
          totalPrompts: 45,
          pendingPrompts: 12,
          totalRevenue: 250000,
          monthlyRevenue: 45000,
        },
        recentActivity: [
          {
            id: '1',
            type: 'prompt_created',
            message: '새 프롬프트가 등록되었습니다.',
            timestamp: new Date().toISOString(),
          },
          {
            id: '2',
            type: 'user_registered',
            message: '새 사용자가 가입했습니다.',
            timestamp: new Date(Date.now() - 3600000).toISOString(),
          },
        ],
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

    if (payload.role !== 'ADMIN') {
      return NextResponse.json(
        { error: '관리자 권한이 필요합니다.' },
        { status: 403 }
      );
    }

    // 실제 데이터베이스에서 통계를 가져오는 로직 (현재는 샘플 데이터)
    return NextResponse.json({
      stats: {
        totalUsers: 150,
        totalPrompts: 45,
        pendingPrompts: 12,
        totalRevenue: 250000,
        monthlyRevenue: 45000,
      },
      recentActivity: [
        {
          id: '1',
          type: 'prompt_created',
          message: '새 프롬프트가 등록되었습니다.',
          timestamp: new Date().toISOString(),
        },
        {
          id: '2',
          type: 'user_registered',
          message: '새 사용자가 가입했습니다.',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
        },
      ]
    });

  } catch (error) {
    console.error('Dashboard error:', error);
    return NextResponse.json(
      { error: '대시보드 정보를 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}
