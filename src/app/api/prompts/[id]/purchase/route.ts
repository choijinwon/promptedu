import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
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

    const promptId = id;

    // 임시 응답 (실제 데이터베이스 연동 전까지)
    const tempOrder = {
      id: 'temp-order-id',
      amount: 5000,
      status: 'COMPLETED',
    };

    const tempPrompt = {
      id: promptId,
      title: '프롬프트 제목',
      content: '프롬프트 내용',
      author: '작성자',
      category: '카테고리',
    };

    return NextResponse.json({
      message: '프롬프트 구매가 완료되었습니다.',
      order: tempOrder,
      prompt: tempPrompt,
    });

  } catch (error) {
    console.error('Purchase error:', error);
    return NextResponse.json(
      { error: '구매 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
