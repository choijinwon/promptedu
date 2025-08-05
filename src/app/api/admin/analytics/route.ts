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

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: '유효하지 않은 토큰입니다.' },
        { status: 401 }
      );
    }

    // 관리자 권한 확인
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { role: true }
    });

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: '관리자 권한이 필요합니다.' },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const timeRange = parseInt(searchParams.get('timeRange') || '30');
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - timeRange);

    // 기본 통계
    const [totalUsers, totalPrompts, totalRevenue, totalOrders] = await Promise.all([
      prisma.user.count(),
      prisma.prompt.count(),
      prisma.order.aggregate({
        where: { status: 'COMPLETED' },
        _sum: { amount: true }
      }),
      prisma.order.count({
        where: { status: 'COMPLETED' }
      })
    ]);

    // 월별 통계 (최근 6개월)
    const monthlyStats = [];
    for (let i = 5; i >= 0; i--) {
      const monthStart = new Date();
      monthStart.setMonth(monthStart.getMonth() - i);
      monthStart.setDate(1);
      monthStart.setHours(0, 0, 0, 0);
      
      const monthEnd = new Date(monthStart);
      monthEnd.setMonth(monthEnd.getMonth() + 1);
      monthEnd.setDate(0);
      monthEnd.setHours(23, 59, 59, 999);

      const [users, prompts, revenue] = await Promise.all([
        prisma.user.count({
          where: {
            createdAt: {
              gte: monthStart,
              lte: monthEnd
            }
          }
        }),
        prisma.prompt.count({
          where: {
            createdAt: {
              gte: monthStart,
              lte: monthEnd
            }
          }
        }),
        prisma.order.aggregate({
          where: {
            status: 'COMPLETED',
            createdAt: {
              gte: monthStart,
              lte: monthEnd
            }
          },
          _sum: { amount: true }
        })
      ]);

      monthlyStats.push({
        month: monthStart.toLocaleDateString('ko-KR', { year: 'numeric', month: 'short' }),
        users,
        prompts,
        revenue: revenue._sum.amount || 0
      });
    }

    // 카테고리별 통계
    const categoryStats = await prisma.category.findMany({
      select: {
        name: true,
        _count: {
          select: {
            prompts: true
          }
        },
        prompts: {
          select: {
            orders: {
              where: { status: 'COMPLETED' },
              select: { amount: true }
            }
          }
        }
      }
    });

    const categoryStatsFormatted = categoryStats.map(category => ({
      categoryName: category.name,
      promptCount: category._count.prompts,
      totalRevenue: category.prompts.reduce((sum, prompt) => 
        sum + prompt.orders.reduce((orderSum, order) => orderSum + (order.amount || 0), 0), 0
      )
    }));

    // 인기 크리에이터 (상위 5명)
    const topCreators = await prisma.user.findMany({
      where: {
        role: 'CREATOR',
        prompts: {
          some: {}
        }
      },
      select: {
        name: true,
        username: true,
        _count: {
          select: {
            prompts: true
          }
        },
        prompts: {
          select: {
            orders: {
              where: { status: 'COMPLETED' },
              select: { amount: true }
            }
          }
        }
      },
      orderBy: {
        prompts: {
          _count: 'desc'
        }
      },
      take: 5
    });

    const topCreatorsFormatted = topCreators.map(creator => ({
      creatorName: creator.name || creator.username,
      promptCount: creator._count.prompts,
      totalRevenue: creator.prompts.reduce((sum, prompt) => 
        sum + prompt.orders.reduce((orderSum, order) => orderSum + (order.amount || 0), 0), 0
      )
    }));

    // 최근 활동 (최근 10개)
    const recentActivity = await Promise.all([
      // 최근 사용자 가입
      prisma.user.findMany({
        where: {
          createdAt: { gte: startDate }
        },
        select: {
          name: true,
          username: true,
          createdAt: true
        },
        orderBy: { createdAt: 'desc' },
        take: 3
      }),
      // 최근 프롬프트 등록
      prisma.prompt.findMany({
        where: {
          createdAt: { gte: startDate }
        },
        select: {
          title: true,
          createdAt: true,
          author: {
            select: { name: true, username: true }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: 3
      }),
      // 최근 주문
      prisma.order.findMany({
        where: {
          createdAt: { gte: startDate },
          status: 'COMPLETED'
        },
        select: {
          amount: true,
          createdAt: true,
          prompt: {
            select: { title: true }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: 4
      })
    ]);

    const [recentUsers, recentPrompts, recentOrders] = recentActivity;

    const activityList = [
      ...recentUsers.map(user => ({
        type: 'user',
        description: `${user.name || user.username}님이 가입했습니다.`,
        timestamp: user.createdAt.toISOString()
      })),
      ...recentPrompts.map(prompt => ({
        type: 'prompt',
        description: `${prompt.author.name || prompt.author.username}님이 "${prompt.title}" 프롬프트를 등록했습니다.`,
        timestamp: prompt.createdAt.toISOString()
      })),
      ...recentOrders.map(order => ({
        type: 'order',
        description: `"${order.prompt.title}" 프롬프트가 ${order.amount?.toLocaleString()}원에 판매되었습니다.`,
        timestamp: order.createdAt.toISOString()
      }))
    ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 10);

    return NextResponse.json({
      totalUsers,
      totalPrompts,
      totalRevenue: totalRevenue._sum.amount || 0,
      totalOrders,
      monthlyStats,
      categoryStats: categoryStatsFormatted,
      topCreators: topCreatorsFormatted,
      recentActivity: activityList
    });

  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json(
      { error: '통계 데이터를 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
} 