import { NextRequest, NextResponse } from "next/server";
import { extractTokenFromHeader, verifyToken } from "@/lib/auth";

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

    // 관리자 권한 확인 (간단한 체크 - 실제로는 더 복잡한 권한 시스템 필요)
    const user = await prisma.user.findUnique({
      where: { id: payload.userId }
    });

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

    // 프롬프트 존재 확인
    const prompt = await prisma.prompt.findUnique({
      where: { id: promptId },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            name: true,
            email: true
          }
        }
      }
    });

    if (!prompt) {
      return NextResponse.json(
        { error: '존재하지 않는 프롬프트입니다.' },
        { status: 404 }
      );
    }

    if (prompt.status !== 'PENDING') {
      return NextResponse.json(
        { error: '승인 대기 중인 프롬프트만 처리할 수 있습니다.' },
        { status: 400 }
      );
    }

    // 프롬프트 상태 업데이트
    const updatedPrompt = await prisma.prompt.update({
      where: { id: promptId },
      data: {
        status: action === 'approve' ? 'ACTIVE' : 'REJECTED',
        approvedAt: action === 'approve' ? new Date() : null,
        approvedBy: action === 'approve' ? payload.userId : null,
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
      message: action === 'approve' ? '프롬프트가 승인되었습니다.' : '프롬프트가 거부되었습니다.',
      prompt: {
        id: updatedPrompt.id,
        title: updatedPrompt.title,
        status: updatedPrompt.status,
        approvedAt: updatedPrompt.approvedAt,
        author: updatedPrompt.author.name || updatedPrompt.author.username,
        category: updatedPrompt.category.name,
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
    const user = await prisma.user.findUnique({
      where: { id: payload.userId }
    });

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
    const category = searchParams.get('category') || '';
    const search = searchParams.get('search') || '';

    const skip = (page - 1) * limit;

    // 필터 조건 구성
    const whereCondition: any = {
      status: status as any,
    };

    // 카테고리 필터
    if (category) {
      whereCondition.category = {
        name: category
      };
    }

    // 검색 필터
    if (search) {
      whereCondition.OR = [
        {
          title: {
            contains: search,
            mode: 'insensitive'
          }
        },
        {
          description: {
            contains: search,
            mode: 'insensitive'
          }
        },
        {
          author: {
            OR: [
              {
                name: {
                  contains: search,
                  mode: 'insensitive'
                }
              },
              {
                username: {
                  contains: search,
                  mode: 'insensitive'
                }
              }
            ]
          }
        }
      ];
    }

    // 승인 대기 중인 프롬프트 조회
    const [prompts, total] = await Promise.all([
      prisma.prompt.findMany({
        where: whereCondition,
        include: {
          category: true,
          author: {
            select: {
              id: true,
              username: true,
              name: true,
              email: true,
            }
          }
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),
      prisma.prompt.count({
        where: whereCondition
      })
    ]);

    // 데이터 변환
    const transformedPrompts = prompts.map((prompt: any) => ({
      id: prompt.id,
      title: prompt.title,
      description: prompt.description,
      content: prompt.content,
      price: prompt.price,
      category: prompt.category.name,
      author: prompt.author.name || prompt.author.username,
      authorEmail: prompt.author.email,
      tags: JSON.parse(prompt.tags || '[]'),
      status: prompt.status,
      createdAt: prompt.createdAt,
      approvedAt: prompt.approvedAt,
      approvedBy: prompt.approvedBy,
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
    console.error('Get pending prompts error:', error);
    return NextResponse.json(
      { error: '승인 대기 프롬프트 목록을 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
} 