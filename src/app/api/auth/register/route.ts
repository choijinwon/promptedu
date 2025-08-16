import { NextRequest, NextResponse } from 'next/server';
import { hashPassword, generateToken } from '@/lib/auth';
import { supabase } from '@/lib/supabase-db';
import { supabase as supabaseAuth } from '@/lib/supabase';
import { generateVerificationToken, generateVerificationLink, sendVerificationEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { email, username, password, name } = await request.json();

    // Validation
    if (!email || !username || !password) {
      return NextResponse.json(
        { error: '이메일, 사용자명, 비밀번호는 필수입니다.' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: '비밀번호는 최소 6자 이상이어야 합니다.' },
        { status: 400 }
      );
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: '유효한 이메일 형식이 아닙니다.' },
        { status: 400 }
      );
    }

    // 사용자명 형식 검증 (영문, 숫자, 언더스코어만 허용)
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(username)) {
      return NextResponse.json(
        { error: '사용자명은 영문, 숫자, 언더스코어(_)만 사용할 수 있습니다.' },
        { status: 400 }
      );
    }

    // 기존 사용자 확인 (이메일)
    const { data: existingEmail, error: emailCheckError } = await supabase
      .from('users')
      .select('id, email')
      .eq('email', email)
      .limit(1);

    if (emailCheckError) {
      console.error('❌ Error checking existing email:', emailCheckError);
      return NextResponse.json(
        { error: '사용자 확인 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    if (existingEmail && existingEmail.length > 0) {
      return NextResponse.json(
        { error: '이미 사용 중인 이메일입니다.' },
        { status: 400 }
      );
    }

    // 기존 사용자 확인 (사용자명)
    const { data: existingUsername, error: usernameCheckError } = await supabase
      .from('users')
      .select('id, username')
      .eq('username', username)
      .limit(1);

    if (usernameCheckError) {
      console.error('❌ Error checking existing username:', usernameCheckError);
      return NextResponse.json(
        { error: '사용자 확인 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    if (existingUsername && existingUsername.length > 0) {
      return NextResponse.json(
        { error: '이미 사용 중인 사용자명입니다.' },
        { status: 400 }
      );
    }

    // 프로덕션 환경에서는 Supabase Auth 사용
    if (process.env.NODE_ENV === 'production') {
      console.log('🚀 Production mode: Using Supabase Auth for registration');
      
      try {
        // Supabase Auth로 사용자 등록
        const { data: authData, error: authError } = await supabaseAuth.auth.signUp({
          email: email,
          password: password,
          options: {
            data: {
              username: username,
              name: name || username,
              role: 'USER'
            },
            emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/verify-email`
          }
        });

        if (authError) {
          console.error('❌ Supabase Auth registration error:', authError);
          return NextResponse.json(
            { error: authError.message || '회원가입 중 오류가 발생했습니다.' },
            { status: 400 }
          );
        }

        if (!authData.user) {
          return NextResponse.json(
            { error: '사용자 생성에 실패했습니다.' },
            { status: 500 }
          );
        }

        // Supabase Auth 사용자 정보를 우리 데이터베이스에 동기화
        const { data: newUser, error: insertError } = await supabase
          .from('users')
          .insert({
            id: authData.user.id,
            email: email,
            username: username,
            password: '', // Supabase Auth에서 비밀번호 관리
            name: name || username,
            role: 'USER',
            is_verified: false, // 이메일 인증 후 true로 변경
          })
          .select('id, email, username, name, role, is_verified, created_at')
          .single();

        if (insertError) {
          console.error('❌ Error syncing user to database:', insertError);
          // Supabase Auth 사용자는 생성되었지만 우리 DB 동기화 실패
          return NextResponse.json(
            { error: '사용자 정보 동기화 중 오류가 발생했습니다.' },
            { status: 500 }
          );
        }

        console.log('✅ User registered successfully via Supabase Auth:', { 
          email: newUser.email, 
          username: newUser.username,
          authUserId: authData.user.id
        });

        return NextResponse.json({
          message: '회원가입이 완료되었습니다. 이메일을 확인하여 인증을 완료해주세요.',
          user: {
            id: newUser.id,
            email: newUser.email,
            username: newUser.username,
            name: newUser.name,
            role: newUser.role,
            isVerified: newUser.is_verified,
            createdAt: newUser.created_at,
          },
          emailVerification: {
            required: true,
            sent: true,
            message: '인증 이메일이 발송되었습니다. 이메일을 확인해주세요.'
          },
          authData: {
            user: authData.user.id,
            session: authData.session ? 'created' : 'pending_verification'
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
    console.log('🔧 Development mode: Using custom registration');
    
    // 비밀번호 해시화
    const hashedPassword = await hashPassword(password);

    // 새 사용자 생성 (이메일 인증 전까지는 미인증 상태)
    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert({
        email,
        username,
        password: hashedPassword,
        name: name || username,
        role: 'USER',
        is_verified: false,
      })
      .select('id, email, username, name, role, is_verified, created_at')
      .single();

    if (insertError) {
      console.error('❌ Error creating user:', insertError);
      return NextResponse.json(
        { error: '회원가입 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    // 이메일 인증 토큰 생성
    const verificationToken = generateVerificationToken();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // 24시간 후 만료

    // 인증 토큰을 데이터베이스에 저장
    const { error: tokenError } = await supabase
      .from('verification_tokens')
      .insert({
        user_id: newUser.id,
        token: verificationToken,
        type: 'EMAIL_VERIFICATION',
        expires_at: expiresAt.toISOString(),
      });

    if (tokenError) {
      console.error('❌ Error creating verification token:', tokenError);
      // 토큰 생성 실패 시에도 사용자는 생성되었으므로 계속 진행
    }

    // 이메일 인증 링크 생성
    const verificationLink = generateVerificationLink(verificationToken);

    // 이메일 발송
    const emailSent = await sendVerificationEmail(email, username, verificationLink);

    if (!emailSent) {
      console.warn('⚠️ Failed to send verification email, but user was created');
    }

    console.log('✅ User registered successfully:', { 
      email: newUser.email, 
      username: newUser.username,
      verificationToken: verificationToken.substring(0, 10) + '...',
      verificationLink 
    });

    return NextResponse.json({
      message: '회원가입이 완료되었습니다. 이메일을 확인하여 인증을 완료해주세요.',
      user: {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
        name: newUser.name,
        role: newUser.role,
        isVerified: newUser.is_verified,
        createdAt: newUser.created_at,
      },
      emailVerification: {
        required: true,
        sent: emailSent,
        message: emailSent 
          ? '인증 이메일이 발송되었습니다. 이메일을 확인해주세요.' 
          : '인증 이메일 발송에 실패했습니다. 나중에 다시 시도해주세요.'
      },
      // 개발 환경에서만 토큰과 링크 제공
      ...(process.env.NODE_ENV === 'development' && {
        debug: {
          verificationToken,
          verificationLink,
        }
      })
    });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 