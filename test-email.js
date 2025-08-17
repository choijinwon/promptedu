const nodemailer = require('nodemailer');
require('dotenv').config();

// 테스트 이메일 설정
const testEmail = {
  to: 'test@example.com', // 테스트할 이메일 주소
  subject: 'Prompt Hub - 이메일 발송 테스트',
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>이메일 발송 테스트</title>
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
          <h1>📧 이메일 발송 테스트</h1>
        </div>
        <div class="content">
          <h2>안녕하세요!</h2>
          <p>이것은 Prompt Hub의 이메일 발송 테스트입니다.</p>
          <p>현재 시간: ${new Date().toLocaleString('ko-KR')}</p>
          
          <div style="text-align: center;">
            <a href="https://promptedu.io" class="button">Prompt Hub 방문하기</a>
          </div>
          
          <p style="margin-top: 30px; font-size: 14px; color: #666;">
            이 이메일이 정상적으로 수신되었다면 이메일 발송 기능이 정상적으로 작동하고 있습니다.
          </p>
        </div>
        <div class="footer">
          <p>이 이메일은 Prompt Hub 이메일 발송 테스트에서 발송되었습니다.</p>
        </div>
      </div>
    </body>
    </html>
  `,
  text: `
    Prompt Hub - 이메일 발송 테스트

    안녕하세요!

    이것은 Prompt Hub의 이메일 발송 테스트입니다.
    현재 시간: ${new Date().toLocaleString('ko-KR')}

    이 이메일이 정상적으로 수신되었다면 이메일 발송 기능이 정상적으로 작동하고 있습니다.

    Prompt Hub: https://promptedu.io
  `
};

// Mailtrap API를 사용한 이메일 발송 테스트
async function testMailtrapAPI() {
  console.log('🔍 Mailtrap API 설정 확인...');
  
  if (!process.env.MAILTRAP_API_TOKEN) {
    console.log('❌ MAILTRAP_API_TOKEN이 설정되지 않았습니다.');
    return false;
  }

  try {
    console.log('📧 Mailtrap API로 이메일 발송 시도...');
    
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
            email: testEmail.to
          }
        ],
        subject: testEmail.subject,
        html: testEmail.html,
        text: testEmail.text,
        category: 'Email Test'
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('❌ Mailtrap API 오류:', response.status, errorData);
      return false;
    }

    const result = await response.json();
    console.log('✅ Mailtrap API 이메일 발송 성공!');
    console.log('Message ID:', result.message_id);
    console.log('To:', testEmail.to);
    return true;
  } catch (error) {
    console.error('❌ Mailtrap API 이메일 발송 실패:', error);
    return false;
  }
}

// Mailtrap SMTP를 사용한 이메일 발송 테스트
async function testMailtrapSMTP() {
  console.log('🔍 Mailtrap SMTP 설정 확인...');
  
  const config = {
    host: process.env.MAILTRAP_HOST,
    port: parseInt(process.env.MAILTRAP_PORT || '2525'),
    secure: false,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS
    }
  };

  if (!config.auth.user || !config.auth.pass || !config.host) {
    console.log('❌ Mailtrap SMTP 설정이 완료되지 않았습니다.');
    console.log('필요한 환경 변수: MAILTRAP_HOST, MAILTRAP_PORT, MAILTRAP_USER, MAILTRAP_PASS');
    return false;
  }

  try {
    console.log('📧 Mailtrap SMTP로 이메일 발송 시도...');
    console.log('설정:', {
      host: config.host,
      port: config.port,
      user: config.auth.user.substring(0, 10) + '...',
      hasPass: !!config.auth.pass
    });

    const transporter = nodemailer.createTransport(config);

    const info = await transporter.sendMail({
      from: '"Prompt Hub" <noreply@prompthub.com>',
      to: testEmail.to,
      subject: testEmail.subject,
      html: testEmail.html,
      text: testEmail.text,
    });

    console.log('✅ Mailtrap SMTP 이메일 발송 성공!');
    console.log('Message ID:', info.messageId);
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
    console.log('To:', testEmail.to);
    return true;
  } catch (error) {
    console.error('❌ Mailtrap SMTP 이메일 발송 실패:', error);
    return false;
  }
}

// Resend를 사용한 이메일 발송 테스트
async function testResend() {
  console.log('🔍 Resend 설정 확인...');
  
  if (!process.env.RESEND_API_KEY) {
    console.log('❌ RESEND_API_KEY가 설정되지 않았습니다.');
    return false;
  }

  try {
    console.log('📧 Resend로 이메일 발송 시도...');
    
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Prompt Hub <noreply@prompthub.com>',
        to: testEmail.to,
        subject: testEmail.subject,
        html: testEmail.html,
        text: testEmail.text,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('❌ Resend API 오류:', error);
      return false;
    }

    const result = await response.json();
    console.log('✅ Resend 이메일 발송 성공!');
    console.log('Message ID:', result.id);
    console.log('To:', testEmail.to);
    return true;
  } catch (error) {
    console.error('❌ Resend 이메일 발송 실패:', error);
    return false;
  }
}

// 메인 테스트 함수
async function runEmailTests() {
  console.log('🚀 이메일 발송 테스트 시작...\n');
  
  // 테스트할 이메일 주소 입력 받기
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const email = await new Promise((resolve) => {
    rl.question('테스트할 이메일 주소를 입력하세요 (기본값: test@example.com): ', (answer) => {
      resolve(answer.trim() || 'test@example.com');
    });
  });

  testEmail.to = email;
  console.log(`📧 테스트 이메일 주소: ${testEmail.to}\n`);

  // 1. Mailtrap API 테스트
  console.log('1️⃣ Mailtrap API 테스트');
  const mailtrapAPISuccess = await testMailtrapAPI();
  console.log('');

  // 2. Mailtrap SMTP 테스트
  console.log('2️⃣ Mailtrap SMTP 테스트');
  const mailtrapSMTPSuccess = await testMailtrapSMTP();
  console.log('');

  // 3. Resend 테스트
  console.log('3️⃣ Resend 테스트');
  const resendSuccess = await testResend();
  console.log('');

  // 결과 요약
  console.log('📊 테스트 결과 요약:');
  console.log('Mailtrap API:', mailtrapAPISuccess ? '✅ 성공' : '❌ 실패');
  console.log('Mailtrap SMTP:', mailtrapSMTPSuccess ? '✅ 성공' : '❌ 실패');
  console.log('Resend:', resendSuccess ? '✅ 성공' : '❌ 실패');

  if (!mailtrapAPISuccess && !mailtrapSMTPSuccess && !resendSuccess) {
    console.log('\n⚠️  모든 이메일 서비스 테스트가 실패했습니다.');
    console.log('환경 변수 설정을 확인해주세요.');
  } else {
    console.log('\n🎉 이메일 발송 테스트가 완료되었습니다!');
  }

  rl.close();
}

// 스크립트 실행
runEmailTests().catch(console.error);
