import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase-db';
import { generateToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: '인증 토큰이 필요합니다.' },
        { status: 400 }
      );
    }

    console.log('🔍 Verifying email with token:', token.substring(0, 10) + '...');

    // 개발 환경에서는 토큰 검증을 우회하고 직접 사용자 조회
    if (process.env.NODE_ENV === 'development') {
      console.log('🔧 Development mode: bypassing token verification');
      
      // 최근에 생성된 미인증 사용자 조회
      const { data: unverifiedUsers, error: userError } = await supabase
        .from('users')
        .select('id, email, username, name, role, is_verified')
        .eq('is_verified', false)
        .order('created_at', { ascending: false })
        .limit(1);

      if (userError || !unverifiedUsers || unverifiedUsers.length === 0) {
        console.error('❌ No unverified users found');
        return NextResponse.json(
          { error: '인증할 사용자를 찾을 수 없습니다.' },
          { status: 404 }
        );
      }

      const user = unverifiedUsers[0];
      console.log('✅ Found unverified user:', user.email);

      // 사용자 인증 상태 업데이트
      const { error: updateError } = await supabase
        .from('users')
        .update({ is_verified: true })
        .eq('id', user.id);

      if (updateError) {
        console.error('❌ Error updating user verification status:', updateError);
        return NextResponse.json(
          { error: '인증 상태 업데이트 중 오류가 발생했습니다.' },
          { status: 500 }
        );
      }

      // JWT 토큰 생성 (인증 완료 후 자동 로그인)
      const jwtToken = generateToken({
        userId: user.id,
        email: user.email,
        role: user.role,
      });

      console.log('✅ Email verification successful (dev mode):', user.email);

      return NextResponse.json({
        message: '이메일 인증이 완료되었습니다! (개발 모드)',
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          name: user.name,
          role: user.role,
          isVerified: true,
        },
        token: jwtToken,
        verified: true,
        devMode: true
      });
    }

    // 프로덕션 환경에서는 정상적인 토큰 검증
    // 인증 토큰 조회
    const { data: verificationToken, error: tokenError } = await supabase
      .from('verification_tokens')
      .select('*')
      .eq('token', token)
      .eq('type', 'EMAIL_VERIFICATION')
      .single();

    if (tokenError || !verificationToken) {
      console.error('❌ Invalid or expired verification token');
      return NextResponse.json(
        { error: '유효하지 않거나 만료된 인증 토큰입니다.' },
        { status: 400 }
      );
    }

    // 토큰 만료 확인
    const now = new Date();
    const expiresAt = new Date(verificationToken.expires_at);
    
    if (now > expiresAt) {
      console.error('❌ Verification token expired');
      return NextResponse.json(
        { error: '인증 토큰이 만료되었습니다. 새로운 인증 이메일을 요청해주세요.' },
        { status: 400 }
      );
    }

    // 사용자 조회
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, email, username, name, role, is_verified')
      .eq('id', verificationToken.user_id)
      .single();

    if (userError || !user) {
      console.error('❌ User not found for verification token');
      return NextResponse.json(
        { error: '사용자를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 이미 인증된 사용자인지 확인
    if (user.is_verified) {
      console.log('✅ User already verified:', user.email);
      return NextResponse.json({
        message: '이미 인증이 완료된 계정입니다.',
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          name: user.name,
          role: user.role,
          isVerified: user.is_verified,
        },
        alreadyVerified: true
      });
    }

    // 사용자 인증 상태 업데이트
    const { error: updateError } = await supabase
      .from('users')
      .update({ is_verified: true })
      .eq('id', user.id);

    if (updateError) {
      console.error('❌ Error updating user verification status:', updateError);
      return NextResponse.json(
        { error: '인증 상태 업데이트 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    // 사용된 인증 토큰 삭제
    const { error: deleteError } = await supabase
      .from('verification_tokens')
      .delete()
      .eq('id', verificationToken.id);

    if (deleteError) {
      console.warn('⚠️ Error deleting verification token:', deleteError);
      // 토큰 삭제 실패는 치명적이지 않으므로 계속 진행
    }

    // JWT 토큰 생성 (인증 완료 후 자동 로그인)
    const jwtToken = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    console.log('✅ Email verification successful:', user.email);

    return NextResponse.json({
      message: '이메일 인증이 완료되었습니다!',
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        name: user.name,
        role: user.role,
        isVerified: true,
      },
      token: jwtToken,
      verified: true
    });

  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      { error: '이메일 인증 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
