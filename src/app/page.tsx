import { Metadata } from "next";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  LightBulbIcon,
  UserGroupIcon,
  GlobeAltIcon,
  HeartIcon,
  CurrencyDollarIcon,
  CogIcon,
  CubeIcon,
  UserPlusIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";
import AuthStatus from "@/components/AuthStatus";

export const metadata: Metadata = {
  title: "AI 프롬프트 거래 플랫폼 - Prompt Hub",
  description: "ChatGPT, Claude, GPT-4 등 다양한 AI 모델용 고품질 프롬프트를 구매하고 판매하세요. 프롬프트 제작자와 사용자를 연결하는 최고의 AI 프롬프트 마켓플레이스입니다.",
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
    "프롬프트 거래"
  ],
  openGraph: {
    title: "AI 프롬프트 거래 플랫폼 - Prompt Hub",
    description: "ChatGPT, Claude, GPT-4 등 다양한 AI 모델용 고품질 프롬프트를 구매하고 판매하세요.",
    url: "https://prompt-hub.com",
    siteName: "Prompt Hub",
    images: [
      {
        url: "/og-home.png",
        width: 1200,
        height: 630,
        alt: "Prompt Hub - AI 프롬프트 거래 플랫폼",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI 프롬프트 거래 플랫폼 - Prompt Hub",
    description: "ChatGPT, Claude, GPT-4 등 다양한 AI 모델용 고품질 프롬프트를 구매하고 판매하세요.",
    images: ["/og-home.png"],
  },
  alternates: {
    canonical: "/",
  },
};

interface CanvasItem {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  items: string[];
  color: string;
}

const canvasItems: CanvasItem[] = [
  {
    id: "value-proposition",
    title: "핵심 가치 제안",
    icon: LightBulbIcon,
    items: [
      "고품질 프롬프트의 거래, 공유 플랫폼 제공",
      "프롬프트 제작자와 사용자 연결",
      "맞춤형 프롬프트, API 연동 프롬프트 제공",
      "기업용 AI 자동화 프롬프트 패키지",
    ],
    color: "bg-gradient-to-br from-blue-500 to-purple-600",
  },
  {
    id: "customer-segments",
    title: "고객 세그먼트",
    icon: UserGroupIcon,
    items: [
      "프롬프트 구매자 (개인/직장인/프리랜서)",
      "프롬프트 제작자 (크리에이터)",
      "AI 활용 기업 (B2B)",
      "AI 교육 수요자",
    ],
    color: "bg-gradient-to-br from-green-500 to-teal-600",
  },
  {
    id: "channels",
    title: "채널",
    icon: GlobeAltIcon,
    items: [
      "자체 웹사이트/모바일 앱",
      "SNS (X, 인스타그램, 유튜브)",
      "광고 플랫폼",
      "검색엔진 (SEO 최적화)",
    ],
    color: "bg-gradient-to-br from-orange-500 to-red-600",
  },
  {
    id: "customer-relationships",
    title: "고객 관계",
    icon: HeartIcon,
    items: [
      "셀프 서비스 (프롬프트 구매/다운로드)",
      "멤버십 커뮤니티",
      "사용자 리뷰/추천 시스템",
      "CS 채널: 이메일/챗봇",
    ],
    color: "bg-gradient-to-br from-pink-500 to-rose-600",
  },
  {
    id: "revenue-streams",
    title: "수익원",
    icon: CurrencyDollarIcon,
    items: [
      "프롬프트 판매 수수료 (10~30%)",
      "월간/연간 프리미엄 멤버십",
      "API 호출 수익 (사용량 기반)",
      "B2B 패키지 판매",
      "광고 및 제휴 배너 수익",
      "프롬프트 작성법 강의/교육 판매",
    ],
    color: "bg-gradient-to-br from-yellow-500 to-amber-600",
  },
  {
    id: "key-activities",
    title: "주요 활동",
    icon: CogIcon,
    items: [
      "플랫폼 운영 및 유지보수",
      "프롬프트 검수, 품질 관리",
      "사용자/크리에이터 모집",
      "마케팅 및 커뮤니티 관리",
      "API/자동화 기능 개발",
    ],
    color: "bg-gradient-to-br from-indigo-500 to-blue-600",
  },
  {
    id: "key-resources",
    title: "주요 자원",
    icon: CubeIcon,
    items: [
      "플랫폼 개발팀 (웹/모바일/백엔드)",
      "AI/프롬프트 전문가",
      "서버 인프라 (클라우드)",
      "마케팅 채널 (SNS, 광고)",
      "결제 시스템",
    ],
    color: "bg-gradient-to-br from-purple-500 to-violet-600",
  },
  {
    id: "key-partners",
    title: "핵심 파트너",
    icon: UserPlusIcon,
    items: [
      "결제 대행사 (KG이니시스, Stripe)",
      "AI API 제공자 (OpenAI, Anthropic)",
      "광고 플랫폼 (구글, 네이버)",
      "제휴 기업 (AI 서비스 업체)",
    ],
    color: "bg-gradient-to-br from-emerald-500 to-green-600",
  },
  {
    id: "cost-structure",
    title: "비용 구조",
    icon: BanknotesIcon,
    items: [
      "개발 및 서버 운영 비용",
      "마케팅/광고 비용",
      "결제 수수료",
      "크리에이터 인센티브",
      "고객지원 및 검수 인력 비용",
    ],
    color: "bg-gradient-to-br from-red-500 to-pink-600",
  },
];

export default function Home() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  // 구조화된 데이터 (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Prompt Hub",
    "description": "AI 프롬프트 제작자와 사용자를 연결하는 고품질 프롬프트 거래, 공유 플랫폼입니다.",
    "url": "https://prompt-hub.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://prompt-hub.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "sameAs": [
      "https://twitter.com/prompthub",
      "https://facebook.com/prompthub"
    ]
  };

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Prompt Hub",
    "description": "AI 프롬프트 거래 플랫폼",
    "url": "https://prompt-hub.com",
    "logo": "https://prompt-hub.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "support@prompt-hub.com"
    },
    "sameAs": [
      "https://twitter.com/prompthub",
      "https://facebook.com/prompthub"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationData),
        }}
      />
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-gray-900">
                  🎯 Prompt Hub
                </h1>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#canvas" className="text-gray-500 hover:text-gray-900">
                비즈니스 모델
              </a>
              <a href="#features" className="text-gray-500 hover:text-gray-900">
                주요 기능
              </a>
              <a href="#pricing" className="text-gray-500 hover:text-gray-900">
                가격 정책
              </a>
              <a href="/marketplace" className="text-gray-500 hover:text-gray-900">
                마켓플레이스
              </a>
              <a href="/shared-prompts" className="text-gray-500 hover:text-gray-900">
                공유 프롬프트
              </a>
            </nav>
            <AuthStatus />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold mb-6"
          >
            프롬프트 허브 비즈니스 모델
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl mb-8 max-w-3xl mx-auto"
          >
            고품질 프롬프트의 거래, 공유 플랫폼으로 프롬프트 제작자와 사용자를 연결하는
            혁신적인 AI 생태계를 구축합니다.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
              플랫폼 둘러보기
            </button>
            <a href="/creator/apply" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              크리에이터 등록
            </a>
          </motion.div>
        </div>
      </section>

      {/* Business Model Canvas */}
      <section id="canvas" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              비즈니스 모델 캔버스
            </h2>
            <p className="text-lg text-gray-600">
              프롬프트 허브의 9가지 핵심 구성요소를 확인하세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {canvasItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
              >
                <div className={`p-6 ${item.color} rounded-t-xl`}>
                  <div className="flex items-center justify-between">
                    <item.icon className="h-8 w-8 text-white" />
                    <span className="text-white font-semibold">{item.title}</span>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="space-y-2">
                    {item.items.map((listItem, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="text-sm text-gray-600 flex items-start"
                      >
                        <span className="text-blue-500 mr-2">•</span>
                        {listItem}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              주요 기능
            </h2>
            <p className="text-lg text-gray-600">
              프롬프트 허브의 핵심 기능들을 살펴보세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <LightBulbIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">프롬프트 마켓플레이스</h3>
              <p className="text-gray-600">
                고품질 프롬프트를 거래하고 공유할 수 있는 안전한 플랫폼
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserGroupIcon className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">크리에이터 지원</h3>
              <p className="text-gray-600">
                프롬프트 제작자를 위한 수익 창출 및 커뮤니티 지원
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CogIcon className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">API 연동</h3>
              <p className="text-gray-600">
                OpenAI, Anthropic 등 다양한 AI 서비스와의 원활한 연동
              </p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CurrencyDollarIcon className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">수익 모델</h3>
              <p className="text-gray-600">
                다양한 수익원을 통한 지속 가능한 비즈니스 모델
              </p>
            </div>

            <div className="text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <HeartIcon className="h-8 w-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">커뮤니티</h3>
              <p className="text-gray-600">
                프롬프트 제작자와 사용자를 연결하는 활발한 커뮤니티
              </p>
            </div>

            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <GlobeAltIcon className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">글로벌 확장</h3>
              <p className="text-gray-600">
                한국을 시작으로 글로벌 시장 진출을 위한 준비
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              수익 구조
            </h2>
            <p className="text-lg text-gray-600">
              다양한 수익원을 통한 지속 가능한 성장
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-semibold mb-4">프롬프트 판매</h3>
              <div className="text-3xl font-bold text-blue-600 mb-4">10-30%</div>
              <p className="text-gray-600 mb-6">판매 수수료</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• 개별 프롬프트 판매</li>
                <li>• 프롬프트 패키지 판매</li>
                <li>• 맞춤형 프롬프트 제작</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-blue-500">
              <h3 className="text-xl font-semibold mb-4">프리미엄 멤버십</h3>
              <div className="text-3xl font-bold text-blue-600 mb-4">월/연간</div>
              <p className="text-gray-600 mb-6">구독 수익</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• 월간 멤버십</li>
                <li>• 연간 멤버십</li>
                <li>• 기업용 패키지</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-semibold mb-4">API 서비스</h3>
              <div className="text-3xl font-bold text-blue-600 mb-4">사용량 기반</div>
              <p className="text-gray-600 mb-6">API 호출 수익</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• API 호출당 과금</li>
                <li>• 대량 사용 할인</li>
                <li>• 기업용 API 패키지</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Prompt Hub</h3>
              <p className="text-gray-400">
                고품질 프롬프트 거래 플랫폼
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">서비스</h4>
              <ul className="space-y-2 text-gray-400">
                <li>프롬프트 마켓플레이스</li>
                <li>크리에이터 지원</li>
                <li>API 연동</li>
                <li>커뮤니티</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">지원</h4>
              <ul className="space-y-2 text-gray-400">
                <li>고객센터</li>
                <li>문의하기</li>
                <li>FAQ</li>
                <li>가이드</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">연결</h4>
              <ul className="space-y-2 text-gray-400">
                <li>회사 소개</li>
                <li>채용</li>
                <li>파트너십</li>
                <li>뉴스</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Prompt Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}
