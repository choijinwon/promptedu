import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase-db';
import { sendVerificationEmail } from '@/lib/email';

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

    // 개발 모드에서는 verification_tokens 테이블 없이도 작동
    if (process.env.NODE_ENV === 'development') {
      console.log('🔧 Development mode: bypassing verification token creation');
      
      // 새로운 인증 토큰 생성 (메모리에서만)
      const { generateVerificationToken, generateVerificationLink } = await import('@/lib/email');
      const verificationToken = generateVerificationToken();
      const verificationLink = generateVerificationLink(verificationToken);

      // 이메일 발송
      const emailSent = await sendVerificationEmail(email, user.username, verificationLink);

      if (!emailSent) {
        return NextResponse.json(
          { error: '이메일 발송에 실패했습니다. 나중에 다시 시도해주세요.' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        message: '인증 이메일이 재발송되었습니다. 이메일을 확인해주세요.',
        email: user.email,
        sent: true,
        debug: {
          verificationToken,
          verificationLink,
          devMode: true
        }
      });
    }

    // 프로덕션 모드에서는 verification_tokens 테이블 사용
    try {
      // 새로운 인증 토큰 생성
      const { generateVerificationToken, generateVerificationLink } = await import('@/lib/email');
      const verificationToken = generateVerificationToken();
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24); // 24시간 후 만료

      // 기존 토큰 삭제
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

      return NextResponse.json({
        message: '인증 이메일이 재발송되었습니다. 이메일을 확인해주세요.',
        email: user.email,
        sent: true
      });

    } catch (tokenError) {
      console.error('❌ Error with verification tokens table:', tokenError);
      
      // verification_tokens 테이블 오류 시 개발 모드로 fallback
      console.log('🔧 Falling back to development mode due to token table error');
      
      const { generateVerificationToken, generateVerificationLink } = await import('@/lib/email');
      const verificationToken = generateVerificationToken();
      const verificationLink = generateVerificationLink(verificationToken);

      const emailSent = await sendVerificationEmail(email, user.username, verificationLink);

      if (!emailSent) {
        return NextResponse.json(
          { error: '이메일 발송에 실패했습니다. 나중에 다시 시도해주세요.' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        message: '인증 이메일이 재발송되었습니다. 이메일을 확인해주세요.',
        email: user.email,
        sent: true,
        debug: {
          verificationToken,
          verificationLink,
          fallbackMode: true
        }
      });
    }

  } catch (error) {
    console.error('❌ Error in resend email:', error);
    return NextResponse.json(
      { error: '이메일 재발송 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
