# Resend 이메일 서비스 설정 가이드

## 📧 Resend란?
Resend는 개발자를 위한 현대적인 이메일 API 서비스입니다. 높은 전송률과 간단한 API를 제공합니다.

## 🚀 설정 단계

### 1. 계정 생성
1. [Resend 웹사이트](https://resend.com) 방문
2. **Sign Up** 클릭
3. 이메일과 비밀번호로 가입

### 2. API 키 생성
1. Dashboard에 로그인
2. **API Keys** 메뉴 클릭
3. **Create API Key** 버튼 클릭
4. API 키 이름 입력 (예: "Prompt Hub Production")
5. **Create** 클릭
6. 생성된 API 키 복사 (예: `re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)

### 3. 도메인 설정
1. **Domains** 메뉴 클릭
2. **Add Domain** 클릭
3. 도메인 입력 (예: `prompthub.com`)
4. DNS 설정 추가:

#### DNS 레코드 설정
도메인 관리자 페이지에서 다음 레코드들을 추가하세요:

**TXT 레코드:**
- 이름: `resend._domainkey`
- 값: Resend에서 제공하는 값

**MX 레코드:**
- 이름: `@`
- 값: `mxa.resend.com` (우선순위: 10)
- 이름: `@`
- 값: `mxb.resend.com` (우선순위: 20)

### 4. 환경 변수 설정
`.env` 파일에 API 키 추가:

```bash
# Email Service (Resend for production)
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

### 5. 이메일 발송 테스트
```bash
node test-email.js
```

## 💰 요금제
- **무료 플랜**: 월 3,000건 이메일
- **Pro 플랜**: 월 $20부터 (100,000건 이메일)
- **Enterprise**: 맞춤형 요금

## 🔧 사용 예시

### JavaScript/Node.js
```javascript
const response = await fetch('https://api.resend.com/emails', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    from: 'Prompt Hub <noreply@prompthub.com>',
    to: 'user@example.com',
    subject: '이메일 인증',
    html: '<h1>안녕하세요!</h1>',
  }),
});
```

### React/Next.js
```javascript
// API Route에서 사용
export async function POST(request) {
  const { email, subject, html } = await request.json();
  
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Prompt Hub <noreply@prompthub.com>',
      to: email,
      subject: subject,
      html: html,
    }),
  });
  
  return Response.json({ success: response.ok });
}
```

## 📊 대시보드 기능
- 이메일 전송 통계
- 바운스 및 스팸 신고 관리
- 웹훅 설정
- 템플릿 관리

## 🔍 문제 해결

### API 키 오류
- API 키가 올바르게 복사되었는지 확인
- 환경 변수가 제대로 로드되었는지 확인

### 도메인 인증 오류
- DNS 레코드가 올바르게 설정되었는지 확인
- DNS 전파 시간 대기 (최대 24시간)

### 이메일 전송 실패
- 발신자 이메일이 인증된 도메인인지 확인
- 수신자 이메일 주소 형식 확인

## 📞 지원
- [Resend 문서](https://resend.com/docs)
- [GitHub](https://github.com/resendlabs/resend-node)
- [Discord 커뮤니티](https://discord.gg/resend)
