# Supabase 이메일 설정 가이드

## 1. Supabase Auth 이메일 설정

### 1.1 Supabase 대시보드 접속
1. [Supabase Dashboard](https://supabase.com/dashboard) 접속
2. 프로젝트 선택: `pahwayjrezkkgixykqpe`
3. Authentication → Settings

### 1.2 이메일 설정
1. **Enable email confirmations**: ✅ 활성화
2. **Enable email change confirmations**: ✅ 활성화
3. **Enable secure email change**: ✅ 활성화

### 1.3 이메일 템플릿 커스터마이징

#### Confirm signup 템플릿 수정:
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

#### Magic Link 템플릿 수정:
```html
<h2>🔐 Prompt Hub 로그인</h2>

<p>안녕하세요!</p>

<p>Prompt Hub에 로그인하기 위해 아래 링크를 클릭해주세요.</p>

<div style="text-align: center; margin: 30px 0;">
  <a href="{{ .ConfirmationURL }}" 
     style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; 
            font-weight: bold;">
    로그인하기
  </a>
</div>

<p style="margin-top: 30px; font-size: 14px; color: #666;">
  만약 버튼이 작동하지 않는다면, 아래 링크를 복사하여 브라우저에 붙여넣기 해주세요:<br>
  <a href="{{ .ConfirmationURL }}" style="color: #667eea;">{{ .ConfirmationURL }}</a>
</p>

<p style="margin-top: 20px; font-size: 14px; color: #666;">
  이 링크는 1시간 후에 만료됩니다.
</p>

<div style="text-align: center; margin-top: 30px; color: #666; font-size: 14px;">
  <p>이 이메일은 Prompt Hub 로그인 요청으로 발송되었습니다.</p>
  <p>본인이 요청하지 않았다면 이 이메일을 무시하세요.</p>
</div>
```

## 2. 도메인 설정

### 2.1 Site URL 설정
1. Authentication → Settings → URL Configuration
2. **Site URL**: `https://promptedu.io`
3. **Redirect URLs**: 
   - `https://promptedu.io/verify-email`
   - `https://promptedu.io/auth/callback`
   - `http://localhost:3000/verify-email` (개발용)

### 2.2 이메일 발신자 설정
1. **Sender Name**: `Prompt Hub`
2. **Sender Email**: `noreply@prompthub.com` (도메인 인증 필요)

## 3. 이메일 발송 테스트

### 3.1 회원가입 테스트
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

### 3.2 이메일 확인
- 실제 이메일함에서 인증 이메일 확인
- Supabase 대시보드 → Authentication → Users에서 사용자 상태 확인

## 4. 환경 변수 설정

### 4.1 로컬 개발 환경
`.env.local` 파일에 추가:
```env
# Supabase Auth 설정
NEXT_PUBLIC_SUPABASE_URL=https://pahwayjrezkkgixykqpe.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 4.2 프로덕션 환경
배포 플랫폼에서 환경 변수 설정:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## 5. 이메일 템플릿 변수

Supabase Auth에서 사용 가능한 템플릿 변수:

- `{{ .ConfirmationURL }}`: 인증/확인 링크
- `{{ .Token }}`: 인증 토큰
- `{{ .TokenHash }}`: 토큰 해시
- `{{ .SiteURL }}`: 사이트 URL
- `{{ .Email }}`: 사용자 이메일
- `{{ .Data }}`: 추가 데이터 (JSON)

## 6. 모니터링 및 로그

### 6.1 Supabase 대시보드
- Authentication → Users: 사용자 목록 및 상태
- Authentication → Logs: 인증 로그
- Database → Logs: 데이터베이스 로그

### 6.2 애플리케이션 로그
```bash
# 이메일 발송 성공 로그
📧 Verification email sent successfully via Supabase Auth: {
  to: "user@example.com",
  user: "user-id",
  verificationLink: "https://..."
}

# 이메일 발송 실패 로그
❌ Error sending verification email via Supabase Auth: {
  error: "error details"
}
```

## 7. 문제 해결

### 7.1 이메일이 발송되지 않는 경우
1. Supabase Auth 설정 확인
2. 이메일 템플릿 설정 확인
3. Site URL 및 Redirect URLs 설정 확인
4. 도메인 인증 상태 확인

### 7.2 인증 링크가 작동하지 않는 경우
1. Redirect URLs에 올바른 URL 추가
2. 이메일 템플릿의 링크 확인
3. 토큰 만료 시간 확인

### 7.3 개발 환경에서 테스트
Supabase Auth 실패 시 자동으로 개발 모드로 전환되어 콘솔에 이메일 내용이 출력됩니다.

## 8. 보안 고려사항

1. **토큰 보안**: Supabase가 자동으로 관리
2. **이메일 인증**: 필수 활성화
3. **도메인 인증**: 발신자 이메일 도메인 인증
4. **Rate Limiting**: Supabase에서 자동 관리

## 9. 비용

Supabase Auth 이메일:
- **Free Tier**: 월 50,000건
- **Pro Tier**: 월 100,000건
- **Enterprise**: 무제한

실제 사용량에 따라 적절한 요금제 선택 권장.
