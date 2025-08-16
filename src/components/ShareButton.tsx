"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShareIcon, CheckIcon } from "@heroicons/react/24/outline";

interface ShareButtonProps {
  title: string;
  description: string;
  url: string;
  className?: string;
}

export default function ShareButton({ title, description, url, className = "" }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const shareData = {
    title: title,
    text: description,
    url: url,
  };

  const handleShare = async () => {
    try {
      // Web Share API 지원 확인
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        // 클립보드 복사 폴백
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setShowToast(true);
        
        setTimeout(() => {
          setCopied(false);
          setShowToast(false);
        }, 2000);
      }
    } catch (error) {
      console.error('Share failed:', error);
      
      // 클립보드 복사 폴백
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setShowToast(true);
        
        setTimeout(() => {
          setCopied(false);
          setShowToast(false);
        }, 2000);
      } catch (clipboardError) {
        console.error('Clipboard copy failed:', clipboardError);
        alert('링크를 복사할 수 없습니다. 수동으로 복사해주세요.');
      }
    }
  };

  return (
    <div className="relative">
      <motion.button
        onClick={handleShare}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${className}`}
      >
        {copied ? (
          <>
            <CheckIcon className="w-4 h-4" />
            <span>복사됨!</span>
          </>
        ) : (
          <>
            <ShareIcon className="w-4 h-4" />
            <span>공유</span>
          </>
        )}
      </motion.button>

      {/* 토스트 메시지 */}
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg whitespace-nowrap z-50"
        >
          링크가 클립보드에 복사되었습니다!
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
        </motion.div>
      )}
    </div>
  );
}
