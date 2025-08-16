"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiGet, apiPost } from "@/lib/api";

interface User {
  id: string;
  email: string;
  username: string;
  name: string;
  role: string;
}

export default function AuthStatus() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("prompt_hub_token");
    if (token) {
      apiGet("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.user) {
            setUser(data.user);
          } else {
            localStorage.removeItem("prompt_hub_token");
          }
        })
        .catch(() => {
          localStorage.removeItem("prompt_hub_token");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await apiPost("/api/auth/logout", {});
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("prompt_hub_token");
      setUser(null);
      router.push("/");
    }
  };

  if (loading) {
    return (
      <div className="flex space-x-4">
        <div className="animate-pulse bg-gray-200 h-8 w-16 rounded"></div>
        <div className="animate-pulse bg-gray-200 h-8 w-20 rounded"></div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600 font-medium">
          안녕하세요, {user.name}님!
        </span>
        <Link
          href="/write"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          프롬프트 만들기
        </Link>
        {user.role === 'ADMIN' && (
          <Link
            href="/admin/dashboard"
            className="text-red-600 hover:text-red-700 font-medium px-3 py-2 rounded-md text-sm transition-colors"
          >
            관리자
          </Link>
        )}
        <button
          onClick={handleLogout}
          className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
        >
          로그아웃
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <Link
        href="/login"
        className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
      >
        로그인
      </Link>
      <Link
        href="/register"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
      >
        회원가입
      </Link>
    </div>
  );
} 