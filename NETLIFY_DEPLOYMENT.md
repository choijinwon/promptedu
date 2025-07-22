# PromptEDU Netlify 배포 가이드

## 🚀 Netlify 배포 단계

### 1. Netlify 계정 설정

1. [Netlify](https://app.netlify.com/)에 가입/로그인
2. GitHub 계정 연결
3. PromptEDU 저장소 연결

### 2. 자동 배포 설정

#### GitHub 저장소 연결
1. Netlify 대시보드 → "New site from Git"
2. GitHub 선택
3. `OpenPrompt` 저장소 선택
4. 브랜치: `main` 선택

#### 빌드 설정
- **Build command**: `pnpm build`
- **Publish directory**: `.next`
- **Node version**: `18`

### 3. 환경 변수 설정

Netlify 대시보드 → Site settings → Environment variables에서 설정:

```env
# Production
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://promptedu.io

# Database (Supabase)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Authentication (Auth0)
AUTH0_SECRET=your_auth0_secret
AUTH0_BASE_URL=https://promptedu.io
AUTH0_ISSUER_BASE_URL=https://your-domain.auth0.com
AUTH0_CLIENT_ID=your_auth0_client_id
AUTH0_CLIENT_SECRET=your_auth0_client_secret

# AI Services
OPENAI_API_KEY=your_openai_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key

# File Storage (AWS S3)
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=ap-northeast-2
AWS_S3_BUCKET=promptedu-assets

# Analytics
NEXT_PUBLIC_GA_ID=your_google_analytics_id
NEXT_PUBLIC_MIXPANEL_TOKEN=your_mixpanel_token

# Email Service
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password

# Security
JWT_SECRET=your_jwt_secret
ENCRYPTION_KEY=your_encryption_key
```

### 4. 도메인 설정

#### 커스텀 도메인 연결
1. Netlify 대시보드 → Domain management
2. "Add custom domain" 클릭
3. `promptedu.io` 입력
4. DNS 설정 확인

#### DNS 설정 (도메인 제공업체에서)
```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: promptedu.netlify.app
```

### 5. SSL 인증서 설정

Netlify는 자동으로 SSL 인증서를 제공합니다:
1. Domain management → SSL/TLS
2. "Verify DNS configuration" 클릭
3. 자동 인증서 발급 대기 (최대 24시간)

### 6. 성능 최적화

#### 이미지 최적화
```javascript
// next.config.js
images: {
  unoptimized: true,
  domains: ['promptedu.io', 'localhost'],
}
```

#### 캐싱 설정
```toml
# netlify.toml
[[headers]]
  for = "/_next/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### 7. 모니터링 설정

#### Netlify Analytics
1. Site settings → Analytics
2. "Enable Analytics" 활성화
3. 트래픽 및 성능 모니터링

#### Google Analytics
```javascript
// src/app/layout.tsx
import { GoogleAnalytics } from '@next/third-parties/google';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  );
}
```

### 8. 배포 브랜치 설정

#### Production 배포
- **Branch**: `main`
- **Auto deploy**: 활성화

#### Preview 배포
- **Branch**: `develop`, `feature/*`
- **Auto deploy**: 활성화

### 9. 함수 설정 (API Routes)

#### Netlify Functions
```javascript
// netlify/functions/api.js
exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello from Netlify Functions!' }),
  };
};
```

### 10. 배포 체크리스트

- [ ] GitHub 저장소 연결
- [ ] 빌드 명령어 설정 (`pnpm build`)
- [ ] 환경 변수 설정
- [ ] 커스텀 도메인 연결
- [ ] SSL 인증서 발급
- [ ] 성능 최적화 설정
- [ ] 모니터링 설정
- [ ] 자동 배포 활성화

### 11. 문제 해결

#### 일반적인 문제들

1. **빌드 실패**
   ```bash
   # 로컬에서 테스트
   pnpm build
   ```

2. **환경 변수 오류**
   - Netlify 대시보드에서 환경 변수 재설정
   - 변수명 대소문자 확인

3. **도메인 연결 실패**
   - DNS 설정 확인
   - 24-48시간 대기

4. **이미지 로드 실패**
   ```javascript
   // next.config.js
   images: {
     unoptimized: true,
   }
   ```

### 12. 고급 설정

#### Branch Deploy
```toml
# netlify.toml
[context.branch-deploy]
  command = "pnpm build"
  publish = ".next"
```

#### Deploy Preview
```toml
# netlify.toml
[context.deploy-preview]
  command = "pnpm build"
  publish = ".next"
```

#### Production
```toml
# netlify.toml
[context.production]
  command = "pnpm build"
  publish = ".next"
```

### 13. 성능 모니터링

#### Core Web Vitals
- Netlify 대시보드 → Analytics → Core Web Vitals
- LCP, FID, CLS 모니터링

#### Build Analytics
- Netlify 대시보드 → Analytics → Builds
- 빌드 시간 및 성공률 추적

### 14. 보안 설정

#### Security Headers
```toml
# netlify.toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

#### Rate Limiting
- Netlify 대시보드 → Site settings → Security
- Rate limiting 설정

---

**promptedu.io** 도메인으로 Netlify 배포 성공을 기원합니다! 🚀

### 📞 지원

- [Netlify 문서](https://docs.netlify.com/)
- [Netlify 커뮤니티](https://community.netlify.com/)
- [Next.js Netlify 가이드](https://docs.netlify.com/integrations/frameworks/nextjs/) 