import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppToaster } from "@/components/app-toaster";
import { GoToTop } from "@/components/go-to-top";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import { SnapFooterRelease } from "@/components/snap-footer-release";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EarlyJobs",
  description: "The recruiter-first hiring network for recruiters, employers, and job seekers.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <Navbar />
        {children}
        <SiteFooter />
        <SnapFooterRelease />
        <GoToTop />
        <AppToaster />
      </body>
    </html>
  );
}
