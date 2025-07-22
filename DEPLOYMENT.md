# PromptEDU 배포 가이드

## 🚀 promptedu.io 도메인 배포

### 1. Vercel 배포 (권장)

#### 준비사항
- [Vercel 계정](https://vercel.com) 생성
- GitHub 저장소 연결

#### 배포 단계

1. **Vercel 프로젝트 생성**
```bash
# Vercel CLI 설치
npm i -g vercel

# 프로젝트 로그인
vercel login

# 배포
vercel --prod
```

2. **환경 변수 설정**
Vercel 대시보드에서 다음 환경 변수를 설정:

```env
NEXT_PUBLIC_APP_URL=https://promptedu.io
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
AUTH0_SECRET=your_auth0_secret
AUTH0_BASE_URL=https://promptedu.io
AUTH0_ISSUER_BASE_URL=https://your-domain.auth0.com
AUTH0_CLIENT_ID=your_auth0_client_id
AUTH0_CLIENT_SECRET=your_auth0_client_secret
OPENAI_API_KEY=your_openai_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key
```

3. **도메인 연결**
- Vercel 대시보드 → Domains
- `promptedu.io` 추가
- DNS 설정 확인

### 2. Netlify 배포

#### 준비사항
- [Netlify 계정](https://netlify.com) 생성
- GitHub 저장소 연결

#### 배포 설정
```toml
# netlify.toml
[build]
  command = "pnpm build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

### 3. AWS Amplify 배포

#### 준비사항
- AWS 계정
- Amplify Console 접근

#### 배포 단계
1. Amplify Console에서 새 앱 생성
2. GitHub 저장소 연결
3. 빌드 설정 구성
4. 환경 변수 설정
5. 도메인 연결

### 4. 수동 서버 배포

#### Docker 사용
```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  promptedu:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_APP_URL=https://promptedu.io
```

### 5. SSL 인증서 설정

#### Let's Encrypt (무료)
```bash
# Certbot 설치
sudo apt-get install certbot

# 인증서 발급
sudo certbot certonly --standalone -d promptedu.io -d www.promptedu.io

# 자동 갱신 설정
sudo crontab -e
# 0 12 * * * /usr/bin/certbot renew --quiet
```

### 6. CDN 설정

#### Cloudflare 설정
1. Cloudflare 계정 생성
2. 도메인 추가
3. DNS 레코드 설정
4. SSL/TLS 모드: Full (strict)
5. 캐싱 규칙 설정

### 7. 모니터링 설정

#### Vercel Analytics
```bash
# Vercel Analytics 설치
npm install @vercel/analytics

# 사용법
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

#### Google Analytics
```bash
# GA4 설정
npm install @next/third-parties

# 사용법
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

### 8. 성능 최적화

#### 이미지 최적화
```bash
# next.config.js
const nextConfig = {
  images: {
    domains: ['promptedu.io'],
    formats: ['image/webp', 'image/avif'],
  },
  experimental: {
    optimizeCss: true,
  },
};
```

#### 번들 분석
```bash
# 번들 크기 분석
npm install @next/bundle-analyzer

# next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);
```

### 9. 보안 설정

#### Security Headers
```javascript
// next.config.js
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
];

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};
```

### 10. 백업 및 복구

#### 데이터베이스 백업
```bash
# Supabase 백업 스크립트
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump $DATABASE_URL > backup_$DATE.sql
gzip backup_$DATE.sql
aws s3 cp backup_$DATE.sql.gz s3://promptedu-backups/
```

### 11. 배포 체크리스트

- [ ] 환경 변수 설정 완료
- [ ] SSL 인증서 발급
- [ ] 도메인 DNS 설정
- [ ] CDN 설정
- [ ] 모니터링 설정
- [ ] 백업 시스템 구축
- [ ] 성능 테스트 완료
- [ ] 보안 검사 완료
- [ ] SEO 최적화 완료

### 12. 문제 해결

#### 일반적인 문제들
1. **빌드 실패**: Node.js 버전 확인
2. **환경 변수 오류**: Vercel 대시보드에서 재설정
3. **도메인 연결 실패**: DNS 설정 확인
4. **SSL 오류**: 인증서 갱신 확인

#### 로그 확인
```bash
# Vercel 로그
vercel logs

# 실시간 로그
vercel logs --follow
```

---

**promptedu.io** 도메인으로 성공적인 배포를 기원합니다! 🚀 