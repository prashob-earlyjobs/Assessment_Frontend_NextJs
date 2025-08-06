import "./globals.css";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { AdminProvider } from "./context/AdminContext";
import { UserProvider } from "./context";
import QueryProvider from "./components/client/client";

export const metadata = {
  title: "EarlyJobs Assessment Platform | Smart Career Assessments & Job Matching",
  description: "Discover your career potential with EarlyJobs' AI-powered skill assessments, resume builder, career guidance, and bulk job applications. Streamline your job search today!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      
      <body>
        <QueryProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <AdminProvider>
              <UserProvider>
                {children}
              </UserProvider>
            </AdminProvider>
          </TooltipProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
