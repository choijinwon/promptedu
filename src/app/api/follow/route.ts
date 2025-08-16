import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth';

// 팔로우하기
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

    const { followingId } = await request.json();

    if (!followingId) {
      return NextResponse.json(
        { error: '팔로우할 사용자 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    // 자기 자신을 팔로우할 수 없음
    if (payload.userId === followingId) {
      return NextResponse.json(
        { error: '자기 자신을 팔로우할 수 없습니다.' },
        { status: 400 }
      );
    }

    // 팔로우할 사용자가 존재하는지 확인
    const followingUser = await prisma.user.findUnique({
      where: { id: followingId },
    });

    if (!followingUser) {
      return NextResponse.json(
        { error: '팔로우할 사용자를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 이미 팔로우하고 있는지 확인
    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: payload.userId,
          followingId: followingId,
        },
      },
    });

    if (existingFollow) {
      return NextResponse.json(
        { error: '이미 팔로우하고 있습니다.' },
        { status: 400 }
      );
    }

    // 팔로우 생성
    const follow = await prisma.follow.create({
      data: {
        followerId: payload.userId,
        followingId: followingId,
      },
      include: {
        following: {
          select: {
            id: true,
            name: true,
            username: true,
            avatar: true,
          },
        },
      },
    });

    return NextResponse.json({
      message: '팔로우가 완료되었습니다.',
      follow,
    });
  } catch (error) {
    console.error('Follow creation error:', error);
    return NextResponse.json(
      { error: '팔로우에 실패했습니다.' },
      { status: 500 }
    );
  }
}

// 팔로우 취소
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
    const followingId = searchParams.get('followingId');

    if (!followingId) {
      return NextResponse.json(
        { error: '팔로우 취소할 사용자 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    // 팔로우 관계 삭제
    const deletedFollow = await prisma.follow.deleteMany({
      where: {
        followerId: payload.userId,
        followingId: followingId,
      },
    });

    if (deletedFollow.count === 0) {
      return NextResponse.json(
        { error: '팔로우 관계를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: '팔로우가 취소되었습니다.',
    });
  } catch (error) {
    console.error('Follow deletion error:', error);
    return NextResponse.json(
      { error: '팔로우 취소에 실패했습니다.' },
      { status: 500 }
    );
  }
}

// 팔로우 상태 확인
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
    const followingId = searchParams.get('followingId');
    const type = searchParams.get('type'); // 'following', 'followers', 'status'

    if (!followingId && type !== 'following' && type !== 'followers') {
      return NextResponse.json(
        { error: '사용자 ID 또는 타입이 필요합니다.' },
        { status: 400 }
      );
    }

    if (type === 'status' && followingId) {
      // 특정 사용자 팔로우 상태 확인
      const followStatus = await prisma.follow.findUnique({
        where: {
          followerId_followingId: {
            followerId: payload.userId,
            followingId: followingId,
          },
        },
      });

      return NextResponse.json({
        isFollowing: !!followStatus,
      });
    } else if (type === 'following') {
      // 내가 팔로우하는 사람들 목록
      const following = await prisma.follow.findMany({
        where: {
          followerId: payload.userId,
        },
        include: {
          following: {
            select: {
              id: true,
              name: true,
              username: true,
              avatar: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return NextResponse.json({
        following: following.map(f => f.following),
      });
    } else if (type === 'followers') {
      // 나를 팔로우하는 사람들 목록
      const followers = await prisma.follow.findMany({
        where: {
          followingId: payload.userId,
        },
        include: {
          follower: {
            select: {
              id: true,
              name: true,
              username: true,
              avatar: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return NextResponse.json({
        followers: followers.map(f => f.follower),
      });
    }

    return NextResponse.json(
      { error: '잘못된 요청입니다.' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Follow status check error:', error);
    return NextResponse.json(
      { error: '팔로우 상태 확인에 실패했습니다.' },
      { status: 500 }
    );
  }
}
