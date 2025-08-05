import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Prompt Hub - 고품질 AI 프롬프트 거래 플랫폼",
    template: "%s | Prompt Hub"
  },
  description: "AI 프롬프트 제작자와 사용자를 연결하는 고품질 프롬프트 거래, 공유 플랫폼입니다. ChatGPT, Claude, GPT-4 등 다양한 AI 모델용 프롬프트를 구매하고 판매하세요.",
  keywords: [
    "프롬프트",
    "AI 프롬프트",
    "ChatGPT 프롬프트",
    "Claude 프롬프트",
    "GPT-4 프롬프트",
    "AI 챗봇",
    "프롬프트 엔지니어링",
    "AI 자동화",
    "프롬프트 크리에이터",
    "AI 플랫폼",
    "프롬프트 거래",
    "프롬프트 마켓플레이스"
  ],
  authors: [{ name: "Prompt Hub Team" }],
  creator: "Prompt Hub",
  publisher: "Prompt Hub",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://prompt-hub.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://prompt-hub.com',
    siteName: 'Prompt Hub',
    title: 'Prompt Hub - 고품질 AI 프롬프트 거래 플랫폼',
    description: 'AI 프롬프트 제작자와 사용자를 연결하는 고품질 프롬프트 거래, 공유 플랫폼입니다.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Prompt Hub - AI 프롬프트 거래 플랫폼',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prompt Hub - 고품질 AI 프롬프트 거래 플랫폼',
    description: 'AI 프롬프트 제작자와 사용자를 연결하는 고품질 프롬프트 거래, 공유 플랫폼입니다.',
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
