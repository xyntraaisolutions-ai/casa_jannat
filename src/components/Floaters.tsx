"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { barePath, type Locale } from "@/lib/copy";
import { hostAction, hostHref, site } from "@/lib/site";

export function Floaters({ locale, path }: { locale: Locale; path: string }) {
  const home = barePath(path) === "/";
  const [consent, setConsent] = useState<"unknown" | "essential" | "all">("unknown");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("casa-jannat-consent");
    if (stored === "essential" || stored === "all") setConsent(stored);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const message =
    locale === "es"
      ? "Hola, quiero preguntar por Casa Jannat en Jacó."
      : "Hello, I have a question about Casa Jannat in Jacó.";

  return (
    <>
      <a
        href={hostHref(message, "Casa Jannat")}
        className={`fixed bottom-24 right-5 z-30 inline-flex items-center gap-2 rounded-full bg-jungle px-4 py-3 text-sm font-semibold text-white shadow-card hover:bg-ocean md:bottom-6 ${home && !scrolled ? "max-md:hidden md:hidden" : ""}`}
      >
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        {hostAction(locale)}
      </a>
      {consent === "unknown" ? (
        <div className="fixed right-4 top-24 z-30 max-w-xs rounded-2xl bg-ocean p-4 text-sm text-sand shadow-card md:top-28">
          <p>
            {locale === "es"
              ? "Este navegador recuerda tu viaje en el dispositivo. Las analíticas solo se activan si las permites y están configuradas."
              : "This browser remembers your trip on this device. Analytics run only if you allow them and they are configured."}
          </p>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              className="rounded-full bg-sand px-3 py-1.5 text-xs font-semibold text-ocean"
              onClick={() => {
                localStorage.setItem("casa-jannat-consent", "essential");
                setConsent("essential");
              }}
            >
              {locale === "es" ? "Solo lo esencial" : "Essentials only"}
            </button>
            {site.ga4 || site.metaPixel ? (
              <button
                type="button"
                className="rounded-full border border-sand/40 px-3 py-1.5 text-xs font-semibold"
                onClick={() => {
                  localStorage.setItem("casa-jannat-consent", "all");
                  setConsent("all");
                }}
              >
                {locale === "es" ? "Permitir analíticas" : "Allow analytics"}
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
