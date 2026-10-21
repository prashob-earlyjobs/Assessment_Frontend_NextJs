import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppToaster } from "@/components/app-toaster";
import { SiteChrome } from "@/components/site-chrome";
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
  metadataBase: new URL("https://www.earlyjobs.ai"),
  title: "EarlyJobs",
  description: "The recruiter-first hiring network for recruiters, employers, and job seekers.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full min-w-0 flex-col overflow-x-clip font-sans">
        <SiteChrome>{children}</SiteChrome>
        <AppToaster />
      </body>
    </html>
  );
}
