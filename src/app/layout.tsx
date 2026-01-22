import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "@/lib/providers";
import { AuthProvider } from "@/provider/AuthProvider";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { RedirectComponent } from "./redirect";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "dressen Admin",
  description: "Vendor management website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Providers>
            <RedirectComponent>{children}</RedirectComponent>
          </Providers>
        </AuthProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
