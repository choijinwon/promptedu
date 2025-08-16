"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Prompt {
  id: string;
  title: string;
  description: string;
  content: string;
  price: number;
  type: 'MARKETPLACE' | 'SHARED';
  is_public: boolean;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'DRAFT';
  created_at: string;
  views: number;
  downloads: number;
  rating: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // 인증 체크
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
      return;
    }
    loadPrompts();
  }, [router]);

  const loadPrompts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch("/api/user/prompts", {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('프롬프트 목록을 불러오는데 실패했습니다');
      }

      const data = await response.json();
      setPrompts(data.prompts || []);
    } catch (err) {
      console.error('❌ 프롬프트 로딩 에러:', err);
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다');
    } finally {
      setLoading(false);
    }
  };

  const handleEditPrompt = (prompt: Prompt) => {
    setEditingPrompt(prompt);
    setShowEditModal(true);
  };

  const handleUpdatePrompt = async (updatedData: Partial<Prompt>) => {
    if (!editingPrompt) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/prompts/${editingPrompt.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('프롬프트 수정에 실패했습니다');
      }

      // 성공 시 목록 새로고침
      await loadPrompts();
      setShowEditModal(false);
      setEditingPrompt(null);
    } catch (err) {
      console.error('❌ 프롬프트 수정 에러:', err);
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다');
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      PENDING: { text: "승인 대기", color: "bg-yellow-100 text-yellow-800", icon: "⏳" },
      APPROVED: { text: "승인됨", color: "bg-green-100 text-green-800", icon: "✅" },
      REJECTED: { text: "거부됨", color: "bg-red-100 text-red-800", icon: "❌" },
      DRAFT: { text: "비공개", color: "bg-gray-100 text-gray-800", icon: "📝" },
    };
    const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap.DRAFT;
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
        <span className="mr-1">{statusInfo.icon}</span>
        {statusInfo.text}
      </span>
    );
  };

  const getTypeBadge = (type: string) => {
    const typeMap = {
      MARKETPLACE: { text: "마켓플레이스", color: "bg-blue-100 text-blue-800", icon: "💰" },
      SHARED: { text: "무료 공유", color: "bg-green-100 text-green-800", icon: "🆓" },
    };
    const typeInfo = typeMap[type as keyof typeof typeMap] || typeMap.SHARED;
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${typeInfo.color}`}>
        <span className="mr-1">{typeInfo.icon}</span>
        {typeInfo.text}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">프롬프트 목록을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                📝 내 프롬프트 관리
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/write"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                새 프롬프트 작성
              </Link>
              <Link
                href="/"
                className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                홈으로
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <span className="text-2xl">📝</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">총 프롬프트</p>
                <p className="text-2xl font-bold text-gray-900">{prompts.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <span className="text-2xl">✅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">공개</p>
                <p className="text-2xl font-bold text-gray-900">
                  {prompts.filter(p => p.is_public && p.status === 'APPROVED').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <span className="text-2xl">⏳</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">승인 대기</p>
                <p className="text-2xl font-bold text-gray-900">
                  {prompts.filter(p => p.status === 'PENDING').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-gray-100 p-3 rounded-lg">
                <span className="text-2xl">📝</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">비공개</p>
                <p className="text-2xl font-bold text-gray-900">
                  {prompts.filter(p => p.status === 'DRAFT').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 프롬프트 목록 */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">내 프롬프트 목록</h2>
          </div>

          {prompts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📝</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">아직 등록된 프롬프트가 없습니다</h3>
              <p className="text-gray-600 mb-6">첫 번째 프롬프트를 작성해보세요!</p>
              <Link
                href="/write"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                프롬프트 작성하기
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {prompts.map((prompt) => (
                <div key={prompt.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{prompt.title}</h3>
                        {getTypeBadge(prompt.type)}
                        {getStatusBadge(prompt.status)}
                      </div>
                      <p className="text-gray-600 mb-3 line-clamp-2">{prompt.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>가격: {prompt.price === 0 ? '무료' : `₩${prompt.price.toLocaleString()}`}</span>
                        <span>조회수: {prompt.views}</span>
                        <span>다운로드: {prompt.downloads}</span>
                        <span>평점: {prompt.rating.toFixed(1)}</span>
                        <span>등록일: {formatDate(prompt.created_at)}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => handleEditPrompt(prompt)}
                        className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        편집
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 편집 모달 */}
      {showEditModal && editingPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">프롬프트 편집</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  제목
                </label>
                <input
                  type="text"
                  defaultValue={editingPrompt.title}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  id="edit-title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  설명
                </label>
                <textarea
                  defaultValue={editingPrompt.description}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  id="edit-description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  공개 설정
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="isPublic"
                      value="true"
                      defaultChecked={editingPrompt.is_public}
                      className="mr-2"
                    />
                    <span className="text-sm">공개</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="isPublic"
                      value="false"
                      defaultChecked={!editingPrompt.is_public}
                      className="mr-2"
                    />
                    <span className="text-sm">비공개</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                취소
              </button>
              <button
                onClick={() => {
                  const title = (document.getElementById('edit-title') as HTMLInputElement)?.value;
                  const description = (document.getElementById('edit-description') as HTMLTextAreaElement)?.value;
                  const isPublic = (document.querySelector('input[name="isPublic"]:checked') as HTMLInputElement)?.value === 'true';
                  
                  handleUpdatePrompt({
                    title,
                    description,
                    is_public: isPublic,
                    status: isPublic ? 'APPROVED' : 'DRAFT'
                  });
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 