"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { MagnifyingGlassIcon, FunnelIcon, StarIcon, ArrowDownTrayIcon, EyeIcon, FireIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import Link from "next/link";

interface Prompt {
  id: string;
  title: string;
  description: string;
  content: string;
  author: {
    name: string;
  };
  price: number;
  rating: number;
  downloads: number;
  views: number;
  category: {
    name: string;
    icon?: string;
    color?: string;
  };
  tags: string[];
  createdAt: string;
  image?: string;
}

const categories = [
  { id: "전체", name: "전체", icon: "🏠" },
  { id: "프롬프트 개발", name: "프롬프트 개발", icon: "🧠" },
  { id: "창작", name: "창작", icon: "🎨" },
  { id: "생산성", name: "생산성", icon: "⚡" },
  { id: "비즈니스", name: "비즈니스", icon: "💼" },
  { id: "개발", name: "개발", icon: "💻" },
  { id: "마케팅", name: "마케팅", icon: "📢" },
  { id: "콘텐츠", name: "콘텐츠", icon: "📝" },
];

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [sortBy, setSortBy] = useState("최신순");
  const [priceFilter, setPriceFilter] = useState("전체");
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // API에서 승인된 프롬프트 가져오기
  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/prompts?status=ACTIVE');
        if (!response.ok) {
          throw new Error('프롬프트를 불러오는데 실패했습니다');
        }
        const data = await response.json();
        setPrompts(data.prompts || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다');
      } finally {
        setLoading(false);
      }
    };

    fetchPrompts();
  }, []);

  const filteredPrompts = useMemo(() => {
    return prompts.filter((prompt: Prompt) => {
      const matchesSearch = prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           prompt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           prompt.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === "전체" || prompt.category.name === selectedCategory;
      const matchesPrice = priceFilter === "전체" || 
                          (priceFilter === "무료" && prompt.price === 0) ||
                          (priceFilter === "유료" && prompt.price > 0);
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [prompts, searchTerm, selectedCategory, priceFilter]);

  const sortedPrompts = useMemo(() => {
    return [...filteredPrompts].sort((a, b) => {
      switch (sortBy) {
        case "최신순":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "인기순":
          return b.downloads - a.downloads;
        case "평점순":
          return b.rating - a.rating;
        case "가격낮은순":
          return a.price - b.price;
        case "가격높은순":
          return b.price - a.price;
        case "제목순":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
  }, [filteredPrompts, sortBy]);

  const formatPrice = (price: number) => {
    return price === 0 ? "무료" : `₩${price.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR');
  };

  const renderStars = useMemo(() => {
    return (rating: number) => {
      return Array.from({ length: 5 }, (_, i) => (
        <span key={i}>
          {i < Math.floor(rating) ? (
            <StarIconSolid className="h-4 w-4 text-yellow-400" />
          ) : (
            <StarIcon className="h-4 w-4 text-gray-300" />
          )}
        </span>
      ));
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Enhanced Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link 
                href="/" 
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="font-medium">메인으로</span>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white text-lg">🛒</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    프롬프트 마켓플레이스
                  </h1>
                  <p className="text-sm text-gray-500">최고의 AI 프롬프트를 발견하세요</p>
                </div>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="hidden md:flex items-center space-x-6 text-sm">
              <div className="text-center">
                <div className="font-bold text-blue-600">{prompts.length}</div>
                <div className="text-gray-500">총 프롬프트</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-green-600">
                  {prompts.filter(p => p.price === 0).length}
                </div>
                <div className="text-gray-500">무료</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-purple-600">
                  {prompts.filter(p => p.price > 0).length}
                </div>
                <div className="text-gray-500">유료</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Search and Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="프롬프트 제목, 설명, 태그로 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                />
              </div>
            </div>

            {/* Price Filter */}
            <div className="relative">
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 bg-white/50 backdrop-blur-sm appearance-none"
              >
                <option value="전체">💰 전체 가격</option>
                <option value="무료">🆓 무료만</option>
                <option value="유료">💎 유료만</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 bg-white/50 backdrop-blur-sm appearance-none"
              >
                <option value="최신순">🕒 최신순</option>
                <option value="인기순">🔥 인기순</option>
                <option value="평점순">⭐ 평점순</option>
                <option value="가격낮은순">📈 가격낮은순</option>
                <option value="가격높은순">📉 가격높은순</option>
                <option value="제목순">📝 제목순</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">보기 모드:</span>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    viewMode === "grid" 
                      ? "bg-white text-blue-600 shadow-sm" 
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    viewMode === "list" 
                      ? "bg-white text-blue-600 shadow-sm" 
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Results Count */}
            {!loading && !error && (
              <div className="text-sm text-gray-600">
                <span className="font-semibold text-blue-600">{sortedPrompts.length}</span>개의 결과
                {priceFilter !== "전체" && (
                  <span className="ml-2 text-gray-500">
                    ({priceFilter === "무료" ? "무료" : "유료"} 프롬프트만)
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                    : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:shadow-md border border-gray-200"
                }`}
              >
                <span>{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced Loading State */}
        {loading && (
          <div className="text-center py-16">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-6"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <SparklesIcon className="w-8 h-8 text-blue-600 animate-pulse" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">프롬프트를 불러오는 중...</h3>
            <p className="text-gray-600">최고의 AI 프롬프트를 준비하고 있습니다</p>
          </div>
        )}

        {/* Enhanced Error State */}
        {error && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">오류가 발생했습니다</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              다시 시도
            </button>
          </div>
        )}

        {/* Enhanced Prompts Grid/List */}
        {!loading && !error && (
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"}>
            {sortedPrompts.map((prompt, index) => (
              <motion.div
                key={`${prompt.id}-${viewMode}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 ${
                  viewMode === "grid" ? "p-6 h-full flex flex-col" : "p-6"
                }`}
              >
                {viewMode === "grid" ? (
                  // Enhanced Grid View
                  <div className="flex flex-col h-full space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors break-words">
                          {prompt.title}
                        </h3>
                        <div className="flex items-center gap-2 mb-3 flex-wrap">
                          <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-xs font-medium rounded-full whitespace-nowrap">
                            {prompt.category.icon} {prompt.category.name}
                          </span>
                          <div className="flex items-center gap-1">
                            {renderStars(prompt.rating)}
                            <span className="text-xs text-gray-500 ml-1">({prompt.rating.toFixed(1)})</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right ml-3 flex-shrink-0">
                        <div className={`text-xl font-bold ${
                          prompt.price === 0 ? 'text-green-600' : 'text-blue-600'
                        }`}>
                          {formatPrice(prompt.price)}
                        </div>
                        {prompt.price > 0 && (
                          <div className="text-xs text-gray-500">유료</div>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <div className="flex-1">
                      <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed break-words">
                        {prompt.description}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {prompt.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md hover:bg-gray-200 transition-colors whitespace-nowrap"
                        >
                          #{tag}
                        </span>
                      ))}
                      {prompt.tags.length > 3 && (
                        <span className="text-xs text-gray-500 flex items-center">
                          +{prompt.tags.length - 3}개 더
                        </span>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
                      <div className="flex items-center gap-4 flex-wrap">
                        <span className="flex items-center gap-1">
                          <ArrowDownTrayIcon className="h-3 w-3 flex-shrink-0" />
                          {prompt.downloads.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <EyeIcon className="h-3 w-3 flex-shrink-0" />
                          {prompt.views.toLocaleString()}
                        </span>
                      </div>
                      <span className="text-xs">{formatDate(prompt.createdAt)}</span>
                    </div>

                    {/* Author */}
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs">👤</span>
                      </div>
                      <span className="truncate">{prompt.author.name}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-3 mt-auto">
                      {prompt.price > 0 ? (
                        <button className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-sm font-medium shadow-lg hover:shadow-xl">
                          💎 구매하기
                        </button>
                      ) : (
                        <button className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 text-sm font-medium shadow-lg hover:shadow-xl">
                          🆓 무료 다운로드
                        </button>
                      )}
                      <Link
                        href={`/shared-prompts/${prompt.id}`}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 text-sm font-medium whitespace-nowrap"
                      >
                        상세보기
                      </Link>
                    </div>
                  </div>
                ) : (
                  // Enhanced List View
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    {/* Left side - Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer line-clamp-1 break-words flex-1 mr-4">
                          {prompt.title}
                        </h3>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-sm font-medium rounded-full whitespace-nowrap">
                            {prompt.category.icon} {prompt.category.name}
                          </span>
                          <span className={`text-lg font-bold ${
                            prompt.price === 0 ? 'text-green-600' : 'text-blue-600'
                          }`}>
                            {formatPrice(prompt.price)}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-3 line-clamp-2 leading-relaxed break-words">{prompt.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {prompt.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md hover:bg-gray-200 transition-colors whitespace-nowrap"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-6 text-sm text-gray-500 flex-wrap">
                        <span className="flex items-center gap-1">
                          <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs">👤</span>
                          </div>
                          <span className="truncate">{prompt.author.name}</span>
                        </span>
                        <span className="whitespace-nowrap">📅 {formatDate(prompt.createdAt)}</span>
                        <div className="flex items-center gap-1">
                          {renderStars(prompt.rating)}
                          <span>({prompt.rating.toFixed(1)})</span>
                        </div>
                        <span className="flex items-center gap-1">
                          <ArrowDownTrayIcon className="h-4 w-4 flex-shrink-0" />
                          {prompt.downloads.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <EyeIcon className="h-4 w-4 flex-shrink-0" />
                          {prompt.views.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    
                    {/* Right side - Actions */}
                    <div className="flex flex-col gap-2 lg:items-end flex-shrink-0">
                      {prompt.price > 0 ? (
                        <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl whitespace-nowrap">
                          💎 구매하기
                        </button>
                      ) : (
                        <button className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl whitespace-nowrap">
                          🆓 무료 다운로드
                        </button>
                      )}
                      <Link
                        href={`/shared-prompts/${prompt.id}`}
                        className="px-8 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium whitespace-nowrap"
                      >
                        상세보기
                      </Link>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Enhanced Empty State */}
        {!loading && !error && sortedPrompts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <MagnifyingGlassIcon className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">검색 결과가 없습니다</h3>
            <p className="text-gray-600 mb-6">다른 검색어나 카테고리를 시도해보세요</p>
            <div className="flex justify-center gap-4">
              <button 
                onClick={() => setSearchTerm("")}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                검색어 초기화
              </button>
              <button 
                onClick={() => setSelectedCategory("전체")}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                카테고리 초기화
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 