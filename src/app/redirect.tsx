"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/featured/auth/authSlice";

const publicRoutes = ["/auth/login", "/auth/register"];

export function RedirectComponent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const currentUser = useAppSelector(selectCurrentUser);

  useEffect(() => {
    if (!currentUser && !publicRoutes.includes(pathname)) {
      router.replace("/auth/login");
    }
  }, [currentUser, pathname, router]);

  return <>{children}</>;
}
