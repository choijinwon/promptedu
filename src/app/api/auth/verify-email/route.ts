import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase-db';
import { supabase as supabaseAuth } from '@/lib/supabase';
import { generateToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    const type = searchParams.get('type'); // Supabase Auth에서 전달하는 type 파라미터

    console.log('🔍 Email verification request:', { token: token?.substring(0, 10) + '...', type });

    // 프로덕션 환경에서 Supabase Auth 이메일 인증 처리
    if (process.env.NODE_ENV === 'production') {
      console.log('🚀 Production mode: Using Supabase Auth for email verification');
      
      try {
        // Supabase Auth에서 이메일 인증 처리
        const { data, error } = await supabaseAuth.auth.verifyOtp({
          token_hash: token || '',
          type: 'email' as any,
        });

        if (error) {
          console.error('❌ Supabase Auth verification error:', error);
          return NextResponse.json(
            { error: error.message || '이메일 인증에 실패했습니다.' },
            { status: 400 }
          );
        }

        if (!data.user) {
          return NextResponse.json(
            { error: '인증된 사용자 정보를 찾을 수 없습니다.' },
            { status: 400 }
          );
        }

        console.log('✅ Supabase Auth verification successful:', data.user.email);

        // 우리 데이터베이스에서 사용자 정보 업데이트
        const { data: user, error: userError } = await supabase
          .from('users')
          .select('id, email, username, name, role, is_verified')
          .eq('id', data.user.id)
          .single();

        if (userError || !user) {
          console.error('❌ User not found in database:', userError);
          return NextResponse.json(
            { error: '사용자 정보를 찾을 수 없습니다.' },
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

        // JWT 토큰 생성 (인증 완료 후 자동 로그인)
        const jwtToken = generateToken({
          userId: user.id,
          email: user.email,
          role: user.role,
        });

        console.log('✅ Email verification successful (production):', user.email);

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
          verified: true,
          authData: {
            user: data.user.id,
            session: data.session ? 'created' : 'pending'
          }
        });

      } catch (authError) {
        console.error('❌ Supabase Auth verification error:', authError);
        return NextResponse.json(
          { error: '인증 서비스 오류가 발생했습니다.' },
          { status: 500 }
        );
      }
    }

    // 개발 환경에서는 기존 방식 사용
    if (!token) {
      return NextResponse.json(
        { error: '인증 토큰이 필요합니다.' },
        { status: 400 }
      );
    }

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

  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      { error: '이메일 인증 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
