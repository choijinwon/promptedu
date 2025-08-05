import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth';

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

    const { motivation, experience, portfolio } = await request.json();

    // 필수 필드 검증
    if (!motivation || !experience) {
      return NextResponse.json(
        { error: '신청 동기와 경험은 필수 입력 항목입니다.' },
        { status: 400 }
      );
    }

    // 사용자 정보 확인
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, role: true }
    });

    if (!user) {
      return NextResponse.json(
        { error: '사용자를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 이미 크리에이터인지 확인
    if (user.role === 'CREATOR') {
      return NextResponse.json(
        { error: '이미 크리에이터로 등록되어 있습니다.' },
        { status: 400 }
      );
    }

    // 기존 신청서 확인
    const existingApplication = await prisma.creatorApplication.findFirst({
      where: { userId: payload.userId },
      orderBy: { createdAt: 'desc' }
    });

    if (existingApplication && existingApplication.status === 'PENDING') {
      return NextResponse.json(
        { error: '이미 검토 중인 신청서가 있습니다.' },
        { status: 400 }
      );
    }

    // 신청서 생성
    const application = await prisma.creatorApplication.create({
      data: {
        userId: payload.userId,
        motivation,
        experience,
        portfolio: portfolio || '',
        status: 'PENDING'
      },
      include: {
        user: {
          select: {
            name: true,
            username: true,
            email: true
          }
        }
      }
    });

    return NextResponse.json({
      message: '크리에이터 신청이 성공적으로 제출되었습니다.',
      application: {
        id: application.id,
        motivation: application.motivation,
        experience: application.experience,
        portfolio: application.portfolio,
        status: application.status,
        createdAt: application.createdAt,
        user: application.user
      }
    });

  } catch (error) {
    console.error('Creator application error:', error);
    return NextResponse.json(
      { error: '크리에이터 신청 처리에 실패했습니다.' },
      { status: 500 }
    );
  }
}

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

    // 사용자의 최신 신청서 조회
    const application = await prisma.creatorApplication.findFirst({
      where: { userId: payload.userId },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            name: true,
            username: true,
            email: true
          }
        }
      }
    });

    if (!application) {
      return NextResponse.json({
        application: null
      });
    }

    return NextResponse.json({
      application: {
        id: application.id,
        motivation: application.motivation,
        experience: application.experience,
        portfolio: application.portfolio,
        status: application.status,
        createdAt: application.createdAt,
        reviewedAt: application.reviewedAt,
        reviewedBy: application.reviewedBy,
        feedback: application.reviewNote,
        user: application.user
      }
    });

  } catch (error) {
    console.error('Get application error:', error);
    return NextResponse.json(
      { error: '신청서 조회에 실패했습니다.' },
      { status: 500 }
    );
  }
} 