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

    // 임시 구매 내역 데이터 (실제 주문 테이블 연동 전까지)
    const mockPurchases = [
      {
        id: '1',
        promptId: '1',
        amount: 1000,
        status: 'COMPLETED',
        createdAt: new Date().toISOString(),
        prompt: {
          id: '1',
          title: '샘플 프롬프트 1',
          description: '샘플 프롬프트 설명입니다.',
          content: '샘플 프롬프트 내용입니다.',
          price: 1000,
          category: {
            name: '일반',
            icon: '📝',
            color: '#3B82F6',
          },
          author: {
            name: '샘플 작성자 1',
          },
          tags: ['샘플', '테스트'],
          downloads: 10,
          rating: 4.5,
          createdAt: new Date().toISOString(),
        }
      },
      {
        id: '2',
        promptId: '2',
        amount: 2000,
        status: 'COMPLETED',
        createdAt: new Date().toISOString(),
        prompt: {
          id: '2',
          title: '샘플 프롬프트 2',
          description: '샘플 프롬프트 설명입니다.',
          content: '샘플 프롬프트 내용입니다.',
          price: 2000,
          category: {
            name: '마케팅',
            icon: '📈',
            color: '#10B981',
          },
          author: {
            name: '샘플 작성자 2',
          },
          tags: ['마케팅', '광고'],
          downloads: 25,
          rating: 4.8,
          createdAt: new Date().toISOString(),
        }
      }
    ];

    return NextResponse.json({
      purchases: mockPurchases,
      total: mockPurchases.length,
    });

  } catch (error) {
    console.error('Get purchases error:', error);
    return NextResponse.json(
      { error: '구매 내역을 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}
