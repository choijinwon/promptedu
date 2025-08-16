import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const token = extractTokenFromHeader(request.headers.get('authorization') || undefined);
    if (!token) {
      return NextResponse.json(
        { error: '로그인이 필요합니다.' },
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

    // 사용자가 구매한 프롬프트 조회
    const purchases = await prisma.order.findMany({
      where: {
        userId: payload.userId,
        status: 'COMPLETED',
      },
      include: {
        prompt: {
          include: {
            author: {
              select: {
                name: true,
                username: true,
              }
            },
            category: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc',
      }
    });

    const transformedPurchases = purchases.map(purchase => ({
      id: purchase.id,
      promptId: purchase.promptId,
      amount: purchase.amount,
      status: purchase.status,
      createdAt: purchase.createdAt,
      prompt: {
        id: purchase.prompt.id,
        title: purchase.prompt.title,
        description: purchase.prompt.description,
        content: purchase.prompt.content,
        price: purchase.prompt.price,
        category: {
          name: purchase.prompt.category.name,
          icon: purchase.prompt.category.icon,
          color: purchase.prompt.category.color,
        },
        author: {
          name: purchase.prompt.author.name || purchase.prompt.author.username,
        },
        tags: JSON.parse(purchase.prompt.tags || '[]'),
        downloads: purchase.prompt.downloads,
        rating: purchase.prompt.rating,
        createdAt: purchase.prompt.createdAt,
      }
    }));

    return NextResponse.json({
      purchases: transformedPurchases,
      total: transformedPurchases.length,
    });

  } catch (error) {
    console.error('Get purchases error:', error);
    return NextResponse.json(
      { error: '구매 내역을 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}
