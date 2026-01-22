"use client";

import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/featured/auth/authSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import AdminDashboard from "@/components/dashboard/AdminDashboard";
import VendorDashboard from "@/components/dashboard/VendorDashboard";
import SRDashboard from "@/components/dashboard/SRDashboard";

import { normalizeRole, UserRole } from "@/types/roles";

export default function DashboardPage() {
  const currentUser = useAppSelector(selectCurrentUser);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/auth/login");
      return;
    }
    setLoading(false);
  }, [currentUser, router]);

  if (loading || !currentUser) return <div>Loading...</div>;

  const role: UserRole = normalizeRole(currentUser.role);

  switch (role) {
    case "admin":
      return <AdminDashboard />;
    case "sr":
      return <SRDashboard />;
    case "customer":
    
      return <VendorDashboard />; //,
    case "vendor":
      return <VendorDashboard />;
    default:
      return <SRDashboard />;
  }
}
