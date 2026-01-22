"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading"|"success"|"error">("loading");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      return;
    }

    const verifyEmail = async () => {
      try {
        const res = await fetch(`https://mega-mart-weld.vercel.app/api/v1/verify?token=${token}`);
        if (!res.ok) throw new Error("Verification failed");
        setStatus("success");
        setTimeout(() => router.push("/"), 2000);
      } catch {
        setStatus("error");
      }
    };

    verifyEmail();
  }, [token, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {status === "loading" && <p>Verifying your email...</p>}
      {status === "success" && <p>Email verified! Redirecting to dashboard...</p>}
      {status === "error" && <p>Invalid or expired link.</p>}
    </div>
  );
}
