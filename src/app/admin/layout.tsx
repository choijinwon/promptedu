"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 로그인 페이지는 인증 체크 제외
    if (pathname === "/admin/login") {
      setIsLoading(false);
      return;
    }

    // 관리자 인증 확인
    const checkAuth = async () => {
      const token = localStorage.getItem("prompt_hub_token");
      const userRole = localStorage.getItem("prompt_hub_user_role");

      if (!token || userRole !== "ADMIN") {
        router.replace("/admin/login");
        return;
      }

      // 토큰 유효성 확인
      try {
        const response = await fetch("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          localStorage.removeItem("prompt_hub_token");
          localStorage.removeItem("prompt_hub_user_role");
          router.replace("/admin/login");
          return;
        }

        const data = await response.json();
        if (data.user.role !== "ADMIN") {
          localStorage.removeItem("prompt_hub_token");
          localStorage.removeItem("prompt_hub_user_role");
          router.replace("/admin/login");
          return;
        }

        setIsAuthenticated(true);
      } catch (error) {
        console.error("인증 확인 에러:", error);
        localStorage.removeItem("prompt_hub_token");
        localStorage.removeItem("prompt_hub_user_role");
        router.replace("/admin/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router, pathname]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">인증 확인 중...</p>
        </div>
      </div>
    );
  }

  // 로그인 페이지이거나 인증된 경우에만 렌더링
  if (pathname === "/admin/login" || isAuthenticated) {
    return <>{children}</>;
  }

  // 인증되지 않은 경우 로딩 화면 표시 (리다이렉트 중)
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">리다이렉트 중...</p>
      </div>
    </div>
  );
}
