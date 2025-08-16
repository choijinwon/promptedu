import { NextRequest, NextResponse } from "next/server";
import { extractTokenFromHeader, verifyToken } from "@/lib/auth";
import { getUserById } from "@/lib/supabase-db";

// PUT /api/prompts/approve - 프롬프트 승인/거부
export async function PUT(request: NextRequest) {
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

    const { promptId, action } = await request.json();

    if (!promptId || !action) {
      return NextResponse.json(
        { error: '프롬프트 ID와 액션(approve/reject)이 필요합니다.' },
        { status: 400 }
      );
    }

    if (!['approve', 'reject'].includes(action)) {
      return NextResponse.json(
        { error: '유효하지 않은 액션입니다. approve 또는 reject를 사용하세요.' },
        { status: 400 }
      );
    }

    // 임시 응답 (실제 프롬프트 테이블 연동 전까지)
    return NextResponse.json({
      message: action === 'approve' ? '프롬프트가 승인되었습니다.' : '프롬프트가 거부되었습니다.',
      prompt: {
        id: promptId,
        title: '샘플 프롬프트',
        status: action === 'approve' ? 'ACTIVE' : 'REJECTED',
        approvedAt: action === 'approve' ? new Date().toISOString() : null,
        author: '샘플 작성자',
        category: '일반',
      }
    });

  } catch (error) {
    console.error('Approve prompt error:', error);
    return NextResponse.json(
      { error: '프롬프트 승인 처리에 실패했습니다.' },
      { status: 500 }
    );
  }
}

// GET /api/prompts/approve - 승인 대기 중인 프롬프트 목록
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

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status') || 'PENDING';

    // 임시 데이터 (실제 프롬프트 테이블 연동 전까지)
    const mockPrompts = [
      {
        id: '1',
        title: '샘플 프롬프트 1',
        description: '샘플 프롬프트 설명입니다.',
        content: '샘플 프롬프트 내용입니다.',
        price: 1000,
        category: '일반',
        author: '샘플 작성자 1',
        authorEmail: 'author1@example.com',
        tags: ['샘플', '테스트'],
        status: 'PENDING',
        createdAt: new Date().toISOString(),
        approvedAt: null,
        approvedBy: null,
      },
      {
        id: '2',
        title: '샘플 프롬프트 2',
        description: '샘플 프롬프트 설명입니다.',
        content: '샘플 프롬프트 내용입니다.',
        price: 2000,
        category: '마케팅',
        author: '샘플 작성자 2',
        authorEmail: 'author2@example.com',
        tags: ['마케팅', '광고'],
        status: 'PENDING',
        createdAt: new Date().toISOString(),
        approvedAt: null,
        approvedBy: null,
      }
    ];

    const total = mockPrompts.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPrompts = mockPrompts.slice(startIndex, endIndex);

    return NextResponse.json({
      prompts: paginatedPrompts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      }
    });

  } catch (error) {
    console.error('Get pending prompts error:', error);
    return NextResponse.json(
      { error: '승인 대기 프롬프트 목록을 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
} 