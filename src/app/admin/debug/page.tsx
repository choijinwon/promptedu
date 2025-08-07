"use client";
import { useEffect, useState } from "react";

export default function AdminDebugPage() {
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkDebugInfo = async () => {
      try {
        // 로컬 스토리지 정보
        const token = localStorage.getItem("prompt_hub_token");
        const userRole = localStorage.getItem("prompt_hub_user_role");

        // 관리자 계정 정보 확인
        const adminCheckRes = await fetch("/api/admin/debug", {
          method: "GET",
        });

        const adminData = await adminCheckRes.json();

        setDebugInfo({
          localStorage: {
            token: token ? "존재함" : "없음",
            userRole: userRole || "없음",
          },
          adminAccounts: adminData.adminAccounts || [],
          databaseConnection: adminData.databaseConnection || "연결 실패",
        });
      } catch (error) {
        console.error("디버그 정보 로드 에러:", error);
        setDebugInfo({ error: "디버그 정보를 불러올 수 없습니다." });
      } finally {
        setLoading(false);
      }
    };

    checkDebugInfo();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">디버그 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">관리자 디버그 정보</h1>
        
        {debugInfo?.error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {debugInfo.error}
          </div>
        ) : (
          <div className="space-y-6">
            {/* 로컬 스토리지 정보 */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">로컬 스토리지 정보</h2>
              <div className="space-y-2">
                <div><strong>토큰:</strong> {debugInfo?.localStorage?.token}</div>
                <div><strong>사용자 역할:</strong> {debugInfo?.localStorage?.userRole}</div>
              </div>
            </div>

            {/* 데이터베이스 연결 상태 */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">데이터베이스 연결</h2>
              <div className="space-y-2">
                <div><strong>상태:</strong> {debugInfo?.databaseConnection}</div>
              </div>
            </div>

            {/* 관리자 계정 정보 */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">관리자 계정 정보</h2>
              <div className="space-y-2">
                {debugInfo?.adminAccounts?.map((account: any, index: number) => (
                  <div key={index} className="border-b pb-2">
                    <div><strong>아이디:</strong> {account.username}</div>
                    <div><strong>이메일:</strong> {account.email}</div>
                    <div><strong>이름:</strong> {account.name}</div>
                    <div><strong>역할:</strong> {account.role}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
