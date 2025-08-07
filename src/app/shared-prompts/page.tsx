"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Prompt {
  id: string;
  title: string;
  description: string;
  content: string;
  price: number;
  category: {
    name: string;
    icon: string;
    color: string;
  };
  author: {
    name: string;
  };
  downloads: number;
  rating: number;
  reviewCount: number;
  createdAt: string;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
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
      .then(data => setCategories(data.categories || []))
      .catch(err => console.error("카테고리 로딩 에러:", err));

    // 프롬프트 불러오기
    fetch("/api/shared-prompts")
      .then(res => res.json())
      .then(data => {
        setPrompts(data.prompts || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("프롬프트 로딩 에러:", err);
        setError("프롬프트를 불러오는데 실패했습니다.");
        setLoading(false);
      });
  }, []);

  const filteredPrompts = selectedCategory === "all" 
    ? prompts 
    : prompts.filter(prompt => prompt.category.name === selectedCategory);

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
                onClick={() => setSelectedCategory(category.name)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category.name
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {category.icon} {category.name}
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
                : `${selectedCategory} 카테고리의 프롬프트가 없습니다.`}
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
                  style={{ backgroundColor: prompt.category.color }}
                >
                  {prompt.category.icon} {prompt.category.name}
                </div>

                <div className="p-6">
                  {/* 제목 */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {prompt.title}
                  </h3>

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
                    <span className="font-medium">작성자: {prompt.author.name}</span>
                    <span className="font-medium">{formatDate(prompt.createdAt)}</span>
                  </div>

                  {/* 통계 */}
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-4">
                      <span className="font-medium">다운로드: {prompt.downloads}</span>
                      <span className="font-medium">평점: {prompt.rating.toFixed(1)} ⭐</span>
                      <span className="font-medium">리뷰: {prompt.reviewCount}</span>
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