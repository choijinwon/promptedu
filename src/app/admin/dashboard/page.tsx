"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface AdminStats {
  totalUsers: number;
  totalPrompts: number;
  pendingPrompts: number;
  approvedPrompts: number;
  rejectedPrompts: number;
  totalRevenue: number;
}

interface PendingPrompt {
  id: string;
  title: string;
  author: {
    name: string;
  };
  category: {
    name: string;
  };
  price: number;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [pendingPrompts, setPendingPrompts] = useState<PendingPrompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // 관리자 권한 확인
    const token = localStorage.getItem("prompt_hub_token");
    const userRole = localStorage.getItem("prompt_hub_user_role");
    
    if (!token || userRole !== 'ADMIN') {
      router.replace("/admin/login");
      return;
    }

    // 관리자 통계 및 데이터 로드
    loadAdminData();
  }, [router]);

  const loadAdminData = async () => {
    try {
      const token = localStorage.getItem("prompt_hub_token");
      
      // 통계 데이터 로드
      const statsRes = await fetch("/api/admin/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }

      // 승인 대기 프롬프트 로드
      const promptsRes = await fetch("/api/admin/pending-prompts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (promptsRes.ok) {
        const promptsData = await promptsRes.json();
        setPendingPrompts(promptsData.prompts || []);
      }

    } catch (err) {
      console.error("관리자 데이터 로드 에러:", err);
      setError("데이터를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("prompt_hub_token");
    localStorage.removeItem("prompt_hub_user_role");
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">관리자 데이터를 불러오는 중...</p>
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
                🛠️ 관리자 대시보드
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/admin/approve"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                승인 관리
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* 통계 카드 */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <span className="text-2xl">👥</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">총 사용자</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-lg">
                  <span className="text-2xl">📝</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">총 프롬프트</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalPrompts}</p>
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
                  <p className="text-2xl font-bold text-gray-900">{stats.pendingPrompts}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <span className="text-2xl">💰</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">총 수익</p>
                  <p className="text-2xl font-bold text-gray-900">₩{stats.totalRevenue.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 승인 대기 프롬프트 */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">승인 대기 프롬프트</h2>
            <Link
              href="/admin/approve"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              전체 보기 →
            </Link>
          </div>

          {pendingPrompts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">승인 대기 중인 프롬프트가 없습니다.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingPrompts.slice(0, 5).map((prompt) => (
                <div
                  key={prompt.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{prompt.title}</h3>
                      <p className="text-sm text-gray-600">
                        작성자: 테스트 사용자 | 카테고리: 일반
                      </p>
                      <p className="text-sm text-gray-500">
                        가격: ₩{prompt.price.toLocaleString()} | 등록일: {new Date(prompt.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Link
                      href={`/admin/approve?id=${prompt.id}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      승인하기
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 빠른 액션 */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/admin/approve"
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="text-center">
              <span className="text-3xl mb-4 block">✅</span>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">프롬프트 승인</h3>
              <p className="text-gray-600">대기 중인 프롬프트를 검토하고 승인하세요</p>
            </div>
          </Link>

          <Link
            href="/admin/users"
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="text-center">
              <span className="text-3xl mb-4 block">👥</span>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">사용자 관리</h3>
              <p className="text-gray-600">사용자 계정을 관리하고 권한을 설정하세요</p>
            </div>
          </Link>

          <Link
            href="/admin/analytics"
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="text-center">
              <span className="text-3xl mb-4 block">📊</span>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">통계 분석</h3>
              <p className="text-gray-600">플랫폼 통계와 성과를 확인하세요</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
} 