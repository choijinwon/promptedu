"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowLeftIcon, 
  StarIcon, 
  ArrowDownTrayIcon, 
  EyeIcon, 
  HeartIcon,
  ShareIcon,
  ChatBubbleLeftIcon,
  CalendarIcon,
  UserIcon,
  TagIcon
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid, HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: {
    name: string;
    username: string;
  };
}

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
  views: number;
  rating: number;
  reviewCount: number;
  favoriteCount: number;
  tags: string[];
  createdAt: string;
  image?: string;
  reviews: Review[];
}

export default function PromptDetailPage() {
  const params = useParams();
  const router = useRouter();
  const promptId = params.id as string;
  
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!promptId) return;

    const fetchPrompt = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/prompts/${promptId}`);
        
        if (!response.ok) {
          throw new Error('프롬프트를 찾을 수 없습니다');
        }
        
        const data = await response.json();
        
        // API 응답을 프론트엔드 인터페이스에 맞게 변환
        const transformedPrompt = {
          ...data.prompt,
          category: {
            name: data.prompt.categories?.name || '기타',
            icon: '📝',
            color: 'blue'
          },
          author: {
            name: data.prompt.users?.name || '익명'
          },
          reviewCount: data.prompt.rating_count || 0,
          favoriteCount: 0,
          tags: data.prompt.tags || [],
          createdAt: data.prompt.created_at,
          reviews: []
        };
        
        setPrompt(transformedPrompt);
      } catch (err) {
        setError(err instanceof Error ? err.message : '프롬프트를 불러오는데 실패했습니다');
      } finally {
        setLoading(false);
      }
    };

    fetchPrompt();
  }, [promptId]);

  const formatPrice = (price: number) => {
    return price === 0 ? "무료" : `₩${price.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i}>
        {i < Math.floor(rating) ? (
          <StarIconSolid className="h-5 w-5 text-yellow-400" />
        ) : (
          <StarIcon className="h-5 w-5 text-gray-300" />
        )}
      </span>
    ));
  };

  const handleCopyContent = async () => {
    if (!prompt) return;
    
    try {
      await navigator.clipboard.writeText(prompt.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('클립보드 복사 실패:', err);
    }
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    // TODO: API 호출하여 즐겨찾기 상태 업데이트
  };

  const handleShare = async () => {
    if (!prompt) return;
    
    try {
      await navigator.share({
        title: prompt.title,
        text: prompt.description,
        url: window.location.href,
      });
    } catch (err) {
      // 공유 API가 지원되지 않는 경우 클립보드에 URL 복사
      await navigator.clipboard.writeText(window.location.href);
      alert('링크가 클립보드에 복사되었습니다!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-6"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-blue-600 rounded-full animate-pulse"></div>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">프롬프트를 불러오는 중...</h3>
            <p className="text-gray-600">상세 정보를 준비하고 있습니다</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !prompt) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">프롬프트를 찾을 수 없습니다</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <div className="flex justify-center gap-4">
              <button 
                onClick={() => router.back()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                이전 페이지로
              </button>
              <Link
                href="/shared-prompts"
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                목록으로
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 구조화된 데이터 (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": prompt.title,
    "description": prompt.description,
    "applicationCategory": "AI 프롬프트",
    "operatingSystem": "Web",
    "url": `https://prompt-hub.com/shared-prompts/${prompt.id}`,
    "author": {
      "@type": "Person",
      "name": prompt.author.name,
    },
    "creator": {
      "@type": "Person",
      "name": prompt.author.name,
    },
    "datePublished": prompt.createdAt,
    "dateModified": prompt.createdAt,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": prompt.rating,
      "ratingCount": prompt.reviewCount,
      "bestRating": 5,
      "worstRating": 1,
    },
    "offers": {
      "@type": "Offer",
      "price": prompt.price,
      "priceCurrency": "KRW",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Prompt Hub",
      },
    },
    "category": prompt.category.name,
    "keywords": prompt.tags.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                <ArrowLeftIcon className="w-5 h-5" />
                <span className="font-medium">뒤로가기</span>
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <Link 
                href="/shared-prompts"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                목록으로
              </Link>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={handleShare}
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-100"
                title="공유하기"
              >
                <ShareIcon className="w-5 h-5" />
              </button>
              <button
                onClick={handleFavorite}
                className={`p-2 transition-colors rounded-lg hover:bg-gray-100 ${
                  isFavorite ? 'text-red-600' : 'text-gray-600 hover:text-red-600'
                }`}
                title="즐겨찾기"
              >
                {isFavorite ? <HeartIconSolid className="w-5 h-5" /> : <HeartIcon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
        >
          {/* Category Header */}
          <div 
            className="px-6 py-4 text-white font-medium"
            style={{ backgroundColor: prompt.category.color }}
          >
            <div className="flex items-center space-x-2">
              <span className="text-lg">{prompt.category.icon}</span>
              <span>{prompt.category.name}</span>
            </div>
          </div>

          <div className="p-6">
            {/* Title and Price */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {prompt.title}
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {prompt.description}
                </p>
              </div>
              <div className="text-right ml-6">
                <div className={`text-3xl font-bold ${
                  prompt.price === 0 ? 'text-green-600' : 'text-blue-600'
                }`}>
                  {formatPrice(prompt.price)}
                </div>
                {prompt.price > 0 && (
                  <div className="text-sm text-gray-500 mt-1">유료 프롬프트</div>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <EyeIcon className="w-5 h-5 text-gray-500" />
                </div>
                <div className="text-lg font-semibold text-gray-900">{prompt.views.toLocaleString()}</div>
                <div className="text-sm text-gray-500">조회수</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <ArrowDownTrayIcon className="w-5 h-5 text-gray-500" />
                </div>
                <div className="text-lg font-semibold text-gray-900">{prompt.downloads.toLocaleString()}</div>
                <div className="text-sm text-gray-500">다운로드</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <StarIcon className="w-5 h-5 text-gray-500" />
                </div>
                <div className="text-lg font-semibold text-gray-900">{prompt.rating.toFixed(1)}</div>
                <div className="text-sm text-gray-500">평점</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <ChatBubbleLeftIcon className="w-5 h-5 text-gray-500" />
                </div>
                <div className="text-lg font-semibold text-gray-900">{prompt.reviewCount}</div>
                <div className="text-sm text-gray-500">리뷰</div>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2 mb-6">
              <div className="flex items-center space-x-1">
                {renderStars(prompt.rating)}
              </div>
              <span className="text-gray-600">({prompt.rating.toFixed(1)} / 5.0)</span>
            </div>

            {/* Tags */}
            {prompt.tags && prompt.tags.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-3">
                  <TagIcon className="w-5 h-5 text-gray-500" />
                  <span className="font-medium text-gray-700">태그</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {prompt.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Content */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">프롬프트 내용</h3>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">프롬프트 텍스트</span>
                  <button
                    onClick={handleCopyContent}
                    className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                      copied 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    }`}
                  >
                    {copied ? '복사됨!' : '복사하기'}
                  </button>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed font-mono">
                    {prompt.content}
                  </pre>
                </div>
              </div>
            </div>

            {/* Author and Date */}
            <div className="flex items-center justify-between text-sm text-gray-500 mb-6 p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <UserIcon className="w-4 h-4" />
                  <span>작성자: {prompt.author.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="w-4 h-4" />
                  <span>작성일: {formatDate(prompt.createdAt)}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              {prompt.price > 0 ? (
                <button className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl">
                  💎 구매하기 - {formatPrice(prompt.price)}
                </button>
              ) : (
                <button className="flex-1 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl">
                  🆓 무료 다운로드
                </button>
              )}
              <button
                onClick={handleCopyContent}
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-semibold text-lg"
              >
                📋 프롬프트 복사
              </button>
            </div>
          </div>
        </motion.div>

        {/* Reviews */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">리뷰 ({prompt.reviewCount}개)</h2>
          {prompt.reviews && prompt.reviews.length > 0 ? (
            <div className="space-y-4">
              {prompt.reviews.map((review) => (
                <div key={review.id} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {review.user.name ? review.user.name.charAt(0) : review.user.username.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {review.user.name || review.user.username}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString('ko-KR')}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <span key={i}>
                          {i < review.rating ? (
                            <StarIconSolid className="h-4 w-4 text-yellow-400" />
                          ) : (
                            <StarIcon className="h-4 w-4 text-gray-300" />
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                  {review.comment && (
                    <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200">
              <ChatBubbleLeftIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">아직 리뷰가 없습니다</h3>
              <p className="text-gray-600">이 프롬프트에 대한 첫 번째 리뷰를 작성해보세요!</p>
            </div>
          )}
        </div>

        {/* Related Prompts */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">관련 프롬프트</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* TODO: 관련 프롬프트 표시 */}
            <div className="text-center py-8 text-gray-500">
              <p>관련 프롬프트 기능은 준비 중입니다</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
} 