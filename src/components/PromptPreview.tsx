"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon, HeartIcon, ChatBubbleLeftIcon, ShareIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import CommentSection from "./CommentSection";
import ShareButton from "./ShareButton";
import FollowButton from "./FollowButton";

interface PromptPreviewProps {
  prompt: {
    id: string;
    title: string;
    description: string;
    content: string;
    price: number;
    author: {
      name: string;
    };
    category: {
      name: string;
      icon?: string;
    };
    rating: number;
    downloads: number;
    views: number;
    tags: string[];
    createdAt: string;
    user?: {
      id: string;
      name: string;
      username: string;
    };
  };
  isOpen: boolean;
  onClose: () => void;
  onPurchase?: (promptId: string) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (promptId: string) => void;
  isLoggedIn?: boolean;
}

export default function PromptPreview({
  prompt,
  isOpen,
  onClose,
  onPurchase,
  isFavorite = false,
  onToggleFavorite,
  isLoggedIn = false,
}: PromptPreviewProps) {
  const [showFullContent, setShowFullContent] = useState(false);
  const [purchasing, setPurchasing] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'comments'>('preview');

  const handlePurchase = async () => {
    if (!onPurchase) return;
    setPurchasing(true);
    try {
      await onPurchase(prompt.id);
    } finally {
      setPurchasing(false);
    }
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/shared-prompts/${prompt.id}`;
    const shareData = {
      title: prompt.title,
      text: prompt.description,
      url: shareUrl,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      navigator.share(shareData);
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareUrl);
      alert("링크가 클립보드에 복사되었습니다.");
    }
  };

  const formatPrice = (price: number) => {
    return price === 0 ? "무료" : `₩${price.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR");
  };

  const previewContent = showFullContent 
    ? prompt.content 
    : prompt.content.slice(0, 300) + (prompt.content.length > 300 ? "..." : "");

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-sm font-medium rounded-full">
                    🏷️ 일반
                  </span>
                  <span className="text-sm text-gray-500">
                    {formatDate(prompt.createdAt)}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <XMarkIcon className="w-6 h-6 text-gray-500" />
                </button>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {prompt.title}
              </h2>
              
              <p className="text-gray-600 mb-4">
                {prompt.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>작성자: 테스트 사용자</span>
                  <span>조회수: {prompt.views}</span>
                  <span>다운로드: {prompt.downloads}</span>
                  <span>평점: ⭐ {prompt.rating.toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-2">
                  {onToggleFavorite && (
                    <button
                      onClick={() => onToggleFavorite(prompt.id)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {isFavorite ? (
                        <HeartIconSolid className="w-5 h-5 text-red-500" />
                      ) : (
                        <HeartIcon className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                  )}
                  <ShareButton
                    title={prompt.title}
                    description={prompt.description}
                    url={`${window.location.origin}/shared-prompts/${prompt.id}`}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  />
                  {prompt.user && (
                    <FollowButton
                      userId={prompt.user.id}
                      username={prompt.user.username}
                      isLoggedIn={isLoggedIn}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[50vh]">
              {/* 탭 네비게이션 */}
              <div className="flex border-b border-gray-200 mb-4">
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`px-4 py-2 font-medium transition-colors ${
                    activeTab === 'preview'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  미리보기
                </button>
                <button
                  onClick={() => setActiveTab('comments')}
                  className={`px-4 py-2 font-medium transition-colors ${
                    activeTab === 'comments'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  댓글
                </button>
              </div>

              {activeTab === 'preview' ? (
                <>
                  <div className="bg-gray-50 rounded-xl p-4 font-mono text-sm">
                    <pre className="whitespace-pre-wrap">{previewContent}</pre>
                  </div>
                  
                  {prompt.content.length > 300 && (
                    <button
                      onClick={() => setShowFullContent(!showFullContent)}
                      className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      {showFullContent ? "접기" : "더 보기"}
                    </button>
                  )}
                </>
              ) : (
                <CommentSection promptId={prompt.id} isLoggedIn={isLoggedIn} />
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-green-600">
                  {formatPrice(prompt.price)}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={onClose}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    닫기
                  </button>
                  <button
                    disabled={true}
                    className="px-6 py-2 bg-gray-400 text-white rounded-lg transition-colors disabled:opacity-50"
                  >
                    {prompt.price === 0 ? "다운로드 기능 준비 중" : "구매 기능 준비 중"}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
