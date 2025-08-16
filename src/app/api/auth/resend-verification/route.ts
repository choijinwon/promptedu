import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase-db';
import { supabase as supabaseAuth } from '@/lib/supabase';
import { generateVerificationToken, generateVerificationLink, sendVerificationEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: '이메일 주소가 필요합니다.' },
        { status: 400 }
      );
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: '유효한 이메일 주소를 입력해주세요.' },
        { status: 400 }
      );
    }

    // 사용자 조회
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, email, username, name, is_verified')
      .eq('email', email)
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { error: '해당 이메일로 등록된 사용자를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 이미 인증된 사용자인지 확인
    if (user.is_verified) {
      return NextResponse.json(
        { error: '이미 인증이 완료된 계정입니다.' },
        { status: 400 }
      );
    }

    // 프로덕션 환경에서는 Supabase Auth 사용
    if (process.env.NODE_ENV === 'production') {
      console.log('🚀 Production mode: Using Supabase Auth for resend verification');
      
      try {
        // Supabase Auth로 재인증 이메일 발송
        const { data, error } = await supabaseAuth.auth.resend({
          type: 'signup',
          email: email,
          options: {
            emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/verify-email`
          }
        });

        if (error) {
          console.error('❌ Supabase Auth resend error:', error);
          return NextResponse.json(
            { error: error.message || '재인증 이메일 발송에 실패했습니다.' },
            { status: 400 }
          );
        }

        console.log('✅ Resend verification email successful via Supabase Auth:', email);

        return NextResponse.json({
          message: '재인증 이메일이 발송되었습니다. 이메일을 확인해주세요.',
          email: user.email,
          sent: true,
          authData: {
            user: data.user?.id,
            session: data.session ? 'created' : 'pending_verification'
          }
        });

      } catch (authError) {
        console.error('❌ Supabase Auth error:', authError);
        return NextResponse.json(
          { error: '인증 서비스 오류가 발생했습니다.' },
          { status: 500 }
        );
      }
    }

    // 개발 환경에서는 기존 방식 사용
    console.log('🔧 Development mode: Using custom resend verification');
    
    // 새로운 인증 토큰 생성
    const verificationToken = generateVerificationToken();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // 24시간 후 만료

    // 기존 토큰 삭제 (있다면)
    await supabase
      .from('verification_tokens')
      .delete()
      .eq('user_id', user.id)
      .eq('type', 'EMAIL_VERIFICATION');

    // 새 토큰 저장
    const { error: tokenError } = await supabase
      .from('verification_tokens')
      .insert({
        user_id: user.id,
        token: verificationToken,
        type: 'EMAIL_VERIFICATION',
        expires_at: expiresAt.toISOString(),
      });

    if (tokenError) {
      console.error('❌ Error creating verification token:', tokenError);
      return NextResponse.json(
        { error: '인증 토큰 생성에 실패했습니다.' },
        { status: 500 }
      );
    }

    // 인증 링크 생성
    const verificationLink = generateVerificationLink(verificationToken);

    // 이메일 발송
    const emailSent = await sendVerificationEmail(email, user.username, verificationLink);

    if (!emailSent) {
      return NextResponse.json(
        { error: '이메일 발송에 실패했습니다. 나중에 다시 시도해주세요.' },
        { status: 500 }
      );
    }

    console.log('✅ Resend verification email successful (dev mode):', email);

    return NextResponse.json({
      message: '재인증 이메일이 발송되었습니다. 이메일을 확인해주세요.',
      email: user.email,
      sent: true,
      // 개발 환경에서만 토큰과 링크 제공
      ...(process.env.NODE_ENV === 'development' && {
        debug: {
          verificationToken,
          verificationLink,
          devMode: true
        }
      })
    });

  } catch (error) {
    console.error('❌ Error in resend verification:', error);
    return NextResponse.json(
      { error: '재인증 이메일 발송 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
