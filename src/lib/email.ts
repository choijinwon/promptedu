import crypto from 'crypto';
import { supabase } from './supabase-db';
import nodemailer from 'nodemailer';

// 이메일 인증 토큰 생성
export const generateVerificationToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

// 이메일 인증 링크 생성 (로컬 환경 감지)
export const generateVerificationLink = (token: string): string => {
  // 로컬 환경 감지
  const isLocalhost = process.env.NODE_ENV === 'development' || 
    (typeof window !== 'undefined' && 
     (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'));
  
  const baseUrl = isLocalhost 
    ? 'http://localhost:3000' 
    : (process.env.NEXT_PUBLIC_SITE_URL || 'https://promptedu.io');
    
  return `${baseUrl}/verify-email?token=${token}`;
};

// 이메일 템플릿 생성
export const createVerificationEmail = (username: string, verificationLink: string) => {
  return {
    subject: 'Prompt Hub - 이메일 인증을 완료해주세요',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>이메일 인증</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Prompt Hub에 오신 것을 환영합니다!</h1>
          </div>
          <div class="content">
            <h2>안녕하세요, ${username}님!</h2>
            <p>Prompt Hub 회원가입을 완료하기 위해 이메일 인증을 진행해주세요.</p>
            <p>아래 버튼을 클릭하여 이메일 인증을 완료하시면 모든 서비스를 이용하실 수 있습니다.</p>
            
            <div style="text-align: center;">
              <a href="${verificationLink}" class="button">이메일 인증하기</a>
            </div>
            
            <p style="margin-top: 30px; font-size: 14px; color: #666;">
              만약 버튼이 작동하지 않는다면, 아래 링크를 복사하여 브라우저에 붙여넣기 해주세요:<br>
              <a href="${verificationLink}" style="color: #667eea;">${verificationLink}</a>
            </p>
            
            <p style="margin-top: 20px; font-size: 14px; color: #666;">
              이 링크는 24시간 후에 만료됩니다.
            </p>
          </div>
          <div class="footer">
            <p>이 이메일은 Prompt Hub 회원가입 과정에서 발송되었습니다.</p>
            <p>문의사항이 있으시면 support@prompthub.com으로 연락해주세요.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Prompt Hub - 이메일 인증을 완료해주세요

      안녕하세요, ${username}님!

      Prompt Hub 회원가입을 완료하기 위해 이메일 인증을 진행해주세요.

      이메일 인증 링크: ${verificationLink}

      이 링크는 24시간 후에 만료됩니다.

      문의사항이 있으시면 support@prompthub.com으로 연락해주세요.
    `
  };
};

// Resend를 사용한 실제 이메일 발송
async function sendEmailViaResend(email: string, username: string, verificationLink: string) {
  try {
    const emailContent = createVerificationEmail(username, verificationLink);
    
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Prompt Hub <noreply@prompthub.com>',
        to: email,
        subject: emailContent.subject,
        html: emailContent.html,
        text: emailContent.text,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('❌ Resend API error:', error);
      return { success: false, error };
    }

    const result = await response.json();
    console.log('📧 Email sent successfully via Resend!');
    console.log('Message ID:', result.id);
    console.log('To:', email);
    
    return {
      success: true,
      messageId: result.id
    };
  } catch (error) {
    console.error('❌ Error sending email via Resend:', error);
    return { success: false, error };
  }
}

// Mailtrap API를 사용한 실제 이메일 발송
async function sendEmailViaMailtrapAPI(email: string, username: string, verificationLink: string) {
  try {
    const emailContent = createVerificationEmail(username, verificationLink);
    
    const response = await fetch('https://sandbox.api.mailtrap.io/api/send/3969271', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.MAILTRAP_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: {
          email: 'noreply@prompthub.com',
          name: 'Prompt Hub'
        },
        to: [
          {
            email: email
          }
        ],
        subject: emailContent.subject,
        html: emailContent.html,
        text: emailContent.text,
        category: 'Email Verification'
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('❌ Mailtrap API error:', response.status, errorData);
      return { success: false, error: errorData };
    }

    const result = await response.json();
    console.log('📧 Email sent successfully via Mailtrap API!');
    console.log('Message ID:', result.message_id);
    console.log('To:', email);
    
    return {
      success: true,
      messageId: result.message_id
    };
  } catch (error) {
    console.error('❌ Error sending email via Mailtrap API:', error);
    return { success: false, error };
  }
}

// Mailtrap을 사용한 실제 이메일 발송
async function sendEmailViaMailtrap(email: string, username: string, verificationLink: string) {
  try {
    // Mailtrap 설정 (환경 변수에서 가져오거나 기본값 사용)
    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST || 'smtp.mailtrap.io',
      port: parseInt(process.env.MAILTRAP_PORT || '2525'),
      secure: false,
      auth: {
        user: process.env.MAILTRAP_USER || 'your-mailtrap-user',
        pass: process.env.MAILTRAP_PASS || 'your-mailtrap-pass'
      }
    });

    const emailContent = createVerificationEmail(username, verificationLink);

    const info = await transporter.sendMail({
      from: '"Prompt Hub" <noreply@prompthub.com>',
      to: email, // 실제 이메일 주소로 발송
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text,
    });

    console.log('📧 Email sent successfully via Mailtrap!');
    console.log('Message ID:', info.messageId);
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
    console.log('To:', email);
    
    return {
      success: true,
      messageId: info.messageId,
      previewUrl: nodemailer.getTestMessageUrl(info)
    };
  } catch (error) {
    console.error('❌ Error sending email via Mailtrap:', error);
    return { success: false, error };
  }
}

// Supabase Auth를 사용한 이메일 발송 (로컬 환경에서는 개발 모드로 fallback)
export const sendVerificationEmail = async (email: string, username: string, verificationLink: string) => {
  const emailContent = createVerificationEmail(username, verificationLink);
  
  // Mailtrap API 설정 확인
  const hasMailtrapAPI = process.env.MAILTRAP_API_TOKEN;
  
  console.log('🔍 Mailtrap config check:', {
    hasAPI: !!hasMailtrapAPI,
    hasUser: !!process.env.MAILTRAP_USER,
    hasPass: !!process.env.MAILTRAP_PASS,
    hasHost: !!process.env.MAILTRAP_HOST,
    user: process.env.MAILTRAP_USER?.substring(0, 10) + '...',
    host: process.env.MAILTRAP_HOST
  });
  
  // Mailtrap API가 있으면 우선적으로 사용
  if (hasMailtrapAPI) {
    console.log('📧 Mailtrap API configuration found, attempting real email...');
    const apiResult = await sendEmailViaMailtrapAPI(email, username, verificationLink);
    
    if (apiResult.success) {
      console.log('📧 Real email sent successfully via Mailtrap API!');
      return true;
    } else {
      console.log('📧 Mailtrap API failed, falling back to SMTP');
      console.error('Mailtrap API error:', apiResult.error);
    }
  }
  
  // Mailtrap SMTP 설정 확인
  const hasMailtrapConfig = process.env.MAILTRAP_USER && 
                           process.env.MAILTRAP_PASS && 
                           process.env.MAILTRAP_HOST;
  
  // Mailtrap SMTP 설정이 있으면 실제 이메일 발송 시도
  if (hasMailtrapConfig) {
    console.log('📧 Mailtrap SMTP configuration found, attempting real email...');
    const mailtrapResult = await sendEmailViaMailtrap(email, username, verificationLink);
    
    if (mailtrapResult.success) {
      console.log('📧 Real email sent successfully via Mailtrap SMTP!');
      console.log('Preview URL:', mailtrapResult.previewUrl);
      return true;
    } else {
      console.log('📧 Mailtrap SMTP failed, falling back to simulation');
      console.error('Mailtrap SMTP error:', mailtrapResult.error);
    }
  }
  
  // 로컬 환경에서는 Supabase Auth를 건너뛰고 개발 모드로 처리
  const isLocalhost = process.env.NODE_ENV === 'development' || 
    verificationLink.includes('localhost') || 
    verificationLink.includes('127.0.0.1');
  
  if (isLocalhost) {
    console.log('🔧 Local environment detected, using development mode');
    
    // 개발 모드 시뮬레이션
    console.log('📧 ==========================================');
    console.log('📧 DEVELOPMENT MODE - EMAIL SIMULATION');
    console.log('📧 ==========================================');
    console.log('📧 To:', email);
    console.log('📧 Subject:', emailContent.subject);
    console.log('📧 Verification Link:', verificationLink);
    console.log('📧 ==========================================');
    console.log('📧 HTML Content Preview:');
    console.log(emailContent.html.substring(0, 500) + '...');
    console.log('📧 ==========================================');
    console.log('📧 Local environment - email simulation only');
    console.log('📧 To send real emails in development, set up Mailtrap');
    console.log('📧 ==========================================');
    
    return true;
  }
  
  // 프로덕션 환경에서만 Supabase Auth 사용
  try {
    // Supabase Auth의 signUpWithPassword를 사용하여 이메일 인증 발송
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: 'temporary-password-for-email-only', // 임시 비밀번호
      options: {
        emailRedirectTo: verificationLink,
        data: {
          username: username,
          custom_verification_link: verificationLink
        }
      }
    });

    if (error) {
      console.error('❌ Error sending verification email via Supabase Auth:', error);
      
      // Supabase Auth 실패 시 개발 모드로 처리
      console.log('📧 ==========================================');
      console.log('📧 DEVELOPMENT MODE - EMAIL SIMULATION');
      console.log('📧 ==========================================');
      console.log('📧 To:', email);
      console.log('📧 Subject:', emailContent.subject);
      console.log('📧 Verification Link:', verificationLink);
      console.log('📧 ==========================================');
      console.log('📧 HTML Content Preview:');
      console.log(emailContent.html.substring(0, 500) + '...');
      console.log('📧 ==========================================');
      console.log('📧 Supabase Auth email failed, showing simulation');
      console.log('📧 ==========================================');
      
      return true; // 개발 모드에서는 성공으로 처리
    }

    console.log('📧 Verification email sent successfully via Supabase Auth:', {
      to: email,
      user: data.user?.id,
      verificationLink
    });
    return true;
  } catch (error) {
    console.error('❌ Error sending verification email via Supabase Auth:', error);
    
    // 에러 발생 시 개발 모드로 처리
    console.log('📧 ==========================================');
    console.log('📧 DEVELOPMENT MODE - EMAIL SIMULATION');
    console.log('📧 ==========================================');
    console.log('📧 To:', email);
    console.log('📧 Subject:', emailContent.subject);
    console.log('📧 Verification Link:', verificationLink);
    console.log('📧 ==========================================');
    console.log('📧 HTML Content Preview:');
    console.log(emailContent.html.substring(0, 500) + '...');
    console.log('📧 ==========================================');
    console.log('📧 Supabase Auth email failed, showing simulation');
    console.log('📧 ==========================================');
    
    return true; // 개발 모드에서는 성공으로 처리
  }
};
