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

    const { promptId, content, parentId } = await request.json();

    if (!promptId || !content) {
      return NextResponse.json(
        { error: '프롬프트 ID와 댓글 내용이 필요합니다.' },
        { status: 400 }
      );
    }

    // 임시 응답 (실제 데이터베이스 연동 전까지)
    const tempComment = {
      id: 'temp-comment-id',
      userId: payload.userId,
      promptId: promptId,
      content: content,
      parentId: parentId || null,
      createdAt: new Date().toISOString(),
      user: {
        id: payload.userId,
        name: '사용자',
        username: 'user',
        avatar: null
      },
      replies: []
    };

    return NextResponse.json({
      message: '댓글이 작성되었습니다.',
      comment: tempComment,
    });
  } catch (error) {
    console.error('Create comment error:', error);
    return NextResponse.json(
      { error: '댓글 작성에 실패했습니다.' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const promptId = searchParams.get('promptId');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    if (!promptId) {
      return NextResponse.json(
        { error: '프롬프트 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    // 임시 데이터 (실제 데이터베이스 연동 전까지)
    const mockData = {
      comments: [],
      total: 0,
      page,
      totalPages: 0,
    };

    return NextResponse.json(mockData);
  } catch (error) {
    console.error('Get comments error:', error);
    return NextResponse.json(
      { error: '댓글 목록을 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}
