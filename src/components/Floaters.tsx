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
    const root = document.documentElement;
    if (consent === "unknown") root.dataset.consent = "open";
    else delete root.dataset.consent;
    return () => {
      delete root.dataset.consent;
    };
  }, [consent]);

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
        className={`fixed bottom-24 right-5 z-30 inline-flex items-center gap-2 rounded-full bg-jungle px-4 py-3 text-sm font-semibold text-white shadow-card hover:bg-ocean md:bottom-6 ${home && !scrolled ? "md:hidden" : ""} ${consent === "unknown" || (home && !scrolled) ? "max-md:hidden" : ""}`}
      >
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        {hostAction(locale)}
      </a>
      {consent === "unknown" ? (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ocean px-4 py-3 text-sand shadow-card md:inset-x-auto md:bottom-auto md:right-4 md:top-44 md:max-w-xs md:rounded-2xl md:border-0 md:p-4">
          <div className="flex items-center justify-between gap-3 md:block">
          <p className="text-xs leading-snug md:text-sm">
            {locale === "es"
              ? "Este navegador recuerda tu viaje en el dispositivo. Las analíticas solo se activan si las permites y están configuradas."
              : "This browser remembers your trip on this device. Analytics run only if you allow them and they are configured."}
          </p>
          <div className="flex shrink-0 gap-2 md:mt-3">
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
        </div>
      ) : null}
    </>
  );
}
