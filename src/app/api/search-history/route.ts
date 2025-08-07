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

    const { query } = await request.json();

    if (!query || query.trim() === '') {
      return NextResponse.json(
        { error: '검색어가 필요합니다.' },
        { status: 400 }
      );
    }

    // 검색 히스토리 저장
    await prisma.searchHistory.create({
      data: {
        userId: payload.userId,
        query: query.trim(),
      },
    });

    return NextResponse.json({
      message: '검색 히스토리가 저장되었습니다.',
    });
  } catch (error) {
    console.error('Save search history error:', error);
    return NextResponse.json(
      { error: '검색 히스토리 저장에 실패했습니다.' },
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
    const limit = parseInt(searchParams.get('limit') || '10');

    // 최근 검색 히스토리 조회
    const searchHistory = await prisma.searchHistory.findMany({
      where: {
        userId: payload.userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
      distinct: ['query'], // 중복 제거
    });

    return NextResponse.json({
      searchHistory,
    });
  } catch (error) {
    console.error('Get search history error:', error);
    return NextResponse.json(
      { error: '검색 히스토리를 불러오는데 실패했습니다.' },
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

    // 사용자의 모든 검색 히스토리 삭제
    await prisma.searchHistory.deleteMany({
      where: {
        userId: payload.userId,
      },
    });

    return NextResponse.json({
      message: '검색 히스토리가 삭제되었습니다.',
    });
  } catch (error) {
    console.error('Delete search history error:', error);
    return NextResponse.json(
      { error: '검색 히스토리 삭제에 실패했습니다.' },
      { status: 500 }
    );
  }
}
