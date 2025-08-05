import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI 프롬프트 마켓플레이스 | Prompt Hub",
  description: "ChatGPT, Claude, GPT-4 등 다양한 AI 모델용 고품질 프롬프트를 구매하고 판매하세요. 프롬프트 제작자와 사용자를 연결하는 최고의 AI 프롬프트 마켓플레이스입니다.",
  keywords: [
    "AI 프롬프트 마켓플레이스",
    "ChatGPT 프롬프트",
    "Claude 프롬프트",
    "GPT-4 프롬프트",
    "프롬프트 구매",
    "프롬프트 판매",
    "AI 챗봇",
    "프롬프트 엔지니어링",
    "AI 자동화",
    "프롬프트 크리에이터"
  ],
  openGraph: {
    title: "AI 프롬프트 마켓플레이스 | Prompt Hub",
    description: "ChatGPT, Claude, GPT-4 등 다양한 AI 모델용 고품질 프롬프트를 구매하고 판매하세요.",
    url: "https://prompt-hub.com/marketplace",
    siteName: "Prompt Hub",
    images: [
      {
        url: "/og-marketplace.png",
        width: 1200,
        height: 630,
        alt: "Prompt Hub 마켓플레이스",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI 프롬프트 마켓플레이스 | Prompt Hub",
    description: "ChatGPT, Claude, GPT-4 등 다양한 AI 모델용 고품질 프롬프트를 구매하고 판매하세요.",
    images: ["/og-marketplace.png"],
  },
  alternates: {
    canonical: "/marketplace",
  },
};

export default function MarketplaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 