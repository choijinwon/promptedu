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

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {
      status: status as any,
      isPublic: true, // 공개된 프롬프트만 조회
      type: 'MARKETPLACE', // 마켓플레이스용 프롬프트만 조회
    };

    if (category && category !== '전체') {
      where.category = {
        name: category
      };
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
        { tags: { contains: search } },
      ];
    }

    // Build order by clause
    const orderBy: any = {};
    switch (sortBy) {
      case 'downloads':
        orderBy.downloads = sortOrder;
        break;
      case 'rating':
        orderBy.rating = sortOrder;
        break;
      case 'price':
        orderBy.price = sortOrder;
        break;
      case 'views':
        orderBy.views = sortOrder;
        break;
      default:
        orderBy.createdAt = sortOrder;
    }

    // Get prompts with pagination
    const [prompts, total] = await Promise.all([
      prisma.prompt.findMany({
        where,
        include: {
          category: true,
          author: {
            select: {
              id: true,
              username: true,
              name: true,
              avatar: true,
            }
          },
          _count: {
            select: {
              reviews: true,
              favorites: true,
            }
          }
        },
        orderBy,
        skip,
        take: limit,
      }),
      prisma.prompt.count({ where })
    ]);

    // Transform data
    const transformedPrompts = prompts.map((prompt: any) => ({
      id: prompt.id,
      title: prompt.title,
      description: prompt.description,
      content: prompt.content,
      price: prompt.price,
      category: {
        name: prompt.category.name,
        icon: prompt.category.icon || '📝',
        color: prompt.category.color || '#3B82F6',
      },
      author: {
        name: prompt.author.name || prompt.author.username,
      },
      rating: prompt.rating,
      downloads: prompt.downloads,
      views: prompt.views,
      tags: JSON.parse(prompt.tags || '[]'),
      image: prompt.image,
      reviewCount: prompt._count.reviews,
      favoriteCount: prompt._count.favorites,
      createdAt: prompt.createdAt,
    }));

    return NextResponse.json({
      prompts: transformedPrompts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      }
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