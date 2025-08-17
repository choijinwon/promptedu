"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { apiGet } from "@/lib/api";
import Head from "next/head";

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 로그인 상태 확인
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      console.log('Checking auth with token:', token ? 'EXISTS' : 'NOT_FOUND');
      
      if (token) {
        try {
          const response = await apiGet("/api/auth/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log('Auth check response status:', response.status);
          
          if (response.ok) {
            const userData = await response.json();
            console.log('Auth check user data:', userData);
            setUser(userData.user);
            setIsLoggedIn(true);
          } else {
            console.log('Auth check failed, removing token');
            localStorage.removeItem("token");
            setIsLoggedIn(false);
            setUser(null);
          }
        } catch (error) {
          console.error("Auth check error:", error);
          localStorage.removeItem("token");
          setIsLoggedIn(false);
          setUser(null);
        }
      } else {
        console.log('No token found');
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  // 로그아웃 함수
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
    window.location.href = "/";
  };
  useEffect(() => {
    // 구조화된 데이터 추가
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "PromptEdu",
      "description": "AI 프롬프트 제작자와 사용자를 연결하는 최고의 프롬프트 마켓플레이스입니다.",
      "url": "https://promptedu.io",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://promptedu.io/marketplace?search={search_term_string}",
        "query-input": "required name=search_term_string"
      },
      "sameAs": [
        "https://twitter.com/promptedu",
        "https://facebook.com/promptedu"
      ],
      "publisher": {
        "@type": "Organization",
        "name": "PromptEdu",
        "url": "https://promptedu.io",
        "logo": {
          "@type": "ImageObject",
          "url": "https://promptedu.io/logo.png"
        }
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <>
      <Head>
        <title>PromptEdu - AI 프롬프트 마켓플레이스 | ChatGPT, Claude 프롬프트 거래</title>
        <meta name="description" content="AI 프롬프트 제작자와 사용자를 연결하는 최고의 프롬프트 마켓플레이스입니다. ChatGPT, Claude, GPT-4 등 다양한 AI 모델용 고품질 프롬프트를 구매하고 판매하세요." />
        <meta name="keywords" content="AI 프롬프트, ChatGPT 프롬프트, Claude 프롬프트, GPT-4 프롬프트, 프롬프트 마켓플레이스, AI 챗봇, 프롬프트 엔지니어링" />
        <meta name="author" content="PromptEdu Team" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="PromptEdu - AI 프롬프트 마켓플레이스" />
        <meta property="og:description" content="AI 프롬프트 제작자와 사용자를 연결하는 최고의 프롬프트 마켓플레이스입니다." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://promptedu.io" />
        <meta property="og:image" content="https://promptedu.io/og-image.png" />
        <meta property="og:site_name" content="PromptEdu" />
        <meta property="og:locale" content="ko_KR" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PromptEdu - AI 프롬프트 마켓플레이스" />
        <meta name="twitter:description" content="AI 프롬프트 제작자와 사용자를 연결하는 최고의 프롬프트 마켓플레이스입니다." />
        <meta name="twitter:image" content="https://promptedu.io/og-image.png" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://promptedu.io" />
        
        {/* Additional SEO */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="PromptEdu" />
        
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white text-lg">🚀</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    PromptEdu
                  </h1>
                  <p className="text-sm text-gray-500">AI 프롬프트 마켓플레이스</p>
                </div>
              </div>
              
              <nav className="hidden md:flex items-center space-x-6">
                <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                  소개
                </Link>
                <Link href="/ai-prompt" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                  AI 프롬프트
                </Link>
                <Link href="/ai-tools" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                  AI 툴
                </Link>
                <Link href="/chatgpt-prompt" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                  ChatGPT
                </Link>
                <Link href="/korean-prompt" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                  한국어
                </Link>
                <Link href="/marketplace" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                  마켓플레이스
                </Link>
                <Link href="/shared-prompts" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                  공유 프롬프트
                </Link>
              </nav>

              <div className="flex items-center space-x-4">
                {loading ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                ) : isLoggedIn ? (
                  <>
                    <span className="text-gray-700 font-medium">
                      안녕하세요, {user?.name || user?.username || '사용자'}님!
                    </span>
                    <Link
                      href="/dashboard"
                      className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors font-medium"
                    >
                      내 프롬프트
                    </Link>
                    <Link
                      href="/write"
                      className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors font-medium"
                    >
                      글쓰기
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors font-medium"
                    >
                      로그아웃
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors font-medium"
                    >
                      로그인
                    </Link>
                    <Link
                      href="/register"
                      className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                    >
                      회원가입
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              AI 프롬프트의<br />
              새로운 세계
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              ChatGPT, Claude, GPT-4 등 다양한 AI 모델용 고품질 프롬프트를<br />
              구매하고 판매하는 최고의 프롬프트 마켓플레이스입니다
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/marketplace"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl"
              >
                마켓플레이스 둘러보기
              </Link>
              <Link
                href="/shared-prompts"
                className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-200 font-semibold text-lg"
              >
                무료 프롬프트 확인
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              왜 PromptEdu인가요?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">💎</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">고품질 프롬프트</h3>
                <p className="text-gray-600">
                  엄선된 AI 프롬프트 제작자들이 제공하는 고품질 프롬프트를 만나보세요
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🆓</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">무료 공유</h3>
                <p className="text-gray-600">
                  무료로 공유되는 프롬프트도 풍부하게 제공됩니다
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🚀</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">빠른 거래</h3>
                <p className="text-gray-600">
                  간편한 구매 시스템으로 원하는 프롬프트를 즉시 다운로드하세요
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-6">
              지금 시작해보세요
            </h2>
            <p className="text-xl mb-8 opacity-90">
              AI 프롬프트의 새로운 세계를 경험해보세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold text-lg"
              >
                무료 회원가입
              </Link>
              <Link
                href="/marketplace"
                className="px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-200 font-semibold text-lg"
              >
                프롬프트 둘러보기
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">PromptEdu</h3>
                <p className="text-gray-400">
                  AI 프롬프트 제작자와 사용자를 연결하는 최고의 플랫폼
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">서비스</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/marketplace" className="hover:text-white transition-colors">마켓플레이스</Link></li>
                  <li><Link href="/shared-prompts" className="hover:text-white transition-colors">공유 프롬프트</Link></li>
                  <li><Link href="/write" className="hover:text-white transition-colors">프롬프트 등록</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">지원</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/help" className="hover:text-white transition-colors">도움말</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors">문의하기</Link></li>
                  <li><Link href="/terms" className="hover:text-white transition-colors">이용약관</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">연결</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/about" className="hover:text-white transition-colors">회사 소개</Link></li>
                  <li><Link href="/blog" className="hover:text-white transition-colors">블로그</Link></li>
                  <li><Link href="/careers" className="hover:text-white transition-colors">채용</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 PromptEdu. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
