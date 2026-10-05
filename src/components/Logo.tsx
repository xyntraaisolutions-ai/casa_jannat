import { type Locale } from "@/lib/copy";

const sun = "#E8735A";
const ocean = "#0E3B43";
const sand = "#F6F1EA";

export function SunsetO({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="20.25" fill="none" stroke="currentColor" strokeWidth="2.15" />
      <path d="M13.2 26.2a10.8 10.8 0 0 1 21.6 0Z" fill={sun} />
      <path
        d="M14 33.2c2.6-2.5 5.1.6 7.8-1.6 2.6-2.1 5 .5 7.7-1.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ArchMark({
  className,
  arch = ocean,
  wave = sand,
}: {
  className?: string;
  arch?: string;
  wave?: string;
}) {
  return (
    <svg viewBox="0 0 80 104" className={className} aria-hidden="true">
      <path
        fill={arch}
        d="M12 104V50C12 32 20 16 32 8c4-2.4 7.2-4 8-4.6 0.8 0.6 4 2.2 8 4.6 12 8 20 24 20 42v54H12Z"
      />
      <path d="M27.5 60.5a12.5 12.5 0 0 1 25 0Z" fill={sun} />
      <path
        d="M24 71c3.6-2.6 6.4 1.6 10.2-.6 3.6-2 6.6 1.4 10.2-.4M22 79.5c4-2.8 7.2 1.8 11.4-.6 4-2.2 7.4 1.6 11.4-.4M24 88c3.6-2.6 6.4 1.6 10.2-.6 3.6-2 6.6 1.4 10.2-.4"
        fill="none"
        stroke={wave}
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function JacoLogo({
  locale,
  light = false,
  variant = "header",
}: {
  locale: Locale;
  light?: boolean;
  variant?: "header" | "footer";
}) {
  const line =
    locale === "es" ? "Estadías y experiencias · Costa Rica" : "Stays & experiences · Costa Rica";

  if (variant === "footer") {
    return (
      <span className="inline-flex max-w-full flex-col text-sand">
        <span className="inline-flex items-center font-display text-[clamp(1.85rem,7vw,2.7rem)] font-medium leading-none tracking-[0.12em]">
          JAC
          <SunsetO className="mx-[0.05em] h-[0.76em] w-[0.76em]" />
        </span>
        <span className="mt-1.5 font-display text-[clamp(0.95rem,3.5vw,1.25rem)] font-medium leading-none tracking-[0.32em] text-gold">
          ESCAPE
        </span>
        <span className="mt-3 h-px w-14 bg-gold" aria-hidden="true" />
        <span className="mt-3 max-w-[16rem] text-[0.62rem] font-semibold uppercase leading-relaxed tracking-[0.16em] text-gold sm:tracking-[0.2em]">
          {line}
        </span>
      </span>
    );
  }

  const ink = light ? "text-sand" : "text-ocean";
  const accent = light ? "text-gold" : "text-ocean";

  return (
    <span className={`inline-flex max-w-full items-center gap-1.5 whitespace-nowrap sm:gap-2 ${ink}`}>
      <span className="inline-flex items-center font-display text-[1.05rem] font-medium leading-none tracking-[0.08em] min-[380px]:text-[1.28rem] md:text-[1.5rem]">
        JAC
        <SunsetO className="mx-[0.04em] h-[0.78em] w-[0.78em]" />
      </span>
      <span className={`font-display text-[0.62rem] font-medium leading-none tracking-[0.14em] min-[380px]:text-[0.72rem] md:text-[0.88rem] md:tracking-[0.2em] ${accent}`}>
        ESCAPE
      </span>
    </span>
  );
}

export function CasaBanner({
  locale,
  tone = "light",
  heading = false,
  compact = false,
}: {
  locale: Locale;
  tone?: "light" | "dark";
  heading?: boolean;
  compact?: boolean;
}) {
  const Title = heading ? "h1" : "p";
  const dark = tone === "dark";
  const tagline = locale === "es" ? "Un pedacito de paraíso" : "A little piece of paradise";

  return (
    <div
      className={
        compact
          ? `flex items-center gap-3 text-left sm:gap-5 ${dark ? "text-sand" : "text-ocean"}`
          : `flex flex-col items-center gap-5 text-center sm:flex-row sm:items-center sm:gap-8 sm:text-left ${dark ? "text-sand" : "text-ocean"}`
      }
    >
      <ArchMark
        className={compact ? "h-[4.5rem] w-14 shrink-0 sm:h-24 sm:w-[4.6rem]" : "h-28 w-[5.4rem] shrink-0 sm:h-36 sm:w-[6.6rem]"}
        arch={dark ? sand : ocean}
        wave={dark ? ocean : sand}
      />
      <div className="min-w-0">
        <Title
          className={
            compact
              ? "font-display text-[clamp(1.15rem,4.6vw,2rem)] font-medium uppercase leading-none tracking-[0.14em]"
              : "font-display text-[clamp(1.55rem,6.2vw,3.15rem)] font-medium uppercase leading-none tracking-[0.14em] sm:tracking-[0.16em]"
          }
        >
          Casa Jannat
        </Title>
        <span className={`mt-2 block h-px bg-gold sm:mt-3 ${compact ? "w-10 sm:w-16" : "mx-auto w-14 sm:mx-0 sm:w-24"}`} aria-hidden="true" />
        <p
          className={`mt-2 font-semibold uppercase leading-relaxed tracking-[0.16em] sm:mt-3 sm:tracking-[0.24em] ${
            compact ? "text-[0.58rem] sm:text-[0.68rem]" : "text-[0.68rem] sm:text-xs"
          } ${dark ? "text-gold" : "text-ocean"}`}
        >
          {tagline}
        </p>
      </div>
    </div>
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
