"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Prompt {
  id: string;
  title: string;
  description: string;
  content: string;
  price: number;
  type: string;
  is_public: boolean;
  status: string;
  views: number;
  downloads: number;
  rating: number;
  rating_count: number;
  created_at: string;
  categories?: {
    id: string;
    name: string;
    slug: string;
  };
  users?: {
    id: string;
    username: string;
    name: string;
  };
}

interface Category {
  id: string;
  name: string;
  description: string;
  slug: string;
}

export default function SharedPromptsPage() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // 카테고리 불러오기
    fetch("/api/categories")
      .then(res => res.json())
      .then(data => {
        console.log('📋 Categories loaded:', data);
        setCategories(data.categories || []);
      })
      .catch(err => {
        console.error("❌ 카테고리 로딩 에러:", err);
      });

    // 프롬프트 불러오기
    fetch("/api/shared-prompts")
      .then(res => res.json())
      .then(data => {
        console.log('📝 Shared prompts loaded:', data);
        setPrompts(data.prompts || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("❌ 프롬프트 로딩 에러:", err);
        setError("프롬프트를 불러오는데 실패했습니다.");
        setLoading(false);
      });
  }, []);

  const getCategoryColor = (slug: string) => {
    const colorMap: { [key: string]: string } = {
      'productivity': '#10B981', // green
      'creative': '#3B82F6',     // blue
      'education': '#8B5CF6',    // purple
      'business': '#F59E0B',     // amber
      'development': '#EF4444',  // red
      'lifestyle': '#06B6D4',    // cyan
      'entertainment': '#EC4899', // pink
      'health': '#84CC16'        // lime
    };
    return colorMap[slug] || '#6B7280'; // default gray
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">승인됨</span>;
      case 'PENDING':
        return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">대기중</span>;
      case 'REJECTED':
        return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">거부됨</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">{status}</span>;
    }
  };

  // 현재는 카테고리 정보가 없으므로 모든 프롬프트 표시
  const filteredPrompts = prompts;

  const formatPrice = (price: number) => {
    return price === 0 ? "무료" : `₩${price.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">프롬프트를 불러오는 중...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 뒤로가기 버튼 */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            메인 페이지로 돌아가기
          </Link>
        </div>

        {/* 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            공유 프롬프트
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            회원들이 무료로 공개한 고품질 프롬프트를 확인해보세요
          </p>
          
          {/* 카테고리 필터 */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              전체
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.slug)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category.slug
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="text-center mb-8">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          </div>
        )}

        {/* 프롬프트 목록 */}
        {filteredPrompts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">
              {selectedCategory === "all" 
                ? "등록된 프롬프트가 없습니다." 
                : `${categories.find(cat => cat.slug === selectedCategory)?.name} 카테고리의 프롬프트가 없습니다.`}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrompts.map((prompt) => (
              <div
                key={prompt.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                {/* 카테고리 배지 */}
                <div 
                  className="px-4 py-2 text-white text-sm font-medium"
                  style={{ backgroundColor: getCategoryColor('general') }}
                >
                  일반
                </div>

                <div className="p-6">
                  {/* 제목과 상태 */}
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-2 flex-1 mr-2">
                      {prompt.title}
                    </h3>
                    {getStatusBadge(prompt.status)}
                  </div>

                  {/* 설명 */}
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {prompt.description}
                  </p>

                  {/* 프롬프트 미리보기 */}
                  <div className="bg-gray-50 p-3 rounded-lg mb-4">
                    <p className="text-sm text-gray-700 line-clamp-3">
                      {prompt.content}
                    </p>
                  </div>

                  {/* 메타 정보 */}
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <span className="font-medium">작성자: 테스트 사용자</span>
                    <span className="font-medium">{formatDate(prompt.created_at)}</span>
                  </div>

                  {/* 통계 */}
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-4">
                      <span className="font-medium">다운로드: {prompt.downloads}</span>
                      <span className="font-medium">평점: {prompt.rating.toFixed(1)} ⭐</span>
                      <span className="font-medium">리뷰: {prompt.rating_count}</span>
                    </div>
                  </div>

                  {/* 액션 */}
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-green-600">
                      무료
                    </span>
                    <div className="flex space-x-2">
                      <Link
                        href={`/shared-prompts/${prompt.id}`}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        상세보기
                      </Link>
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                        다운로드
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 하단 CTA */}
        <div className="text-center mt-12">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              나만의 프롬프트를 무료로 공유해보세요
            </h2>
            <p className="text-gray-600 mb-6">
              고품질 프롬프트를 작성하고 다른 사용자들과 무료로 공유하세요
            </p>
            <Link
              href="/write"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              프롬프트 등록하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 