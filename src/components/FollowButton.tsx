"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { UserPlusIcon, UserMinusIcon } from "@heroicons/react/24/outline";

interface FollowButtonProps {
  userId: string;
  username: string;
  isLoggedIn: boolean;
  className?: string;
}

export default function FollowButton({ userId, username, isLoggedIn, className = "" }: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // 팔로우 상태 확인
  const checkFollowStatus = async () => {
    if (!isLoggedIn) return;

    try {
      const token = localStorage.getItem("prompt_hub_token");
      const response = await fetch(`/api/follow?followingId=${userId}&type=status`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setIsFollowing(data.isFollowing);
      }
    } catch (error) {
      console.error('Failed to check follow status:', error);
    }
  };

  // 팔로우/언팔로우 토글
  const handleFollowToggle = async () => {
    if (!isLoggedIn) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("prompt_hub_token");

      if (isFollowing) {
        // 언팔로우
        const response = await fetch(`/api/follow?followingId=${userId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (response.ok) {
          setIsFollowing(false);
          setToastMessage(`@${username}님을 언팔로우했습니다.`);
          setShowToast(true);
        } else {
          const data = await response.json();
          alert(data.error || '언팔로우에 실패했습니다.');
        }
      } else {
        // 팔로우
        const response = await fetch('/api/follow', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ followingId: userId }),
        });

        if (response.ok) {
          setIsFollowing(true);
          setToastMessage(`@${username}님을 팔로우했습니다!`);
          setShowToast(true);
        } else {
          const data = await response.json();
          alert(data.error || '팔로우에 실패했습니다.');
        }
      }
    } catch (error) {
      console.error('Follow toggle error:', error);
      alert('팔로우 처리 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkFollowStatus();
  }, [userId, isLoggedIn]);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  if (!isLoggedIn) {
    return (
      <button
        onClick={() => alert('로그인이 필요합니다.')}
        className={`flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors ${className}`}
      >
        <UserPlusIcon className="w-4 h-4" />
        <span>팔로우</span>
      </button>
    );
  }

  return (
    <div className="relative">
      <motion.button
        onClick={handleFollowToggle}
        disabled={loading}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
          isFollowing
            ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        } disabled:opacity-50 ${className}`}
      >
        {loading ? (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
        ) : isFollowing ? (
          <>
            <UserMinusIcon className="w-4 h-4" />
            <span>언팔로우</span>
          </>
        ) : (
          <>
            <UserPlusIcon className="w-4 h-4" />
            <span>팔로우</span>
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
          {toastMessage}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
        </motion.div>
      )}
    </div>
  );
}
