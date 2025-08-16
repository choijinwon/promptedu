import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
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

    // 임시 샘플 데이터 반환 (데이터베이스 연결 문제 해결 전까지)
    const samplePrompts = [
      {
        id: 'sample-1',
        title: 'ChatGPT 마케팅 전문가 프롬프트',
        description: '마케팅 전략과 콘텐츠 제작을 위한 전문적인 ChatGPT 프롬프트입니다.',
        content: '당신은 10년 경력의 마케팅 전문가입니다. 다음 요청에 대해 전문적인 조언을 제공해주세요...',
        price: 5000,
        category: {
          name: '마케팅',
          icon: '📈',
          color: '#10B981',
        },
        author: {
          name: '마케팅 전문가',
        },
        rating: 4.8,
        downloads: 150,
        views: 1200,
        tags: ['마케팅', '콘텐츠', '전략'],
        image: null,
        reviewCount: 25,
        favoriteCount: 45,
        createdAt: new Date('2024-01-15').toISOString(),
      },
      {
        id: 'sample-2',
        title: 'Claude 창작 도우미 프롬프트',
        description: '소설, 시, 에세이 등 창작 활동을 돕는 Claude 전용 프롬프트입니다.',
        content: '당신은 창작 활동을 돕는 문학 전문가입니다. 다음 창작 요청에 대해 도움을 주세요...',
        price: 3000,
        category: {
          name: '창작',
          icon: '✍️',
          color: '#8B5CF6',
        },
        author: {
          name: '창작 전문가',
        },
        rating: 4.9,
        downloads: 200,
        views: 1800,
        tags: ['창작', '문학', '소설'],
        image: null,
        reviewCount: 30,
        favoriteCount: 60,
        createdAt: new Date('2024-01-10').toISOString(),
      },
      {
        id: 'sample-3',
        title: 'GPT-4 비즈니스 분석 프롬프트',
        description: '비즈니스 데이터 분석과 인사이트 도출을 위한 GPT-4 전용 프롬프트입니다.',
        content: '당신은 비즈니스 분석 전문가입니다. 제공된 데이터를 분석하여 인사이트를 도출해주세요...',
        price: 8000,
        category: {
          name: '비즈니스',
          icon: '💼',
          color: '#3B82F6',
        },
        author: {
          name: '비즈니스 분석가',
        },
        rating: 4.7,
        downloads: 80,
        views: 950,
        tags: ['비즈니스', '분석', '데이터'],
        image: null,
        reviewCount: 15,
        favoriteCount: 25,
        createdAt: new Date('2024-01-05').toISOString(),
      }
    ];

    // 검색 필터링 (간단한 구현)
    let filteredPrompts = samplePrompts;
    if (search) {
      filteredPrompts = samplePrompts.filter(prompt => 
        prompt.title.toLowerCase().includes(search.toLowerCase()) ||
        prompt.description.toLowerCase().includes(search.toLowerCase()) ||
        prompt.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
      );
    }

    if (category && category !== '전체') {
      filteredPrompts = filteredPrompts.filter(prompt => 
        prompt.category.name === category
      );
    }

    // 페이지네이션
    const total = filteredPrompts.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPrompts = filteredPrompts.slice(startIndex, endIndex);

    console.log('✅ Returning sample prompts:', { total, page, limit, returned: paginatedPrompts.length });

    return NextResponse.json({
      prompts: paginatedPrompts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      isSampleData: true
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

    const { title, description, content, price, categoryId, tags, isPublic, type } = await request.json();

    // Validation
    if (!title || !description || !content || !categoryId) {
      return NextResponse.json(
        { error: '제목, 설명, 내용, 카테고리는 필수입니다.' },
        { status: 400 }
      );
    }

    // Validate price
    const priceValue = parseInt(price) || 0;
    if (priceValue < 0) {
      return NextResponse.json(
        { error: '가격은 0 이상이어야 합니다.' },
        { status: 400 }
      );
    }

    // Check if category exists
    const category = await prisma.category.findUnique({
      where: { id: categoryId }
    });

    if (!category) {
      return NextResponse.json(
        { error: '존재하지 않는 카테고리입니다.' },
        { status: 400 }
      );
    }

    // Create prompt
    const prompt = await prisma.prompt.create({
      data: {
        title,
        description,
        content,
        price: priceValue,
        categoryId,
        authorId: payload.userId,
        tags: JSON.stringify(Array.isArray(tags) ? tags : []),
        isPublic: isPublic === 'true' || isPublic === true,
        type: type || 'MARKETPLACE', // 기본값은 마켓플레이스
        status: 'PENDING', // 관리자 승인 필요
      },
      include: {
        category: true,
        author: {
          select: {
            id: true,
            username: true,
            name: true,
          }
        }
      }
    });

    return NextResponse.json({
      message: '프롬프트가 성공적으로 생성되었습니다. 관리자 승인 후 공개됩니다.',
      prompt: {
        id: prompt.id,
        title: prompt.title,
        description: prompt.description,
        price: prompt.price,
        category: prompt.category.name,
        author: prompt.author.name || prompt.author.username,
        status: prompt.status,
        createdAt: prompt.createdAt,
      }
    });

  } catch (error) {
    console.error('Create prompt error:', error);
    return NextResponse.json(
      { error: '프롬프트 생성에 실패했습니다.' },
      { status: 500 }
    );
  }
} 