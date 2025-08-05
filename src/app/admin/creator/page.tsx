"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface CreatorApplication {
  id: string;
  userId: string;
  motivation: string;
  experience: string;
  portfolio: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  feedback?: string;
  user: {
    name: string;
    username: string;
    email: string;
  };
}

export default function AdminCreatorPage() {
  const [applications, setApplications] = useState<CreatorApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedApplication, setSelectedApplication] = useState<CreatorApplication | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState("PENDING");
  const router = useRouter();

  useEffect(() => {
    // 관리자 권한 확인
    const token = localStorage.getItem("prompt_hub_token");
    const userRole = localStorage.getItem("prompt_hub_user_role");
    
    if (!token || userRole !== 'ADMIN') {
      router.replace("/admin/login");
      return;
    }

    loadApplications();
  }, [router, statusFilter]);

  const loadApplications = async () => {
    try {
      const token = localStorage.getItem("prompt_hub_token");
      
      const res = await fetch(`/api/admin/creator/applications?status=${statusFilter}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (res.ok) {
        const data = await res.json();
        setApplications(data.applications || []);
      } else {
        throw new Error("신청서 목록을 불러오는데 실패했습니다.");
      }

    } catch (err) {
      console.error("신청서 로드 에러:", err);
      setError("신청서 목록을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (applicationId: string, action: "approve" | "reject", feedback?: string) => {
    try {
      const token = localStorage.getItem("prompt_hub_token");
      
      const res = await fetch(`/api/admin/creator/applications/${applicationId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ action, feedback }),
      });
      
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "처리 실패");
      }

      setSuccess(data.message);
      setShowModal(false);
      setSelectedApplication(null);
      
      // 목록 새로고침
      setTimeout(() => {
        loadApplications();
        setSuccess("");
      }, 1000);
    } catch (err: any) {
      console.error("신청서 처리 에러:", err);
      setError(err.message || "신청서 처리 중 오류가 발생했습니다.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("prompt_hub_token");
    localStorage.removeItem("prompt_hub_user_role");
    router.push("/admin/login");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR');
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      PENDING: { text: "검토중", color: "bg-yellow-100 text-yellow-800", icon: "⏳" },
      APPROVED: { text: "승인됨", color: "bg-green-100 text-green-800", icon: "✅" },
      REJECTED: { text: "거부됨", color: "bg-red-100 text-red-800", icon: "❌" },
    };
    const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap.PENDING;
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
        <span className="mr-1">{statusInfo.icon}</span>
        {statusInfo.text}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">신청서 목록을 불러오는 중...</p>
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
                👥 크리에이터 신청 관리
              </h1>
            </div>
            <div className="flex items-center space-x-4">
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
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            {success}
          </div>
        )}

        {/* 필터 */}
        <div className="mb-6">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="PENDING">검토중</option>
            <option value="APPROVED">승인됨</option>
            <option value="REJECTED">거부됨</option>
          </select>
        </div>

        {/* 신청서 목록 */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              크리에이터 신청서 목록 ({applications.length}개)
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    신청자
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    신청 동기
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    상태
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    신청일
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    작업
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applications.map((application) => (
                  <tr key={application.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-700">
                              {application.user.name ? application.user.name.charAt(0) : application.user.username.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {application.user.name || application.user.username}
                          </div>
                          <div className="text-sm text-gray-500">
                            {application.user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <div className="text-sm text-gray-900 line-clamp-2">
                          {application.motivation}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(application.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(application.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => {
                          setSelectedApplication(application);
                          setShowModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 transition-colors"
                      >
                        상세보기
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {applications.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <p className="text-gray-500 text-lg">해당 상태의 신청서가 없습니다.</p>
            </div>
          )}
        </div>
      </div>

      {/* 상세보기 모달 */}
      {showModal && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    크리에이터 신청서
                  </h2>
                  <div className="flex items-center space-x-4">
                    {getStatusBadge(selectedApplication.status)}
                    <span className="text-sm text-gray-500">
                      {formatDate(selectedApplication.createdAt)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setSelectedApplication(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">👤 신청자 정보</h3>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-sm font-medium text-gray-500">이름</dt>
                      <dd className="text-sm text-gray-900">{selectedApplication.user.name || "미입력"}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm font-medium text-gray-500">사용자명</dt>
                      <dd className="text-sm text-gray-900">{selectedApplication.user.username}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm font-medium text-gray-500">이메일</dt>
                      <dd className="text-sm text-gray-900">{selectedApplication.user.email}</dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">📋 신청 내용</h3>
                  <div className="space-y-3">
                    <div>
                      <dt className="text-sm font-medium text-gray-500 mb-1">신청 동기</dt>
                      <dd className="text-sm text-gray-900 bg-gray-50 p-3 rounded">
                        {selectedApplication.motivation}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 mb-1">경험</dt>
                      <dd className="text-sm text-gray-900 bg-gray-50 p-3 rounded">
                        {selectedApplication.experience}
                      </dd>
                    </div>
                    {selectedApplication.portfolio && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500 mb-1">포트폴리오</dt>
                        <dd className="text-sm text-gray-900 bg-gray-50 p-3 rounded">
                          {selectedApplication.portfolio}
                        </dd>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {selectedApplication.feedback && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="text-sm font-medium text-blue-900 mb-2">관리자 피드백</h4>
                  <p className="text-sm text-blue-800">{selectedApplication.feedback}</p>
                </div>
              )}

              {selectedApplication.status === "PENDING" && (
                <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => handleAction(selectedApplication.id, "reject")}
                    className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                  >
                    ❌ 거부
                  </button>
                  <button
                    onClick={() => handleAction(selectedApplication.id, "approve")}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    ✅ 승인
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 