# 로컬 환경에서 Supabase 이메일 발송 설정 가이드

## 문제 상황
로컬 환경(`http://localhost:3000`)에서 Supabase Auth 이메일이 발송되지 않는 문제

## 원인
1. Supabase Auth의 Site URL 설정이 프로덕션 도메인으로 되어 있음
2. 로컬 환경이 Supabase Auth 설정에 포함되지 않음
3. 이메일 템플릿의 리다이렉트 URL이 로컬 환경을 지원하지 않음

## 해결 방법

### 1. Supabase 대시보드 설정

#### 1.1 Authentication → Settings → URL Configuration
1. [Supabase Dashboard](https://supabase.com/dashboard) 접속
2. 프로젝트 `pahwayjrezkkgixykqpe` 선택
3. Authentication → Settings → URL Configuration

#### 1.2 Site URL 설정
```
Site URL: http://localhost:3000
```

#### 1.3 Redirect URLs 추가
다음 URL들을 추가:
```
http://localhost:3000/verify-email
http://localhost:3000/auth/callback
http://localhost:3000/auth/confirm
http://localhost:3000/auth/reset-password
```

### 2. 이메일 템플릿 수정

#### 2.1 Confirm signup 템플릿
Authentication → Settings → Email Templates → Confirm signup

```html
<h2>🎉 Prompt Hub에 오신 것을 환영합니다!</h2>

<p>안녕하세요!</p>

<p>Prompt Hub 회원가입을 완료하기 위해 이메일 인증을 진행해주세요.</p>

<p>아래 버튼을 클릭하여 이메일 인증을 완료하시면 모든 서비스를 이용하실 수 있습니다.</p>

<div style="text-align: center; margin: 30px 0;">
  <a href="{{ .ConfirmationURL }}" 
     style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; 
            font-weight: bold;">
    이메일 인증하기
  </a>
</div>

<p style="margin-top: 30px; font-size: 14px; color: #666;">
  만약 버튼이 작동하지 않는다면, 아래 링크를 복사하여 브라우저에 붙여넣기 해주세요:<br>
  <a href="{{ .ConfirmationURL }}" style="color: #667eea;">{{ .ConfirmationURL }}</a>
</p>

<p style="margin-top: 20px; font-size: 14px; color: #666;">
  이 링크는 24시간 후에 만료됩니다.
</p>

<div style="text-align: center; margin-top: 30px; color: #666; font-size: 14px;">
  <p>이 이메일은 Prompt Hub 회원가입 과정에서 발송되었습니다.</p>
  <p>문의사항이 있으시면 support@prompthub.com으로 연락해주세요.</p>
</div>
```

### 3. 환경 변수 설정

#### 3.1 .env.local 파일 생성
```env
# Supabase 설정
NEXT_PUBLIC_SUPABASE_URL=https://pahwayjrezkkgixykqpe.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhaHdheWpyZXpra2dpeHlrcXBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwMjkzMTQsImV4cCI6MjA2ODYwNTMxNH0.EjytJchLM5btZLp2RjD446MHa4W4V73Ul0jPCycm340
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhaHdheWpyZXpra2dpeHlrcXBlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MzAyOTMxNCwiZXhwIjoyMDY4NjA1MzE0fQ.vKulxgM2QCLVBpYtHanmYAe-y8ETCDZksxoWP6vQjyw

# JWT Secret
JWT_SECRET=your-jwt-secret-here

# Site URL (로컬 환경)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. 코드 수정

#### 4.1 이메일 링크 생성 함수 수정
`src/lib/email.ts`에서 로컬 환경 감지:

```typescript
export const generateVerificationLink = (token: string): string => {
  // 로컬 환경 감지
  const isLocalhost = typeof window !== 'undefined' && 
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
  
  const baseUrl = isLocalhost 
    ? 'http://localhost:3000' 
    : (process.env.NEXT_PUBLIC_SITE_URL || 'https://promptedu.io');
    
  return `${baseUrl}/verify-email?token=${token}`;
};
```

### 5. 테스트 방법

#### 5.1 회원가입 테스트
```bash
curl -X POST "http://localhost:3000/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "your-email@example.com",
    "username": "testuser",
    "password": "password123",
    "name": "테스트 사용자"
  }'
```

#### 5.2 이메일 확인
- 실제 이메일함에서 인증 이메일 확인
- Supabase 대시보드 → Authentication → Users에서 사용자 상태 확인

### 6. 대안 방법

#### 6.1 개발용 이메일 서비스 사용
- [Mailtrap](https://mailtrap.io/) - 개발용 이메일 캐치
- [Ethereal Email](https://ethereal.email/) - 테스트용 이메일

#### 6.2 Supabase Auth 대신 커스텀 이메일 사용
현재 구현된 커스텀 이메일 시스템 사용

### 7. 문제 해결

#### 7.1 이메일이 발송되지 않는 경우
1. Supabase 대시보드에서 Site URL 확인
2. Redirect URLs에 로컬 환경 URL 추가
3. 이메일 템플릿의 링크 확인
4. 환경 변수 설정 확인

#### 7.2 인증 링크가 작동하지 않는 경우
1. 로컬 환경 URL이 Redirect URLs에 포함되어 있는지 확인
2. 이메일 템플릿의 링크가 올바른지 확인
3. 브라우저에서 직접 링크 테스트

### 8. 모니터링

#### 8.1 Supabase 대시보드
- Authentication → Users: 사용자 목록 및 상태
- Authentication → Logs: 인증 로그
- Database → Logs: 데이터베이스 로그

#### 8.2 애플리케이션 로그
서버 콘솔에서 이메일 발송 로그 확인

## 주의사항
- 로컬 환경에서 Supabase Auth 이메일은 실제 이메일 서버를 통해 발송됩니다
- 무료 계정의 경우 월 이메일 발송 제한이 있을 수 있습니다
- 개발 환경에서는 테스트용 이메일 서비스 사용을 권장합니다
