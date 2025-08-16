# Mailtrap을 사용한 로컬 이메일 발송 설정

## 문제 상황
로컬 환경에서 Supabase Auth 이메일이 발송되지 않아 실제 이메일을 받을 수 없는 문제

## 해결 방법: Mailtrap 사용

### 1. Mailtrap 계정 생성
1. [Mailtrap](https://mailtrap.io/) 가입
2. 무료 계정으로 시작
3. Inboxes → Default Inbox 선택

### 2. SMTP 설정 확인
Mailtrap 대시보드에서 SMTP 설정 확인:
- **Host**: `smtp.mailtrap.io`
- **Port**: `2525` (또는 `587`)
- **Username**: 제공된 사용자명
- **Password**: 제공된 비밀번호

### 3. 환경 변수 설정

#### 3.1 .env.local 파일에 추가
```env
# Mailtrap 설정 (로컬 이메일 발송용)
MAILTRAP_HOST=smtp.mailtrap.io
MAILTRAP_PORT=2525
MAILTRAP_USER=your-mailtrap-username
MAILTRAP_PASS=your-mailtrap-password

# 기존 설정
NEXT_PUBLIC_SUPABASE_URL=https://pahwayjrezkkgixykqpe.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
JWT_SECRET=your-jwt-secret-here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. 테스트 방법

#### 4.1 회원가입 테스트
```bash
curl -X POST "http://localhost:3000/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "username": "testuser",
    "password": "password123",
    "name": "테스트 사용자"
  }'
```

#### 4.2 이메일 확인
1. Mailtrap 대시보드 → Inboxes → Default Inbox
2. 발송된 이메일 확인
3. 이메일 내용 및 링크 테스트

### 5. 서버 로그 확인
Mailtrap 설정 후 서버 콘솔에서 다음 로그 확인:
```
🔧 Local environment detected, using development mode
📧 Attempting to send real email via Mailtrap...
📧 Email sent successfully via Mailtrap!
Message ID: <message-id>
Preview URL: https://mailtrap.io/inbox/...
```

### 6. 이메일 미리보기
Mailtrap에서 제공하는 Preview URL을 통해 이메일 내용 확인 가능

## 대안 방법

### 1. Ethereal Email (무료)
```typescript
// Ethereal Email 사용 예시
const testAccount = await nodemailer.createTestAccount();
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false,
  auth: {
    user: testAccount.user,
    pass: testAccount.pass,
  },
});
```

### 2. Gmail SMTP (개인 계정)
```env
MAILTRAP_HOST=smtp.gmail.com
MAILTRAP_PORT=587
MAILTRAP_USER=your-gmail@gmail.com
MAILTRAP_PASS=your-app-password
```

### 3. Supabase Auth 설정 (프로덕션)
Supabase 대시보드에서 로컬 환경 URL 추가:
- Site URL: `http://localhost:3000`
- Redirect URLs: `http://localhost:3000/verify-email`

## 장점
1. **실제 이메일 발송**: 로컬 환경에서도 실제 이메일 수신
2. **스팸 방지**: 개발용 이메일이 실제 이메일함에 도달하지 않음
3. **무료**: 개발용으로 충분한 무료 할당량
4. **미리보기**: 웹에서 이메일 내용 확인 가능

## 주의사항
1. **개발용만 사용**: 프로덕션에서는 실제 이메일 서비스 사용
2. **환경 변수 보안**: .env.local 파일을 git에 커밋하지 않기
3. **할당량 확인**: 무료 계정의 월 이메일 발송 제한 확인

## 문제 해결

### 이메일이 발송되지 않는 경우
1. 환경 변수 설정 확인
2. Mailtrap 계정 상태 확인
3. 서버 로그에서 오류 메시지 확인
4. 네트워크 연결 확인

### 이메일이 Mailtrap에 도달하지 않는 경우
1. SMTP 설정 재확인
2. 포트 번호 확인 (2525 또는 587)
3. 방화벽 설정 확인
4. Mailtrap 계정 상태 확인
