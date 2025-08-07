import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
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

    // 프롬프트가 존재하는지 확인
    const prompt = await prisma.prompt.findUnique({
      where: { id: promptId },
    });

    if (!prompt) {
      return NextResponse.json(
        { error: '프롬프트를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 이미 즐겨찾기에 추가되어 있는지 확인
    const existingFavorite = await prisma.favorite.findFirst({
      where: {
        userId: payload.userId,
        promptId: promptId,
      },
    });

    if (existingFavorite) {
      return NextResponse.json(
        { error: '이미 즐겨찾기에 추가되어 있습니다.' },
        { status: 400 }
      );
    }

    // 즐겨찾기 추가
    const favorite = await prisma.favorite.create({
      data: {
        userId: payload.userId,
        promptId: promptId,
      },
      include: {
        prompt: {
          include: {
            author: true,
            category: true,
          },
        },
      },
    });

    return NextResponse.json({
      message: '즐겨찾기에 추가되었습니다.',
      favorite,
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

    // 즐겨찾기 제거
    const deletedCount = await prisma.favorite.deleteMany({
      where: {
        userId: payload.userId,
        promptId: promptId,
      },
    });

    if (deletedCount.count === 0) {
      return NextResponse.json(
        { error: '즐겨찾기를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: '즐겨찾기에서 제거되었습니다.',
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
    const skip = (page - 1) * limit;

    const favorites = await prisma.favorite.findMany({
      where: {
        userId: payload.userId,
      },
      include: {
        prompt: {
          include: {
            author: true,
            category: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
    });

    const total = await prisma.favorite.count({
      where: {
        userId: payload.userId,
      },
    });

    return NextResponse.json({
      favorites,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Get favorites error:', error);
    return NextResponse.json(
      { error: '즐겨찾기 목록을 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}
