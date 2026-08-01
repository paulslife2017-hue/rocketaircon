import type { Metadata } from "next";
import "./globals.css";

const title = "로켓에어컨 | 오늘 방문 에어컨 수리";
const description = "수도권 에어컨 수리, 에러코드, 가스·냉매, 누수와 실외기 점검. 오늘 방문 상담, 기본 출장비 3만원.";

export const metadata: Metadata = {
  metadataBase: new URL("https://rocketaircon.vercel.app"),
  title: { default: title, template: "%s | 로켓에어컨" },
  description,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title,
    description,
    siteName: "로켓에어컨",
    type: "website",
    locale: "ko_KR",
    url: "/",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "오늘 바로 달려가는 로켓에어컨" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
};

const websiteData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "로켓에어컨",
  alternateName: "Rocket Aircon",
  url: "https://rocketaircon.vercel.app",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}/>{children}</body></html>;
}
