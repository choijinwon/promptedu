import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: promptId } = await params;

    if (!promptId) {
      return NextResponse.json(
        { error: "프롬프트 ID가 필요합니다" },
        { status: 400 }
      );
    }

    const prompt = await prisma.prompt.findUnique({
      where: {
        id: promptId,
      },
      include: {
        category: true,
        author: {
          select: {
            name: true,
            username: true,
          },
        },
        reviews: {
          select: {
            id: true,
            rating: true,
            comment: true,
            createdAt: true,
            user: {
              select: {
                name: true,
                username: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 5, // 최근 5개 리뷰만
        },
        _count: {
          select: {
            reviews: true,
            favorites: true,
          },
        },
      },
    });

    if (!prompt) {
      return NextResponse.json(
        { error: "프롬프트를 찾을 수 없습니다" },
        { status: 404 }
      );
    }

    // 조회수 증가
    await prisma.prompt.update({
      where: {
        id: promptId,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    // 평균 평점 계산
    const averageRating = prompt.reviews.length > 0
      ? prompt.reviews.reduce((sum, review) => sum + review.rating, 0) / prompt.reviews.length
      : 0;

    const formattedPrompt = {
      id: prompt.id,
      title: prompt.title,
      description: prompt.description,
      content: prompt.content,
      price: prompt.price,
      category: {
        name: prompt.category.name,
        icon: prompt.category.icon || "📝",
        color: prompt.category.color || "#3B82F6",
      },
      author: {
        name: prompt.author.name || prompt.author.username || "익명",
      },
      downloads: prompt.downloads,
      views: prompt.views + 1, // 조회수 증가 반영
      rating: averageRating,
      reviewCount: prompt._count.reviews,
      favoriteCount: prompt._count.favorites,
      tags: Array.isArray(prompt.tags) ? prompt.tags : (prompt.tags ? JSON.parse(prompt.tags) : []),
      createdAt: prompt.createdAt.toISOString(),
      image: prompt.image,
      reviews: prompt.reviews,
    };

    return NextResponse.json({
      prompt: formattedPrompt,
    });
  } catch (error) {
    console.error("프롬프트 조회 에러:", error);
    return NextResponse.json(
      { error: "프롬프트를 불러오는데 실패했습니다" },
      { status: 500 }
    );
  }
} 