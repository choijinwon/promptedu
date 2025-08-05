"use client";
import { useState, useEffect } from "react";
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
}

export default function CreatorApplyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [user, setUser] = useState<any>(null);
  const [existingApplication, setExistingApplication] = useState<CreatorApplication | null>(null);
  const [formData, setFormData] = useState({
    motivation: "",
    experience: "",
    portfolio: ""
  });

  useEffect(() => {
    // 사용자 정보 확인
    const token = localStorage.getItem("prompt_hub_token");
    if (!token) {
      router.push("/login");
      return;
    }

    checkUserAndApplication();
  }, [router]);

  const checkUserAndApplication = async () => {
    try {
      const token = localStorage.getItem("prompt_hub_token");
      
      // 사용자 정보 가져오기
      const userRes = await fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (userRes.ok) {
        const userData = await userRes.json();
        setUser(userData.user);

        // 이미 크리에이터인지 확인
        if (userData.user.role === 'CREATOR') {
          setError("이미 크리에이터로 등록되어 있습니다.");
          return;
        }

        // 기존 신청서 확인
        const appRes = await fetch("/api/creator/applications", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (appRes.ok) {
          const appData = await appRes.json();
          if (appData.application) {
            setExistingApplication(appData.application);
          }
        }
      }
    } catch (err) {
      console.error("사용자 확인 에러:", err);
      setError("사용자 정보를 불러오는데 실패했습니다.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("prompt_hub_token");
      
      const res = await fetch("/api/creator/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("크리에이터 신청이 성공적으로 제출되었습니다. 검토 후 결과를 알려드리겠습니다.");
        setFormData({ motivation: "", experience: "", portfolio: "" });
        await checkUserAndApplication(); // 신청서 상태 새로고침
      } else {
        setError(data.error || "신청 제출에 실패했습니다.");
      }
    } catch (err) {
      console.error("신청 제출 에러:", err);
      setError("신청 제출 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      PENDING: { text: "검토 중", color: "bg-yellow-100 text-yellow-800", icon: "⏳" },
      APPROVED: { text: "승인됨", color: "bg-green-100 text-green-800", icon: "✅" },
      REJECTED: { text: "거부됨", color: "bg-red-100 text-red-800", icon: "❌" },
    };
    const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap.PENDING;
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}>
        <span className="mr-1">{statusInfo.icon}</span>
        {statusInfo.text}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">사용자 정보를 불러오는 중...</p>
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
              <Link href="/" className="text-gray-500 hover:text-gray-900 mr-6">
                ← 메인으로 돌아가기
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">
                ✍️ 크리에이터 등록
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

        {/* 기존 신청서가 있는 경우 */}
        {existingApplication && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                📋 기존 신청서
              </h2>
              {getStatusBadge(existingApplication.status)}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">신청 정보</h3>
                <dl className="space-y-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">신청일</dt>
                    <dd className="text-sm text-gray-900">{formatDate(existingApplication.createdAt)}</dd>
                  </div>
                  {existingApplication.reviewedAt && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">검토일</dt>
                      <dd className="text-sm text-gray-900">{formatDate(existingApplication.reviewedAt)}</dd>
                    </div>
                  )}
                </dl>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">신청 내용</h3>
                <div className="space-y-3">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">신청 동기</dt>
                    <dd className="text-sm text-gray-900 mt-1 bg-gray-50 p-3 rounded">
                      {existingApplication.motivation}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">경험</dt>
                    <dd className="text-sm text-gray-900 mt-1 bg-gray-50 p-3 rounded">
                      {existingApplication.experience}
                    </dd>
                  </div>
                  {existingApplication.portfolio && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">포트폴리오</dt>
                      <dd className="text-sm text-gray-900 mt-1 bg-gray-50 p-3 rounded">
                        {existingApplication.portfolio}
                      </dd>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {existingApplication.feedback && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="text-sm font-medium text-blue-900 mb-2">관리자 피드백</h4>
                <p className="text-sm text-blue-800">{existingApplication.feedback}</p>
              </div>
            )}

            {existingApplication.status === "REJECTED" && (
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800">
                  거부된 신청서입니다. 새로운 신청서를 제출하시거나 기존 내용을 수정하여 재신청하세요.
                </p>
              </div>
            )}
          </div>
        )}

        {/* 신청 폼 */}
        {(!existingApplication || existingApplication.status === "REJECTED") && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                크리에이터 신청
              </h2>
              <p className="text-gray-600">
                프롬프트를 판매하고 수익을 창출할 수 있는 크리에이터가 되세요. 
                아래 정보를 작성하여 신청해주시면 검토 후 결과를 알려드리겠습니다.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 mb-2">
                  신청 동기 <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="motivation"
                  name="motivation"
                  rows={4}
                  required
                  value={formData.motivation}
                  onChange={handleInputChange}
                  placeholder="크리에이터가 되고 싶은 이유와 목표를 자세히 작성해주세요."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="mt-1 text-sm text-gray-500">
                  프롬프트 판매에 대한 동기와 계획을 구체적으로 작성해주세요.
                </p>
              </div>

              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                  관련 경험 <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="experience"
                  name="experience"
                  rows={4}
                  required
                  value={formData.experience}
                  onChange={handleInputChange}
                  placeholder="AI, 프롬프트 엔지니어링, 콘텐츠 제작 등 관련 경험을 작성해주세요."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="mt-1 text-sm text-gray-500">
                  AI 도구 사용 경험, 프롬프트 작성 경험, 콘텐츠 제작 경험 등을 포함해주세요.
                </p>
              </div>

              <div>
                <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700 mb-2">
                  포트폴리오 (선택)
                </label>
                <textarea
                  id="portfolio"
                  name="portfolio"
                  rows={3}
                  value={formData.portfolio}
                  onChange={handleInputChange}
                  placeholder="기존 작업물, 블로그, 깃허브 등 포트폴리오 링크를 작성해주세요."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="mt-1 text-sm text-gray-500">
                  관련 작업물이나 포트폴리오가 있다면 링크를 포함해주세요.
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-blue-900 mb-2">💡 크리에이터 혜택</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• 프롬프트 판매를 통한 수익 창출</li>
                  <li>• 전용 크리에이터 대시보드</li>
                  <li>• 판매 통계 및 분석 도구</li>
                  <li>• 커뮤니티에서의 우대</li>
                </ul>
              </div>

              <div className="flex justify-end space-x-4 pt-6">
                <Link
                  href="/"
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  취소
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? "제출 중..." : "신청 제출"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 크리에이터 가이드 */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            📚 크리에이터 가이드
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">신청 전 준비사항</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• AI 도구 사용 경험</li>
                <li>• 프롬프트 작성 능력</li>
                <li>• 창의적인 아이디어</li>
                <li>• 지속적인 학습 의지</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">승인 후 활동</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 고품질 프롬프트 제작</li>
                <li>• 정기적인 콘텐츠 업데이트</li>
                <li>• 사용자 피드백 반영</li>
                <li>• 커뮤니티 참여</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 