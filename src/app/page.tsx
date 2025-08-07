"use client";

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
  AcademicCapIcon,
  BookOpenIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  BoltIcon,
} from "@heroicons/react/24/outline";
import AuthStatus from "@/components/AuthStatus";

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
      "교육학적으로 검증된 AI 프롬프트 플랫폼",
      "교육자와 학습자를 위한 전문 프롬프트",
      "개인화 학습 경험 제공",
      "교육 커뮤니티 기반 지식 공유",
    ],
    color: "bg-gradient-to-br from-blue-500 to-purple-600",
  },
  {
    id: "customer-segments",
    title: "고객 세그먼트",
    icon: UserGroupIcon,
    items: [
      "초중고 교사 및 교육자",
      "대학교 교수 및 연구자",
      "학부모 및 개인 학습자",
      "교육 기관 및 학교",
    ],
    color: "bg-gradient-to-br from-green-500 to-teal-600",
  },
  {
    id: "channels",
    title: "채널",
    icon: GlobeAltIcon,
    items: [
      "교육자 커뮤니티 및 SNS",
      "교육 기관 파트너십",
      "교육 컨퍼런스 및 세미나",
      "SEO 최적화된 웹 플랫폼",
    ],
    color: "bg-gradient-to-br from-orange-500 to-red-600",
  },
  {
    id: "customer-relationships",
    title: "고객 관계",
    icon: HeartIcon,
    items: [
      "교육자 커뮤니티 운영",
      "1:1 교육 컨설팅",
      "교육 성과 분석 및 피드백",
      "지속적인 교육 지원",
    ],
    color: "bg-gradient-to-br from-pink-500 to-rose-600",
  },
  {
    id: "revenue-streams",
    title: "수익원",
    icon: CurrencyDollarIcon,
    items: [
      "교육 프롬프트 구독 서비스",
      "교육 기관 라이센스 판매",
      "교육자 전문 과정 판매",
      "교육 분석 도구 판매",
    ],
    color: "bg-gradient-to-br from-yellow-500 to-amber-600",
  },
  {
    id: "key-activities",
    title: "주요 활동",
    icon: CogIcon,
    items: [
      "교육 프롬프트 연구 및 개발",
      "교육자 커뮤니티 관리",
      "교육 성과 분석 시스템",
      "교육 기관 파트너십",
    ],
    color: "bg-gradient-to-br from-indigo-500 to-blue-600",
  },
];

const features = [
  {
    icon: AcademicCapIcon,
    title: "교육 전문 프롬프트",
    description: "교육학적으로 검증된 프롬프트로 효과적인 학습 경험을 제공합니다.",
    color: "from-blue-500 to-purple-600",
  },
  {
    icon: BookOpenIcon,
    title: "개인화 학습",
    description: "학습자의 수준과 특성에 맞춘 맞춤형 교육 프롬프트를 생성합니다.",
    color: "from-green-500 to-teal-600",
  },
  {
    icon: UserGroupIcon,
    title: "교육자 커뮤니티",
    description: "전국의 교육자들이 공유하는 프롬프트와 교육 노하우를 확인하세요.",
    color: "from-orange-500 to-red-600",
  },
  {
    icon: ChartBarIcon,
    title: "학습 분석",
    description: "실시간 학습 성과 분석과 개선점을 제공합니다.",
    color: "from-pink-500 to-rose-600",
  },
  {
    icon: ShieldCheckIcon,
    title: "안전한 환경",
    description: "교육에 특화된 안전하고 신뢰할 수 있는 AI 환경을 제공합니다.",
    color: "from-indigo-500 to-blue-600",
  },
  {
    icon: BoltIcon,
    title: "빠른 생성",
    description: "몇 초 만에 교육 목적에 맞는 프롬프트를 생성할 수 있습니다.",
    color: "from-yellow-500 to-amber-600",
  },
];

const testimonials = [
  {
    name: "김선생님",
    role: "초등학교 교사",
    content: "Prompt Hub로 수학 개념을 쉽게 설명하는 프롬프트를 만들 수 있어서 아이들이 더 잘 이해하네요.",
    avatar: "👨‍🏫",
  },
  {
    name: "이교수님",
    role: "대학교 교수",
    content: "연구와 교육을 병행하는데 Prompt Hub가 큰 도움이 됩니다. 시간을 절약할 수 있어요.",
    avatar: "👩‍🏫",
  },
  {
    name: "박학부모님",
    role: "학부모",
    content: "아이의 학습을 도와주는 프롬프트를 만들어서 가정에서도 효과적으로 학습할 수 있어요.",
    avatar: "👨‍👩‍👧‍👦",
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
        <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-8">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Prompt Hub
                </h1>
                <nav className="hidden md:flex space-x-6">
                  <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">
                    소개
                  </a>
                  <a href="/marketplace" className="text-gray-700 hover:text-blue-600 transition-colors">
                    마켓플레이스
                  </a>
                  <a href="/shared-prompts" className="text-gray-700 hover:text-blue-600 transition-colors">
                    공유 프롬프트
                  </a>
                </nav>
              </div>
              <AuthStatus />
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
              >
                AI 교육의 새로운 패러다임
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto"
              >
                교육자와 학습자를 위한 AI 프롬프트 전문 플랫폼으로 교육 혁신을 선도합니다.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <a
                  href="/shared-prompts"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  무료로 시작하기
                </a>
                <a
                  href="/marketplace"
                  className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-200"
                >
                  데모 보기
                </a>
              </motion.div>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">1,234+</div>
                <div className="text-gray-600">등록된 교육자</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">12,567+</div>
                <div className="text-gray-600">활성 학습자</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">2,890+</div>
                <div className="text-gray-600">교육 프롬프트</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">28%</div>
                <div className="text-gray-600">학습 성과 향상</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Prompt Hub의 특별한 기능
              </h2>
              <p className="text-xl text-gray-600">
                교육 혁신을 위한 AI 프롬프트 플랫폼
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-all duration-300"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                사용자들의 후기
              </h2>
              <p className="text-xl text-gray-600">
                실제 사용자들의 생생한 경험담
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg p-8"
                >
                  <div className="flex items-center mb-6">
                    <div className="text-4xl mr-4">{testimonial.avatar}</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed italic">
                    "{testimonial.content}"
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              지금 시작하세요
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              교육의 미래를 경험해보세요. Prompt Hub와 함께 AI 교육의 새로운 시대를 열어가세요.
            </p>
            <a
              href="/register"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              무료 회원가입
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Prompt Hub</h3>
                <p className="text-gray-400">
                  AI 교육의 새로운 패러다임을 선도하는 플랫폼입니다.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">제품</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>프롬프트 생성기</li>
                  <li>학습 분석</li>
                  <li>교육자 커뮤니티</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">지원</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>고객 지원</li>
                  <li>문서</li>
                  <li>API</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">연결</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>회사 소개</li>
                  <li>채용</li>
                  <li>파트너십</li>
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
