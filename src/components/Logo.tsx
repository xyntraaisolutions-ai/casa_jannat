import { t, type Locale } from "@/lib/copy";
import { site } from "@/lib/site";

export function Logo({ locale, light = false }: { locale: Locale; light?: boolean }) {
  const ink = light ? "#F6F1EA" : "#0E3B43";
  return (
    <span className="inline-flex items-center gap-3">
      <svg viewBox="0 0 40 40" className="h-10 w-10 shrink-0" aria-hidden="true">
        <path d="M5 29c6.2-10 23.8-10 30 0" fill="none" stroke="#C9A46A" strokeWidth="1.4" />
        <path d="M7 29h26" stroke={ink} strokeWidth="1.2" />
        <circle cx="20" cy="14" r="3.4" fill="#E8735A" />
      </svg>
      <span className="text-left">
        <span className={`block font-display text-[1.35rem] leading-none tracking-tight ${light ? "text-sand" : "text-ocean"}`}>
          Casa Jannat
        </span>
        <span className={`mt-1 block text-[0.62rem] font-semibold uppercase tracking-[0.18em] ${light ? "text-gold" : "text-jungle"}`}>
          {t(locale, site.slogan)}
        </span>
      </span>
    </span>
  );
}

export function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.6l.4-3H13v-2c0-.6.4-1 1-1z" />
    </svg>
  );
}
