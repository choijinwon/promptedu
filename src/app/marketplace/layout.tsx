import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI 프롬프트 마켓플레이스",
  description: "ChatGPT, Claude, GPT-4 등 다양한 AI 모델용 고품질 프롬프트를 구매하고 판매하세요. 무료 프롬프트부터 프리미엄 프롬프트까지 다양한 옵션을 제공합니다.",
  keywords: [
    "AI 프롬프트 마켓플레이스",
    "ChatGPT 프롬프트 구매",
    "Claude 프롬프트 판매",
    "GPT-4 프롬프트",
    "AI 프롬프트 거래",
    "프롬프트 마켓",
    "AI 도구",
    "프롬프트 템플릿"
  ],
  openGraph: {
    title: "AI 프롬프트 마켓플레이스 | PromptEdu",
    description: "ChatGPT, Claude, GPT-4 등 다양한 AI 모델용 고품질 프롬프트를 구매하고 판매하세요.",
    url: "https://promptedu.io/marketplace",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI 프롬프트 마켓플레이스 | PromptEdu",
    description: "ChatGPT, Claude, GPT-4 등 다양한 AI 모델용 고품질 프롬프트를 구매하고 판매하세요.",
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
  return <>{children}</>;
} 