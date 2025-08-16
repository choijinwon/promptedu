# Resend 이메일 서비스 설정 가이드

## 1. Resend 계정 생성

1. [Resend](https://resend.com)에 가입
2. 이메일 인증 완료
3. 대시보드에서 API 키 생성

## 2. 도메인 설정

### 2.1 도메인 추가
1. Resend 대시보드 → Domains
2. "Add Domain" 클릭
3. 도메인 입력 (예: `prompthub.com`)
4. DNS 레코드 설정 안내에 따라 DNS 설정

### 2.2 DNS 레코드 설정
도메인 제공업체에서 다음 DNS 레코드를 추가:

```
Type: TXT
Name: @
Value: resend-verification=your-verification-code
```

```
Type: CNAME
Name: resend
Value: track.resend.com
```

### 2.3 도메인 인증 확인
DNS 설정 후 Resend에서 도메인 인증 완료 확인

## 3. 환경 변수 설정

### 3.1 로컬 개발 환경
`.env.local` 파일에 추가:

```env
RESEND_API_KEY=re_your_api_key_here
```

### 3.2 프로덕션 환경
배포 플랫폼에서 환경 변수 설정:

**Vercel:**
- Settings → Environment Variables
- `RESEND_API_KEY` 추가

**Netlify:**
- Site settings → Environment variables
- `RESEND_API_KEY` 추가

## 4. 이메일 발송 테스트

### 4.1 개발 환경 테스트
```bash
# 회원가입 테스트
curl -X POST "http://localhost:3000/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "username": "testuser",
    "password": "password123",
    "name": "테스트 사용자"
  }'
```

### 4.2 이메일 확인
- 이메일함에서 인증 이메일 확인
- 인증 링크 클릭하여 인증 완료

## 5. 이메일 템플릿 커스터마이징

### 5.1 HTML 템플릿 수정
`src/lib/email.ts` 파일에서 `createVerificationEmail` 함수 수정:

```typescript
export const createVerificationEmail = (username: string, verificationLink: string) => {
  return {
    subject: 'Prompt Hub - 이메일 인증을 완료해주세요',
    html: `
      <!-- 여기에 커스텀 HTML 템플릿 작성 -->
    `,
    text: `
      <!-- 여기에 텍스트 버전 작성 -->
    `
  };
};
```

### 5.2 브랜드 컬러 변경
CSS에서 그라데이션 색상 수정:

```css
.header { 
  background: linear-gradient(135deg, #your-color-1 0%, #your-color-2 100%); 
}
```

## 6. 모니터링 및 로그

### 6.1 Resend 대시보드
- 이메일 발송 현황 확인
- 발송 실패 원인 분석
- 도달률 및 열람률 통계

### 6.2 애플리케이션 로그
```bash
# 이메일 발송 성공 로그
📧 Verification email sent successfully: {
  to: "user@example.com",
  id: "email-id",
  verificationLink: "https://..."
}

# 이메일 발송 실패 로그
❌ Error sending verification email: {
  error: "error details"
}
```

## 7. 문제 해결

### 7.1 이메일이 발송되지 않는 경우
1. API 키 확인
2. 도메인 인증 상태 확인
3. DNS 설정 확인
4. Resend 대시보드에서 오류 확인

### 7.2 스팸함으로 분류되는 경우
1. SPF, DKIM, DMARC 레코드 설정
2. 도메인 평판 확인
3. 이메일 내용 최적화

### 7.3 개발 환경에서 테스트
API 키가 없으면 자동으로 개발 모드로 전환되어 콘솔에 이메일 내용이 출력됩니다.

## 8. 보안 고려사항

1. **API 키 보안**: 환경 변수로 관리, 절대 코드에 하드코딩하지 않기
2. **도메인 인증**: 반드시 도메인 인증 완료 후 사용
3. **이메일 내용**: 스팸 필터를 피하기 위한 적절한 내용 작성
4. **토큰 보안**: 인증 토큰은 24시간 후 만료되도록 설정

## 9. 비용 관리

Resend 요금제:
- **Free**: 월 3,000건 (개발용)
- **Pro**: 월 $20부터 (프로덕션용)
- **Enterprise**: 맞춤형 요금

실제 사용량에 따라 적절한 요금제 선택 권장.
