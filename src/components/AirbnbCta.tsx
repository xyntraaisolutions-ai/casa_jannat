import { site } from "@/lib/site";
import type { Locale } from "@/lib/copy";

type Props = {
  locale: Locale;
  variant?: "solid" | "outline" | "light";
  size?: "md" | "lg";
  className?: string;
  showNote?: boolean;
};

export function AirbnbCta({ locale, variant = "solid", size = "md", className = "", showNote = true }: Props) {
  const label = locale === "es" ? "Reservar en Airbnb" : "Book on Airbnb";
  const note =
    locale === "es"
      ? "Reserva directa próximamente · Por ahora, Airbnb"
      : "Direct booking coming soon · Book on Airbnb for now";

  const base =
    size === "lg"
      ? "inline-flex items-center justify-center rounded-full px-7 py-3.5 text-base font-semibold transition"
      : "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition";

  const styles =
    variant === "solid"
      ? "bg-coral-deep text-white hover:bg-ocean"
      : variant === "light"
        ? "bg-sand text-ocean hover:bg-white"
        : "border border-current/30 hover:bg-black/5";

  return (
    <div className={className}>
      <a href={site.airbnb} target="_blank" rel="noopener noreferrer" className={`${base} ${styles}`}>
        {label}
      </a>
      {showNote ? <p className="mt-2 text-xs leading-snug opacity-80">{note}</p> : null}
    </div>
  );
}

export function AirbnbStickyBar({ locale }: { locale: Locale }) {
  return (
    <div className="mobile-dock fixed inset-x-0 bottom-0 z-20 border-t border-line bg-sand/95 px-4 py-3 backdrop-blur md:hidden">
      <div className="flex items-center justify-between gap-3">
        <p className="min-w-0 text-xs leading-snug text-muted">
          {locale === "es" ? "Reserva directa próximamente" : "Direct booking coming soon"}
        </p>
        <a
          href={site.airbnb}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-full bg-coral-deep px-4 py-2 text-sm font-semibold text-white"
        >
          {locale === "es" ? "Airbnb" : "Airbnb"}
        </a>
      </div>
    </div>
  );
}
