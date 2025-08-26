import localFont from "next/font/local";
import "./globals.css";
import FooterWrapper from "./_components/common/wrabber/FotterWrabber";
import HeaderWrapper from "./_components/common/wrabber/HeaderWrabber";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "المملكة العقارية | Saudi Real Estate",
  description:
    "اكتشف أفضل العقارات في السعودية: شقق، فلل، وأراضي للبيع والإيجار بأفضل الأسعار والخدمات.",
  keywords: [
    "عقارات السعودية",
    "شقق للبيع",
    "فلل للإيجار",
    "أراضي للبيع",
    "مكاتب تجارية",
    "Real Estate Saudi",
    "Saudi Properties",
  ],
  authors: [{ name: "المملكة العقارية" }],
  openGraph: {
    title: "المملكة العقارية | Saudi Real Estate",
    description:
      "منصة عقارية سعودية تقدم لك خيارات متنوعة من الشقق، الفلل، والأراضي للبيع والإيجار مع صور ومعلومات دقيقة.",
    url: "https://yourdomain.com", // غيره بالدومين الخاص بك
    siteName: "المملكة العقارية",
    images: [
      {
        url: "/logo.png", // من داخل مجلد public
        width: 800,
        height: 600,
        alt: "المملكة العقارية",
      },
    ],
    locale: "ar_SA",
    type: "website",
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased  `}
      >
        <>
          <HeaderWrapper />

          <main className="w-full min-h-screen">{children}</main>

          <FooterWrapper />
        </>
      </body>
    </html>
  );
}
