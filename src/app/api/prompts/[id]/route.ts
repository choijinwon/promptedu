import { NextRequest, NextResponse } from "next/server";

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

    // 임시 데이터 (실제 데이터베이스 연동 전까지)
    const tempPrompt = {
      id: promptId,
      title: '프롬프트 제목',
      description: '프롬프트 설명',
      content: '프롬프트 내용',
      price: 5000,
      category: {
        name: '카테고리',
        icon: '📝',
        color: '#3B82F6',
      },
      author: {
        name: '작성자',
      },
      downloads: 50,
      views: 100,
      rating: 4.5,
      reviewCount: 10,
      favoriteCount: 20,
      tags: ['태그1', '태그2'],
      createdAt: new Date().toISOString(),
      image: null,
      reviews: [],
    };

    return NextResponse.json({
      prompt: tempPrompt,
    });
  } catch (error) {
    console.error("프롬프트 조회 에러:", error);
    return NextResponse.json(
      { error: "프롬프트를 불러오는데 실패했습니다" },
      { status: 500 }
    );
  }
} 