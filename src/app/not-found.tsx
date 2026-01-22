"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowLeft, Home } from "lucide-react";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white text-center px-4">
      {/* Warning Icon */}
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
        <AlertCircle className="h-10 w-10 text-red-500" />
      </div>

      {/* Heading */}
      <h1 className="text-3xl font-bold text-gray-900">404</h1>
      <p className="mt-2 text-xl font-semibold text-gray-700">Page Not Found</p>
      <p className="mt-1 text-sm text-gray-500 max-w-md">
        The page you are looking for doesn&apos;t exist or has been moved. Please check the URL or navigate back to the dashboard.
      </p>

      {/* Buttons */}
       <div className="mt-6 flex gap-3">
        <Button
          onClick={() => router.push("/")}
          className="bg-gray-900 hover:bg-gray-800"
        >
          <Home className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>

        <Button
          variant="outline"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
        </Button>
      </div>
    </div>
  );
}
