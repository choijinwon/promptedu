import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PromptEDU - AI 교육의 새로운 패러다임',
  description: '교육자와 학습자를 위한 AI 프롬프트 전문 플랫폼. 교육학적으로 검증된 프롬프트로 개인화된 학습 경험을 제공합니다.',
  keywords: 'AI 교육, 프롬프트, 교육 플랫폼, 개인화 학습, 교육 혁신, PromptEDU',
  authors: [{ name: 'PromptEDU Team' }],
  creator: 'PromptEDU',
  publisher: 'PromptEDU',
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
    title: 'PromptEDU - AI 교육의 새로운 패러다임',
    description: '교육자와 학습자를 위한 AI 프롬프트 전문 플랫폼',
    url: 'https://promptedu.io',
    siteName: 'PromptEDU',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PromptEDU - AI 교육 플랫폼',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PromptEDU - AI 교육의 새로운 패러다임',
    description: '교육자와 학습자를 위한 AI 프롬프트 전문 플랫폼',
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
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
} 