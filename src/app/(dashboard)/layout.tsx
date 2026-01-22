"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TopNavbar } from "@/components/shared/Topbar";
import { AppSidebar } from "@/components/shared/Sidebar";

import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/featured/auth/authSlice";
import { normalizeRole, type UserRole } from "@/types/roles";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  // Redux থেকে role (যদি থাকে)
  const currentUser = useAppSelector(selectCurrentUser);
  const reduxRole: UserRole | undefined = currentUser?.role
    ? normalizeRole(currentUser.role)
    : undefined;

  // Path segment দিয়ে fallback
  const segmentRole: UserRole | undefined = pathname?.startsWith("/sr")
    ? "sr"
    : pathname?.startsWith("/admin")
    ? "admin"
    : pathname?.startsWith("/vendor")
    ? "vendor"
    : pathname?.startsWith("/customer")
    ? "customer"
    : undefined;

  // Effective role
  const role: UserRole | undefined = segmentRole ?? reduxRole;

  // Role-based route protection
  useEffect(() => {
    if (reduxRole === "admin" && pathname.startsWith("/sr")) {
      router.replace("/not-found");
    }
    if (reduxRole === "sr" && pathname.startsWith("/admin")) {
      router.replace("/not-found");
    }
  }, [reduxRole, pathname, router]);

  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen overflow-hidden">
        {/* Sidebar */}
        <div
          className={cn(
            "fixed hidden sm:block top-0 left-0 h-full z-40 transition-all duration-300",
            isSidebarOpen ? "sm:w-64" : "sm:w-11 md:w-20"
          )}
        >
          {/* role resolve না হলে sidebar রেন্ডার করব না */}
          {role && (
            <AppSidebar
              isOpen={true}
              onClose={() => setIsSidebarOpen(false)}
              isCollapsed={!isSidebarOpen}
              role={role}
            />
          )}
        </div>

        {/* Main */}
        <div
          className={cn(
            "flex-1 flex flex-col h-full overflow-hidden transition-all duration-300",
            isSidebarOpen ? "sm:ml-64" : "sm:ml-11 md:ml-20"
          )}
        >
          {/* Topbar */}
          <div
            className={`fixed top-0 right-0 z-30 flex transition-all duration-300 ${
              isSidebarOpen ? "sm:left-64" : "sm:left-20"
            } left-0`}
          >
            <div className="flex sm:hidden items-center gap-3 p-4 bg-white h-16">
              <Image
                src="/dressen.png"
                alt="Logo"
                width={30}
                height={30}
                className="rounded"
              />
            </div>
            <TopNavbar
              isSidebarOpen={isSidebarOpen}
              toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            />
          </div>

          {/* Content */}
          <main className="flex-1 overflow-y-auto bg-gray-100 mt-16 p-1">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
