import "./globals.css";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { AdminProvider } from "./context/AdminContext";
import { UserProvider } from "./context";
import QueryProvider from "./components/client/client";
import ScrollToTop from "./ScrolltoTop";

export const metadata = {
  title: "EarlyJobs – Fast Growing Platform for Jobs, Recruiters & Colleges",
  description: "Discover your career potential with EarlyJobs – AI-powered skill assessments, resume builder & job matching. Find your perfect role today.",
  openGraph: {
    title: "EarlyJobs – Fast Growing Platform for Jobs, Recruiters & Colleges",
    description: "Discover your career potential with EarlyJobs – AI-powered skill assessments, resume builder & job matching. Find your perfect role today.",
    images: [
      {
        url: "/images/company_logo.jpg", 
        width: 1200,
        height: 630,
        alt: "EarlyJobs Open Graph Image",
      },
    ],
    url: "https://www.earlyjobs.ai", 
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-P2VD6RTL');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P2VD6RTL"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <ScrollToTop/>
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
