import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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
    const adminUser = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { role: true }
    });

    if (!adminUser || adminUser.role !== 'ADMIN') {
      return NextResponse.json(
        { error: '관리자 권한이 필요합니다.' },
        { status: 403 }
      );
    }

    const { action, feedback } = await request.json();

    // 유효한 액션인지 확인
    if (!['approve', 'reject'].includes(action)) {
      return NextResponse.json(
        { error: '유효하지 않은 액션입니다.' },
        { status: 400 }
      );
    }

    // 신청서 존재 여부 확인
    const application = await prisma.creatorApplication.findUnique({
      where: { id: id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            email: true,
            role: true
          }
        }
      }
    });

    if (!application) {
      return NextResponse.json(
        { error: '신청서를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    if (application.status !== 'PENDING') {
      return NextResponse.json(
        { error: '검토 중인 신청서만 처리할 수 있습니다.' },
        { status: 400 }
      );
    }

    // 신청서 상태 업데이트
    const updatedApplication = await prisma.creatorApplication.update({
      where: { id: id },
      data: {
        status: action === 'approve' ? 'APPROVED' : 'REJECTED',
        reviewedAt: new Date(),
        reviewedBy: payload.userId,
        reviewNote: feedback || null,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            email: true,
            role: true
          }
        }
      }
    });

    // 승인된 경우 사용자 역할을 CREATOR로 변경
    if (action === 'approve') {
      await prisma.user.update({
        where: { id: application.userId },
        data: { role: 'CREATOR' }
      });
    }

    return NextResponse.json({
      message: action === 'approve' 
        ? '크리에이터 신청이 승인되었습니다.' 
        : '크리에이터 신청이 거부되었습니다.',
      application: {
        id: updatedApplication.id,
        status: updatedApplication.status,
        reviewedAt: updatedApplication.reviewedAt,
        reviewedBy: updatedApplication.reviewedBy,
        feedback: updatedApplication.reviewNote,
        user: updatedApplication.user
      }
    });

  } catch (error) {
    console.error('Update creator application error:', error);
    return NextResponse.json(
      { error: '신청서 처리에 실패했습니다.' },
      { status: 500 }
    );
  }
} 