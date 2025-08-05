"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface AnalyticsData {
  totalUsers: number;
  totalPrompts: number;
  totalRevenue: number;
  totalOrders: number;
  monthlyStats: {
    month: string;
    users: number;
    prompts: number;
    revenue: number;
  }[];
  categoryStats: {
    categoryName: string;
    promptCount: number;
    totalRevenue: number;
  }[];
  topCreators: {
    creatorName: string;
    promptCount: number;
    totalRevenue: number;
  }[];
  recentActivity: {
    type: string;
    description: string;
    timestamp: string;
  }[];
}

export default function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [timeRange, setTimeRange] = useState("30"); // 7, 30, 90 days
  const router = useRouter();

  useEffect(() => {
    // 관리자 권한 확인
    const token = localStorage.getItem("prompt_hub_token");
    const userRole = localStorage.getItem("prompt_hub_user_role");
    
    if (!token || userRole !== 'ADMIN') {
      router.replace("/admin/login");
      return;
    }

    loadAnalytics();
  }, [router, timeRange]);

  const loadAnalytics = async () => {
    try {
      const token = localStorage.getItem("prompt_hub_token");
      
      const res = await fetch(`/api/admin/analytics?timeRange=${timeRange}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (res.ok) {
        const data = await res.json();
        setAnalytics(data);
      } else {
        throw new Error("통계 데이터를 불러오는데 실패했습니다.");
      }

    } catch (err) {
      console.error("통계 로드 에러:", err);
      setError("통계 데이터를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("prompt_hub_token");
    localStorage.removeItem("prompt_hub_user_role");
    router.push("/admin/login");
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR');
  };

  const getTimeRangeLabel = (range: string) => {
    switch (range) {
      case "7":
        return "최근 7일";
      case "30":
        return "최근 30일";
      case "90":
        return "최근 90일";
      default:
        return "최근 30일";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">통계 데이터를 불러오는 중...</p>
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
                📊 통계 분석
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="border border-gray-300 px-3 py-2 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="7">최근 7일</option>
                <option value="30">최근 30일</option>
                <option value="90">최근 90일</option>
              </select>
              <Link
                href="/admin/dashboard"
                className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                대시보드
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

        {analytics && (
          <>
            {/* 주요 지표 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-2xl">👥</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">총 사용자</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.totalUsers}</p>
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
                    <p className="text-2xl font-bold text-gray-900">{analytics.totalPrompts}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center">
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <span className="text-2xl">💰</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">총 매출</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(analytics.totalRevenue)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <span className="text-2xl">🛒</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">총 주문</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.totalOrders}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 월별 통계 */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  📈 월별 통계 ({getTimeRangeLabel(timeRange)})
                </h3>
                <div className="space-y-4">
                  {analytics.monthlyStats.map((stat, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-900">{stat.month}</span>
                      </div>
                      <div className="flex space-x-4 text-sm">
                        <span className="text-blue-600">사용자: {stat.users}</span>
                        <span className="text-green-600">프롬프트: {stat.prompts}</span>
                        <span className="text-yellow-600">{formatCurrency(stat.revenue)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 카테고리별 통계 */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  📊 카테고리별 통계
                </h3>
                <div className="space-y-3">
                  {analytics.categoryStats.map((category, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-900">{category.categoryName}</span>
                      <div className="flex space-x-4 text-sm">
                        <span className="text-green-600">{category.promptCount}개</span>
                        <span className="text-yellow-600">{formatCurrency(category.totalRevenue)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
              {/* 인기 크리에이터 */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  🏆 인기 크리에이터
                </h3>
                <div className="space-y-3">
                  {analytics.topCreators.map((creator, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-900">{creator.creatorName}</span>
                      </div>
                      <div className="flex space-x-4 text-sm">
                        <span className="text-green-600">{creator.promptCount}개</span>
                        <span className="text-yellow-600">{formatCurrency(creator.totalRevenue)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 최근 활동 */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  ⏰ 최근 활동
                </h3>
                <div className="space-y-3">
                  {analytics.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{activity.description}</p>
                        <p className="text-xs text-gray-500">{formatDate(activity.timestamp)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 