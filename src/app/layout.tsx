import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { Analytics } from "@/components/Analytics";
import { Footer } from "@/components/Footer";
import { Floaters } from "@/components/Floaters";
import { Header } from "@/components/Header";
import { TripProvider } from "@/components/TripProvider";
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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Casa Jannat",
    template: "%s · Casa Jannat",
  },
  description: "Private pool, four bedrooms, and the beach a short walk away in Jacó, Costa Rica.",
  applicationName: "Casa Jannat",
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
