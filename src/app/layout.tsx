import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { Analytics } from "@/components/Analytics";
import { Footer } from "@/components/Footer";
import { Floaters } from "@/components/Floaters";
import { Header } from "@/components/Header";
import { TripProvider } from "@/components/TripProvider";
import { homeHero } from "@/content/villa";
import { getLocale, getRequestPath } from "@/lib/locale";
import { site } from "@/lib/site";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const shareImage = {
  url: homeHero.src,
  width: homeHero.width,
  height: homeHero.height,
  alt: homeHero.alt.en,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Jaco Escape",
    template: "%s · Jaco Escape",
  },
  description: site.description.en,
  applicationName: "Jaco Escape",
  authors: [{ name: "Jaco Escape", url: site.url }],
  creator: "Jaco Escape",
  keywords: [
    "Casa Jannat",
    "Jaco Escape",
    "Jacó vacation rental",
    "private pool Jacó",
    "Costa Rica villa",
    "Jacó experiences",
  ],
  category: "travel",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "Jaco Escape",
    description: site.description.en,
    locale: "en_US",
    alternateLocale: ["es_CR"],
    images: [shareImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jaco Escape",
    description: site.description.en,
    images: [homeHero.src],
  },
  appleWebApp: {
    title: "Jaco Escape",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#0E3B43",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const path = await getRequestPath();
  return (
    <html lang={locale} data-scroll-behavior="smooth" className={`${display.variable} ${sans.variable} h-full`}>
      <body className="min-h-full bg-sand font-sans text-ink antialiased">
        <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-sand focus:px-4 focus:py-2">
          {locale === "es" ? "Saltar al contenido" : "Skip to content"}
        </a>
        <TripProvider>
          <Header locale={locale} path={path} />
          <div id="content">{children}</div>
          <Footer locale={locale} />
          <Floaters locale={locale} path={path} />
        </TripProvider>
        <Analytics />
      </body>
    </html>
  );
}
