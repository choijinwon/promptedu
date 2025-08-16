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

    // 승인 대기 프롬프트 조회
    const pendingPrompts = await prisma.prompt.findMany({
      where: { status: 'PENDING' },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
          }
        },
        category: {
          select: {
            id: true,
            name: true,
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    const transformedPrompts = pendingPrompts.map((prompt: any) => ({
      id: prompt.id,
      title: prompt.title,
      description: prompt.description,
      content: prompt.content,
      price: prompt.price,
      author: {
        name: prompt.author.name || prompt.author.username,
      },
      category: {
        name: prompt.category.name,
      },
      createdAt: prompt.createdAt,
    }));

    return NextResponse.json({
      prompts: transformedPrompts,
    });

  } catch (error) {
    console.error('Pending prompts error:', error);
    
    // 더 구체적인 오류 메시지 제공
    let errorMessage = '승인 대기 프롬프트를 불러오는데 실패했습니다.';
    if (error instanceof Error) {
      if (error.message.includes('prisma') || error.message.includes('database')) {
        errorMessage = '데이터베이스 연결 오류가 발생했습니다.';
      } else if (error.message.includes('timeout')) {
        errorMessage = '요청 시간이 초과되었습니다.';
      }
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
} 