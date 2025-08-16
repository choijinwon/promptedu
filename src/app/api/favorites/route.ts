import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth';

export async function POST(request: NextRequest) {
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

    const { promptId } = await request.json();

    if (!promptId) {
      return NextResponse.json(
        { error: '프롬프트 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    // 임시 응답 (실제 데이터베이스 연동 전까지)
    const tempFavorite = {
      id: 'temp-favorite-id',
      userId: payload.userId,
      promptId: promptId,
      createdAt: new Date().toISOString(),
      prompt: {
        id: promptId,
        title: '프롬프트 제목',
        description: '프롬프트 설명',
        price: 0,
        author: {
          name: '작성자',
          username: 'author'
        },
        category: {
          name: '카테고리',
          icon: '📁',
          color: '#000000'
        }
      }
    };

    return NextResponse.json({
      message: '💖 즐겨찾기에 추가되었습니다!',
      favorite: tempFavorite,
    });
  } catch (error) {
    console.error('Add favorite error:', error);
    return NextResponse.json(
      { error: '즐겨찾기 추가에 실패했습니다.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
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

    const { searchParams } = new URL(request.url);
    const promptId = searchParams.get('promptId');

    if (!promptId) {
      return NextResponse.json(
        { error: '프롬프트 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    // 임시 응답 (실제 데이터베이스 연동 전까지)
    return NextResponse.json({
      message: '💔 즐겨찾기에서 삭제되었습니다.',
    });
  } catch (error) {
    console.error('Remove favorite error:', error);
    return NextResponse.json(
      { error: '즐겨찾기 제거에 실패했습니다.' },
      { status: 500 }
    );
  }
}

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

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');

    // 임시 데이터 (실제 데이터베이스 연동 전까지)
    const mockData = {
      favorites: [],
      total: 0,
      page,
      totalPages: 0,
    };

    return NextResponse.json(mockData);
  } catch (error) {
    console.error('Get favorites error:', error);
    return NextResponse.json(
      { error: '즐겨찾기 목록을 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}
