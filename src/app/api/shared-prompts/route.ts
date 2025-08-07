import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/shared-prompts - 공유 프롬프트 목록 조회 (무료만)
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
      type: 'SHARED', // 공유 프롬프트용만 조회
      price: 0, // 무료 프롬프트만 조회
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
      price: prompt.price, // 항상 0
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
    console.error('Get shared prompts error:', error);
    return NextResponse.json(
      { error: '공유 프롬프트 목록을 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}
