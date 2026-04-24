import Script from "next/script";

export default function FranchiseLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-18110835641"
        strategy="afterInteractive"
      />
      <Script id="google-ads-aw-18110835641" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-18110835641');
        `}
      </Script>
      {children}
    </>
  );
}
