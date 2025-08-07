"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { MagnifyingGlassIcon, FunnelIcon, StarIcon, ArrowDownTrayIcon, EyeIcon, FireIcon, SparklesIcon, HeartIcon, ClockIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid, HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import Link from "next/link";
import PromptPreview from "./PromptPreview";
import Toast from "./Toast";
import CommentSection from "./CommentSection";
import FollowButton from "./FollowButton";

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
  const [purchasing, setPurchasing] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "purchases" | "favorites">("all");
  const [purchases, setPurchases] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showSearchHistory, setShowSearchHistory] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
    isVisible: boolean;
  }>({
    message: "",
    type: "info",
    isVisible: false,
  });
  const [favoriteAnimations, setFavoriteAnimations] = useState<{ [key: string]: boolean }>({});
  const [previewActiveTab, setPreviewActiveTab] = useState<'preview' | 'comments'>('preview');

  // 로그인 상태 확인
  useEffect(() => {
    const token = localStorage.getItem("prompt_hub_token");
    setIsLoggedIn(!!token);
  }, []);

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

  // 구매 내역 가져오기
  const fetchPurchases = async () => {
    const token = localStorage.getItem("prompt_hub_token");
    if (!token) return;

    try {
      const response = await fetch('/api/user/purchases', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPurchases(data.purchases || []);
      }
    } catch (error) {
      console.error('Failed to fetch purchases:', error);
    }
  };

  // 즐겨찾기 가져오기
  const fetchFavorites = async () => {
    const token = localStorage.getItem("prompt_hub_token");
    if (!token) return;

    try {
      const response = await fetch('/api/favorites', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setFavorites(data.favorites || []);
      } else {
        console.error('Failed to fetch favorites:', data.error);
        showToast(data.error || "즐겨찾기를 불러오는데 실패했습니다.", "error");
      }
    } catch (error) {
      console.error('Failed to fetch favorites:', error);
      showToast("즐겨찾기를 불러오는데 실패했습니다.", "error");
    }
  };

  // 검색 히스토리 가져오기
  const fetchSearchHistory = async () => {
    const token = localStorage.getItem("prompt_hub_token");
    if (!token) return;

    try {
      const response = await fetch('/api/search-history', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSearchHistory(data.searchHistory?.map((item: any) => item.query) || []);
      }
    } catch (error) {
      console.error('Failed to fetch search history:', error);
    }
  };

  // 검색 히스토리 저장
  const saveSearchHistory = async (query: string) => {
    const token = localStorage.getItem("prompt_hub_token");
    if (!token || !query.trim()) return;

    try {
      await fetch('/api/search-history', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });
    } catch (error) {
      console.error('Failed to save search history:', error);
    }
  };

  useEffect(() => {
    if (activeTab === "purchases") {
      fetchPurchases();
    } else if (activeTab === "favorites") {
      fetchFavorites();
    }
  }, [activeTab]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchSearchHistory();
    }
  }, [isLoggedIn]);

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

  const handlePurchase = async (promptId: string) => {
    const token = localStorage.getItem("prompt_hub_token");
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    setPurchasing(promptId);
    try {
      const response = await fetch(`/api/prompts/${promptId}/purchase`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '구매 처리 중 오류가 발생했습니다.');
      }

      // 구매 성공 시 프롬프트 목록 새로고침
      const promptsResponse = await fetch('/api/prompts?status=ACTIVE');
      if (promptsResponse.ok) {
        const promptsData = await promptsResponse.json();
        setPrompts(promptsData.prompts || []);
      }

      alert(data.message);
    } catch (error) {
      console.error('Purchase error:', error);
      alert(error instanceof Error ? error.message : '구매 처리 중 오류가 발생했습니다.');
    } finally {
      setPurchasing(null);
    }
  };

  const handleToggleFavorite = async (promptId: string) => {
    const token = localStorage.getItem("prompt_hub_token");
    if (!token) {
      showToast("로그인이 필요합니다.", "error");
      return;
    }

    const isFavorite = favorites.some(fav => fav.promptId === promptId);

    // 애니메이션 시작
    setFavoriteAnimations(prev => ({ ...prev, [promptId]: true }));

    try {
      if (isFavorite) {
        // 즐겨찾기 제거
        const response = await fetch(`/api/favorites?promptId=${promptId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setFavorites(favorites.filter(fav => fav.promptId !== promptId));
          showToast("💔 즐겨찾기에서 삭제되었습니다.", "success");
        } else {
          showToast(data.error || "즐겨찾기 삭제에 실패했습니다.", "error");
        }
      } else {
        // 즐겨찾기 추가
        const response = await fetch('/api/favorites', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ promptId }),
        });

        const data = await response.json();

        if (response.ok) {
          setFavorites([...favorites, data.favorite]);
          showToast("💖 즐겨찾기에 추가되었습니다!", "success");
        } else {
          showToast(data.error || "즐겨찾기 추가에 실패했습니다.", "error");
        }
      }
    } catch (error) {
      console.error('Favorite toggle error:', error);
      showToast("즐겨찾기 처리 중 오류가 발생했습니다.", "error");
    } finally {
      // 애니메이션 종료
      setTimeout(() => {
        setFavoriteAnimations(prev => ({ ...prev, [promptId]: false }));
      }, 500);
    }
  };

  const handleSearch = (query: string) => {
    setSearchTerm(query);
    if (isLoggedIn && query.trim()) {
      saveSearchHistory(query);
    }
  };

  const handlePreview = (prompt: Prompt) => {
    setSelectedPrompt(prompt);
    setShowPreview(true);
  };

  const showToast = (message: string, type: "success" | "error" | "info") => {
    setToast({
      message,
      type,
      isVisible: true,
    });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
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
        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-1">
            <div className="flex">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === "all"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                전체 프롬프트
              </button>
              {isLoggedIn && (
                <button
                  onClick={() => setActiveTab("purchases")}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === "purchases"
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  내 구매내역
                </button>
              )}
              {isLoggedIn && (
                <button
                  onClick={() => setActiveTab("favorites")}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === "favorites"
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  즐겨찾기
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Search and Filters */}
        {activeTab === "all" && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-6 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="lg:col-span-2">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="프롬프트 제목, 설명, 태그로 검색..."
                      value={searchTerm}
                      onChange={(e) => handleSearch(e.target.value)}
                      onFocus={() => setShowSearchHistory(true)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                    />
                    {showSearchHistory && isLoggedIn && searchHistory.length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                        {searchHistory.slice(0, 5).map((query, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              handleSearch(query);
                              setShowSearchHistory(false);
                            }}
                            className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                          >
                            <ClockIcon className="w-4 h-4 text-gray-400" />
                            {query}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                >
                  <option value="전체">가격 전체</option>
                  <option value="무료">무료만</option>
                  <option value="유료">유료만</option>
                </select>
              </div>

              {/* Sort */}
              <div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                >
                  <option value="최신순">최신순</option>
                  <option value="인기순">인기순</option>
                  <option value="평점순">평점순</option>
                  <option value="가격낮은순">가격낮은순</option>
                  <option value="가격높은순">가격높은순</option>
                  <option value="제목순">제목순</option>
                </select>
              </div>
            </div>

            {/* Category Filters */}
            <div className="mt-6">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      selectedCategory === category.name
                        ? "bg-blue-600 text-white shadow-lg"
                        : "bg-white/50 text-gray-700 hover:bg-gray-50 backdrop-blur-sm border border-gray-200"
                    }`}
                  >
                    {category.icon} {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="mt-6 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "grid"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "list"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
              </div>
              <div className="text-sm text-gray-500">
                {sortedPrompts.length}개의 프롬프트
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">프롬프트를 불러오는 중...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-16">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          </div>
        )}

        {/* Prompts Grid/List */}
        {!loading && !error && activeTab === "all" && sortedPrompts.length > 0 && (
          <div className={`grid gap-6 ${
            viewMode === "grid" 
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
              : "grid-cols-1"
          }`}>
            {sortedPrompts.map((prompt, index) => (
              <motion.div
                key={prompt.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 ${
                  viewMode === "list" ? "p-6" : ""
                }`}
              >
                {viewMode === "grid" ? (
                  // Grid View
                  <div className="p-6">
                    {/* Category Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-sm font-medium rounded-full">
                        {prompt.category.icon} {prompt.category.name}
                      </span>
                      <span className={`text-lg font-bold ${
                        prompt.price === 0 ? 'text-green-600' : 'text-blue-600'
                      }`}>
                        {formatPrice(prompt.price)}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer">
                      {prompt.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">{prompt.description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {prompt.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md hover:bg-gray-200 transition-colors"
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
                      <div className="flex gap-2 flex-1">
                        {prompt.price > 0 ? (
                          <button 
                            onClick={() => handlePurchase(prompt.id)}
                            disabled={purchasing === prompt.id}
                            className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-sm font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {purchasing === prompt.id ? "처리 중..." : "💎 구매하기"}
                          </button>
                        ) : (
                          <button 
                            onClick={() => handlePurchase(prompt.id)}
                            disabled={purchasing === prompt.id}
                            className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 text-sm font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {purchasing === prompt.id ? "다운로드 중..." : "🆓 무료 다운로드"}
                          </button>
                        )}
                        <button
                          onClick={() => handlePreview(prompt)}
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 text-sm font-medium"
                        >
                          미리보기
                        </button>
                      </div>
                      <div className="flex gap-1">
                        {isLoggedIn && (
                          <motion.button
                            onClick={() => handleToggleFavorite(prompt.id)}
                            className="p-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            animate={favoriteAnimations[prompt.id] ? {
                              scale: [1, 1.3, 1],
                              rotate: [0, 10, -10, 0],
                            } : {}}
                            transition={{ duration: 0.3 }}
                          >
                            {favorites.some(fav => fav.promptId === prompt.id) ? (
                              <HeartIconSolid className="w-4 h-4 text-red-500" />
                            ) : (
                              <HeartIcon className="w-4 h-4 text-gray-400" />
                            )}
                          </motion.button>
                        )}
                        <Link
                          href={`/shared-prompts/${prompt.id}`}
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 text-sm font-medium whitespace-nowrap"
                        >
                          상세보기
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  // List View
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
                        <button 
                          onClick={() => handlePurchase(prompt.id)}
                          disabled={purchasing === prompt.id}
                          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {purchasing === prompt.id ? "처리 중..." : "💎 구매하기"}
                        </button>
                      ) : (
                        <button 
                          onClick={() => handlePurchase(prompt.id)}
                          disabled={purchasing === prompt.id}
                          className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {purchasing === prompt.id ? "다운로드 중..." : "🆓 무료 다운로드"}
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

        {/* Favorites Tab Content */}
        {activeTab === "favorites" && (
          <div className="space-y-6">
            {!isLoggedIn ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gradient-to-r from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <HeartIcon className="w-12 h-12 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">로그인이 필요합니다</h3>
                <p className="text-gray-600 mb-6">즐겨찾기를 확인하려면 로그인해주세요</p>
                <div className="flex justify-center gap-4">
                  <Link 
                    href="/login"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    로그인하기
                  </Link>
                  <button 
                    onClick={() => setActiveTab("all")}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    프롬프트 둘러보기
                  </button>
                </div>
              </div>
            ) : favorites.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gradient-to-r from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <HeartIcon className="w-12 h-12 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">즐겨찾기한 프롬프트가 없습니다</h3>
                <p className="text-gray-600 mb-6">마켓플레이스에서 관심 있는 프롬프트를 즐겨찾기에 추가해보세요</p>
                <button 
                  onClick={() => setActiveTab("all")}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  프롬프트 둘러보기
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map((favorite) => (
                  <motion.div
                    key={favorite.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 bg-gradient-to-r from-red-100 to-pink-100 text-red-800 text-sm font-medium rounded-full">
                          {favorite.prompt.category.icon} {favorite.prompt.category.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          추가일: {formatDate(favorite.createdAt)}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {favorite.prompt.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {favorite.prompt.description}
                      </p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-gray-500">
                          작성자: {favorite.prompt.author.name}
                        </span>
                        <span className="text-lg font-bold text-green-600">
                          {favorite.prompt.price === 0 ? "무료" : `₩${favorite.prompt.price.toLocaleString()}`}
                        </span>
                      </div>
                      
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handlePreview(favorite.prompt)}
                          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium"
                        >
                          미리보기
                        </button>
                        <motion.button 
                          onClick={() => handleToggleFavorite(favorite.prompt.id)}
                          className="px-4 py-2 border border-red-300 text-red-700 rounded-xl hover:bg-red-50 transition-colors text-sm font-medium"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          animate={favoriteAnimations[favorite.prompt.id] ? {
                            scale: [1, 1.2, 1],
                            rotate: [0, 5, -5, 0],
                          } : {}}
                          transition={{ duration: 0.3 }}
                        >
                          💔 삭제
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Purchases Tab Content */}
        {activeTab === "purchases" && (
          <div className="space-y-6">
            {!isLoggedIn ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">로그인이 필요합니다</h3>
                <p className="text-gray-600 mb-6">구매내역을 확인하려면 로그인해주세요</p>
                <div className="flex justify-center gap-4">
                  <Link 
                    href="/login"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    로그인하기
                  </Link>
                  <button 
                    onClick={() => setActiveTab("all")}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    프롬프트 둘러보기
                  </button>
                </div>
              </div>
            ) : purchases.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">구매한 프롬프트가 없습니다</h3>
                <p className="text-gray-600 mb-6">마켓플레이스에서 프롬프트를 구매해보세요</p>
                <button 
                  onClick={() => setActiveTab("all")}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  프롬프트 둘러보기
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {purchases.map((purchase) => (
                  <motion.div
                    key={purchase.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 text-sm font-medium rounded-full">
                          {purchase.prompt.category.icon} {purchase.prompt.category.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          구매일: {formatDate(purchase.createdAt)}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {purchase.prompt.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {purchase.prompt.description}
                      </p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-gray-500">
                          작성자: {purchase.prompt.author.name}
                        </span>
                        <span className="text-lg font-bold text-green-600">
                          {purchase.amount === 0 ? "무료" : `₩${purchase.amount.toLocaleString()}`}
                        </span>
                      </div>
                      
                      <div className="flex gap-2">
                        <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium">
                          프롬프트 보기
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium">
                          복사하기
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Enhanced Empty State */}
        {activeTab === "all" && !loading && !error && sortedPrompts.length === 0 && (
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

      {/* Prompt Preview Modal */}
      {selectedPrompt && (
        <PromptPreview
          prompt={selectedPrompt}
          isOpen={showPreview}
          onClose={() => {
            setShowPreview(false);
            setSelectedPrompt(null);
          }}
          onPurchase={handlePurchase}
          isFavorite={favorites.some(fav => fav.promptId === selectedPrompt.id)}
          onToggleFavorite={handleToggleFavorite}
          isLoggedIn={isLoggedIn}
        />
      )}

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </div>
  );
} 