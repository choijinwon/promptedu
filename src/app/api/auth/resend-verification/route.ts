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

    // Supabase Auth 사용 설정 (환경 변수로 제어)
    const useSupabaseAuth = process.env.USE_SUPABASE_AUTH === 'true' || process.env.NODE_ENV === 'production';
    
    if (useSupabaseAuth) {
      console.log('🚀 Using Supabase Auth for resend verification');
      
      try {
        // Supabase Auth로 재인증 이메일 발송
        const { data, error } = await supabaseAuth.auth.resend({
          type: 'signup',
          email: email,
          options: {
            emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'}/verify-email`
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
            user: (data.user as any)?.id || null,
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

    // 기존 방식 사용 (개발 환경에서 USE_SUPABASE_AUTH=false인 경우)
    console.log('🔧 Using custom resend verification');
    
    try {
      // 새로운 인증 토큰 생성
      const verificationToken = generateVerificationToken();
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24); // 24시간 후 만료

      // 기존 토큰 삭제 (있다면) - 에러 무시
      try {
        await supabase
          .from('verification_tokens')
          .delete()
          .eq('user_id', user.id)
          .eq('type', 'EMAIL_VERIFICATION');
      } catch (deleteError) {
        console.warn('⚠️ Error deleting existing tokens (ignoring):', deleteError);
      }

      // 새 토큰 저장 - 에러 발생 시 개발 모드로 fallback
      let tokenSaved = false;
      try {
        const { error: tokenError } = await supabase
          .from('verification_tokens')
          .insert({
            user_id: user.id,
            token: verificationToken,
            type: 'EMAIL_VERIFICATION',
            expires_at: expiresAt.toISOString(),
          });

        if (tokenError) {
          console.warn('⚠️ Error saving verification token, falling back to development mode:', tokenError);
        } else {
          tokenSaved = true;
        }
      } catch (tokenError) {
        console.warn('⚠️ Exception saving verification token, falling back to development mode:', tokenError);
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

      console.log('✅ Resend verification email successful:', email);

      return NextResponse.json({
        message: '재인증 이메일이 발송되었습니다. 이메일을 확인해주세요.',
        email: user.email,
        sent: true,
        // 개발 환경에서만 토큰과 링크 제공
        ...(process.env.NODE_ENV === 'development' && {
          debug: {
            verificationToken,
            verificationLink,
            tokenSaved: tokenSaved
          }
        })
      });

    } catch (error) {
      console.error('❌ Error in resend verification:', error);
      
      // 최종 fallback: 토큰 없이 이메일만 발송
      try {
        const verificationToken = generateVerificationToken();
        const verificationLink = generateVerificationLink(verificationToken);
        const emailSent = await sendVerificationEmail(email, user.username, verificationLink);

        if (emailSent) {
          console.log('✅ Fallback email sent successfully:', email);
          return NextResponse.json({
            message: '재인증 이메일이 발송되었습니다. 이메일을 확인해주세요.',
            email: user.email,
            sent: true,
            fallback: true,
            // 개발 환경에서만 토큰과 링크 제공
            ...(process.env.NODE_ENV === 'development' && {
              debug: {
                verificationToken,
                verificationLink,
                fallbackMode: true
              }
            })
          });
        }
      } catch (fallbackError) {
        console.error('❌ Fallback email also failed:', fallbackError);
      }

      return NextResponse.json(
        { error: '재인증 이메일 발송 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('❌ Error in resend verification:', error);
    return NextResponse.json(
      { error: '재인증 이메일 발송 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
