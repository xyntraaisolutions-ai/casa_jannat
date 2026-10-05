import Link from "next/link";
import { localizeHref, type Locale } from "@/lib/copy";

export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto w-full max-w-[1280px] px-5 md:px-8 ${className}`}>{children}</div>;
}

export function PageMain({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`pt-[7.75rem] md:pt-[10.5rem] ${className}`}>{children}</div>;
}

export function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`text-[0.72rem] font-semibold uppercase tracking-[0.22em] ${light ? "text-gold" : "text-jungle"}`}>
      {children}
    </p>
  );
}

export function LocaleLink({
  locale,
  href,
  className,
  children,
  ...props
}: {
  locale: Locale;
  href: string;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentProps<typeof Link>, "href">) {
  return (
    <Link href={localizeHref(locale, href)} className={className} {...props}>
      {children}
    </Link>
  );
}

export function Crumbs({ items }: { items: { href?: string; label: string; locale: Locale }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {index > 0 ? <span aria-hidden="true">/</span> : null}
            {item.href ? (
              <LocaleLink locale={item.locale} href={item.href} className="hover:text-ocean">
                {item.label}
              </LocaleLink>
            ) : (
              <span className="text-ink">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function Stars({ score, label }: { score: number; label: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-ocean" aria-label={label}>
      <span aria-hidden="true" className="text-coral">
        ★
      </span>
      <span className="font-semibold">{score.toFixed(1)}</span>
    </span>
  );
}
