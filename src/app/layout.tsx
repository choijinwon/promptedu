import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "PromptEdu - AI 프롬프트 마켓플레이스 | ChatGPT, Claude 프롬프트 거래",
    template: "%s | PromptEdu"
  },
  description: "AI 프롬프트 제작자와 사용자를 연결하는 최고의 프롬프트 마켓플레이스입니다. ChatGPT, Claude, GPT-4 등 다양한 AI 모델용 고품질 프롬프트를 구매하고 판매하세요. 무료 프롬프트 공유도 가능합니다.",
  keywords: [
    "AI 프롬프트",
    "ChatGPT 프롬프트",
    "Claude 프롬프트",
    "GPT-4 프롬프트",
    "프롬프트 마켓플레이스",
    "AI 챗봇",
    "프롬프트 엔지니어링",
    "AI 자동화",
    "프롬프트 크리에이터",
    "AI 플랫폼",
    "프롬프트 거래",
    "무료 프롬프트",
    "AI 도구",
    "프롬프트 템플릿",
    "AI 비즈니스",
    "프롬프트 최적화"
  ],
  authors: [{ name: "PromptEdu Team" }],
  creator: "PromptEdu",
  publisher: "PromptEdu",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://promptedu.io'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://promptedu.io',
    siteName: 'PromptEdu',
    title: 'PromptEdu - AI 프롬프트 마켓플레이스',
    description: 'AI 프롬프트 제작자와 사용자를 연결하는 최고의 프롬프트 마켓플레이스입니다. ChatGPT, Claude, GPT-4 등 다양한 AI 모델용 고품질 프롬프트를 구매하고 판매하세요.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PromptEdu - AI 프롬프트 마켓플레이스',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PromptEdu - AI 프롬프트 마켓플레이스',
    description: 'AI 프롬프트 제작자와 사용자를 연결하는 최고의 프롬프트 마켓플레이스입니다.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'technology',
  classification: 'AI Platform',
  other: {
    'naver-site-verification': 'your-naver-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_MEASUREMENT_ID', {
                page_title: document.title,
                page_location: window.location.href,
              });
            `,
          }}
        />
        {/* Google Search Console */}
        <meta name="google-site-verification" content="your-verification-code" />
        {/* Naver Webmaster Tools */}
        <meta name="naver-site-verification" content="your-verification-code" />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
          {children}
        </div>
      </body>
    </html>
  );
}
