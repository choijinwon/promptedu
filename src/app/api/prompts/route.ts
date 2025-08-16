import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth';

// GET /api/prompts - 프롬프트 목록 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const status = searchParams.get('status') || 'ACTIVE';
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    console.log('🔍 Fetching prompts with params:', { page, limit, category, search, status, sortBy, sortOrder });

    // 현재는 빈 배열 반환
    const prompts = [];
    const total = 0;

    console.log('✅ Returning prompts:', { total, page, limit, returned: prompts.length });

    return NextResponse.json({
      prompts: prompts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      isSampleData: false
    });

  } catch (error) {
    console.error('Get prompts error:', error);
    return NextResponse.json(
      { error: '프롬프트 목록을 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}

// POST /api/prompts - 새 프롬프트 생성
export async function POST(request: NextRequest) {
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

    return NextResponse.json(
      { error: '현재 프롬프트 생성 기능은 사용할 수 없습니다. 데이터베이스 스키마가 초기화되었습니다.' },
      { status: 503 }
    );

  } catch (error) {
    console.error('Create prompt error:', error);
    return NextResponse.json(
      { error: '프롬프트 생성에 실패했습니다.' },
      { status: 500 }
    );
  }
} 