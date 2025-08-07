"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartIcon, ChatBubbleLeftIcon, ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    username: string;
    avatar?: string;
  };
  replies: Comment[];
}

interface CommentSectionProps {
  promptId: string;
  isLoggedIn: boolean;
}

export default function CommentSection({ promptId, isLoggedIn }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // 댓글 가져오기
  const fetchComments = async (pageNum: number = 1) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/comments?promptId=${promptId}&page=${pageNum}`);
      const data = await response.json();

      if (response.ok) {
        if (pageNum === 1) {
          setComments(data.comments || []);
        } else {
          setComments(prev => [...prev, ...(data.comments || [])]);
        }
        setHasMore(data.page < data.totalPages);
      }
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    } finally {
      setLoading(false);
    }
  };

  // 댓글 작성
  const handleSubmitComment = async () => {
    if (!newComment.trim() || !isLoggedIn) return;

    try {
      setSubmitting(true);
      const token = localStorage.getItem("prompt_hub_token");
      
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          promptId,
          content: newComment.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setComments(prev => [data.comment, ...prev]);
        setNewComment("");
      } else {
        alert(data.error || '댓글 작성에 실패했습니다.');
      }
    } catch (error) {
      console.error('Comment submission error:', error);
      alert('댓글 작성 중 오류가 발생했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  // 대댓글 작성
  const handleSubmitReply = async (parentId: string) => {
    if (!replyContent.trim() || !isLoggedIn) return;

    try {
      setSubmitting(true);
      const token = localStorage.getItem("prompt_hub_token");
      
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          promptId,
          content: replyContent.trim(),
          parentId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setComments(prev => 
          prev.map(comment => 
            comment.id === parentId 
              ? { ...comment, replies: [...comment.replies, data.comment] }
              : comment
          )
        );
        setReplyContent("");
        setReplyTo(null);
      } else {
        alert(data.error || '대댓글 작성에 실패했습니다.');
      }
    } catch (error) {
      console.error('Reply submission error:', error);
      alert('대댓글 작성 중 오류가 발생했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  // 더 많은 댓글 로드
  const loadMoreComments = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchComments(nextPage);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [promptId]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return '방금 전';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}시간 전`;
    } else if (diffInHours < 24 * 7) {
      return `${Math.floor(diffInHours / 24)}일 전`;
    } else {
      return date.toLocaleDateString('ko-KR');
    }
  };

  const CommentItem = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${isReply ? 'ml-8 border-l-2 border-gray-200 pl-4' : ''}`}
    >
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
            {comment.user.avatar ? (
              <img src={comment.user.avatar} alt={comment.user.name} className="w-8 h-8 rounded-full" />
            ) : (
              comment.user.name.charAt(0)
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <span className="font-medium text-gray-900">{comment.user.name}</span>
              <span className="text-sm text-gray-500">@{comment.user.username}</span>
              <span className="text-sm text-gray-400">{formatDate(comment.createdAt)}</span>
            </div>
            <p className="text-gray-700 whitespace-pre-wrap">{comment.content}</p>
            
            <div className="flex items-center space-x-4 mt-3">
              <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors">
                <HeartIcon className="w-4 h-4" />
                <span className="text-sm">좋아요</span>
              </button>
              {!isReply && (
                <button 
                  onClick={() => setReplyTo(comment.id)}
                  className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors"
                >
                  <ChatBubbleLeftIcon className="w-4 h-4" />
                  <span className="text-sm">답글</span>
                </button>
              )}
            </div>

            {/* 답글 작성 폼 */}
            {replyTo === comment.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3"
              >
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="답글을 작성하세요..."
                  className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={2}
                />
                <div className="flex justify-end space-x-2 mt-2">
                  <button
                    onClick={() => {
                      setReplyTo(null);
                      setReplyContent("");
                    }}
                    className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700"
                  >
                    취소
                  </button>
                  <button
                    onClick={() => handleSubmitReply(comment.id)}
                    disabled={submitting || !replyContent.trim()}
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                  >
                    {submitting ? "작성 중..." : "답글 작성"}
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* 대댓글들 */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-3 space-y-3">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} isReply={true} />
          ))}
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">댓글</h3>
      
      {/* 댓글 작성 폼 */}
      {isLoggedIn ? (
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 작성하세요..."
            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
          />
          <div className="flex justify-end mt-3">
            <button
              onClick={handleSubmitComment}
              disabled={submitting || !newComment.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {submitting ? "작성 중..." : "댓글 작성"}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <p className="text-gray-600 mb-2">댓글을 작성하려면 로그인이 필요합니다.</p>
          <a href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
            로그인하기
          </a>
        </div>
      )}

      {/* 댓글 목록 */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            아직 댓글이 없습니다. 첫 번째 댓글을 작성해보세요!
          </div>
        ) : (
          <>
            {comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
            
            {hasMore && (
              <div className="text-center">
                <button
                  onClick={loadMoreComments}
                  disabled={loading}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
                >
                  {loading ? "로딩 중..." : "더 많은 댓글 보기"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
