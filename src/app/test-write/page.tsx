"use client";
import { useState } from "react";

export default function TestWritePage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const testPromptRegistration = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      // 먼저 로그인
      console.log('🔐 Attempting login...');
      const loginRes = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "test_local@example.com",
          password: "password123"
        }),
      });

      const loginData = await loginRes.json();
      console.log('🔐 Login response:', loginData);

      if (!loginRes.ok) {
        throw new Error(`Login failed: ${loginData.error}`);
      }

      const token = loginData.token;
      localStorage.setItem("token", token);
      console.log('🔐 Token saved to localStorage');

      // 프롬프트 등록 테스트
      console.log('📝 Attempting prompt registration...');
      const promptRes = await fetch("/api/prompts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: "테스트 프롬프트",
          description: "테스트용 프롬프트입니다.",
          content: "이것은 테스트 프롬프트 내용입니다.",
          price: 1000,
          categoryId: "4",
          tags: ["테스트", "샘플"],
          type: "MARKETPLACE",
          isPublic: true
        }),
      });

      const promptData = await promptRes.json();
      console.log('📝 Prompt registration response:', promptData);

      if (!promptRes.ok) {
        throw new Error(`Prompt registration failed: ${promptData.error}`);
      }

      setResult(promptData);
    } catch (err: any) {
      console.error('❌ Test error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const testCategories = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      console.log('📋 Testing categories API...');
      const res = await fetch("/api/categories");
      const data = await res.json();
      console.log('📋 Categories response:', data);
      setResult(data);
    } catch (err: any) {
      console.error('❌ Categories test error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">프롬프트 등록 테스트</h1>
        
        <div className="space-y-4">
          <button
            onClick={testCategories}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "테스트 중..." : "📋 카테고리 API 테스트"}
          </button>

          <button
            onClick={testPromptRegistration}
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "테스트 중..." : "📝 프롬프트 등록 테스트"}
          </button>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            <strong>에러:</strong> {error}
          </div>
        )}

        {result && (
          <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            <strong>결과:</strong>
            <pre className="mt-2 text-sm overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
