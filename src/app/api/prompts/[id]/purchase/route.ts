import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const promptId = params.id;

    // 프롬프트 조회
    const prompt = await prisma.prompt.findUnique({
      where: { id: promptId },
      include: {
        author: true,
        category: true,
      }
    });

    if (!prompt) {
      return NextResponse.json(
        { error: '프롬프트를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    if (prompt.status !== 'ACTIVE') {
      return NextResponse.json(
        { error: '판매 중이 아닌 프롬프트입니다.' },
        { status: 400 }
      );
    }

    // 무료 프롬프트인 경우 바로 다운로드
    if (prompt.price === 0) {
      // 다운로드 수 증가
      await prisma.prompt.update({
        where: { id: promptId },
        data: { downloads: { increment: 1 } }
      });

      return NextResponse.json({
        message: '무료 프롬프트가 다운로드되었습니다.',
        prompt: {
          id: prompt.id,
          title: prompt.title,
          content: prompt.content,
          author: prompt.author.name,
          category: prompt.category.name,
        }
      });
    }

    // 유료 프롬프트인 경우 구매 처리
    // 이미 구매했는지 확인
    const existingOrder = await prisma.order.findFirst({
      where: {
        userId: payload.userId,
        promptId: promptId,
        status: 'COMPLETED'
      }
    });

    if (existingOrder) {
      return NextResponse.json({
        message: '이미 구매한 프롬프트입니다.',
        prompt: {
          id: prompt.id,
          title: prompt.title,
          content: prompt.content,
          author: prompt.author.name,
          category: prompt.category.name,
        }
      });
    }

    // 주문 생성 (실제 결제는 별도 구현 필요)
    const order = await prisma.order.create({
      data: {
        userId: payload.userId,
        promptId: promptId,
        amount: prompt.price,
        status: 'COMPLETED', // 실제로는 결제 완료 후 COMPLETED로 변경
        paymentMethod: 'CREDIT_CARD',
        transactionId: `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      }
    });

    // 다운로드 수 증가
    await prisma.prompt.update({
      where: { id: promptId },
      data: { downloads: { increment: 1 } }
    });

    return NextResponse.json({
      message: '프롬프트 구매가 완료되었습니다.',
      order: {
        id: order.id,
        amount: order.amount,
        status: order.status,
      },
      prompt: {
        id: prompt.id,
        title: prompt.title,
        content: prompt.content,
        author: prompt.author.name,
        category: prompt.category.name,
      }
    });

  } catch (error) {
    console.error('Purchase error:', error);
    return NextResponse.json(
      { error: '구매 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
