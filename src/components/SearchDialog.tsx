"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { localizeHref, t, type Locale } from "@/lib/copy";
import { experiences } from "@/content/experiences";
import { occasions } from "@/content/occasions";
import { packages } from "@/content/packages";
import { posts } from "@/content/posts";
import { faqs } from "@/content/faqs";

export function SearchDialog({ locale, onClose }: { locale: Locale; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();
    inputRef.current?.focus();
    const onCancel = (event: Event) => {
      event.preventDefault();
      onClose();
    };
    dialog.addEventListener("cancel", onCancel);
    return () => dialog.removeEventListener("cancel", onCancel);
  }, [onClose]);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const pages = [
      { href: "/stays/casa-jannat", title: "Casa Jannat", kind: locale === "es" ? "Casa" : "House" },
      { href: "/experiences", title: locale === "es" ? "Experiencias" : "Experiences", kind: locale === "es" ? "Página" : "Page" },
      { href: "/packages", title: locale === "es" ? "Paquetes" : "Packages", kind: locale === "es" ? "Página" : "Page" },
      { href: "/plan-my-trip", title: locale === "es" ? "Planear mi viaje" : "Plan my trip", kind: locale === "es" ? "Página" : "Page" },
      { href: "/guide", title: locale === "es" ? "Guía de Jacó" : "Jacó guide", kind: locale === "es" ? "Página" : "Page" },
      { href: "/faq", title: "FAQ", kind: locale === "es" ? "Página" : "Page" },
      { href: "/about", title: locale === "es" ? "La historia" : "The story", kind: locale === "es" ? "Página" : "Page" },
      { href: "/contact", title: locale === "es" ? "Contacto" : "Contact", kind: locale === "es" ? "Página" : "Page" },
      ...experiences.map((item) => ({
        href: `/experiences/${item.slug}`,
        title: t(locale, item.title),
        kind: item.type === "tour" ? (locale === "es" ? "Tour" : "Tour") : locale === "es" ? "Servicio" : "Service",
      })),
      ...packages.map((item) => ({
        href: `/packages/${item.slug}`,
        title: t(locale, item.title),
        kind: locale === "es" ? "Paquete" : "Package",
      })),
      ...occasions.map((item) => ({
        href: `/occasions/${item.slug}`,
        title: t(locale, item.title),
        kind: locale === "es" ? "Ocasión" : "Occasion",
      })),
      ...posts.map((item) => ({
        href: `/guide/${item.slug}`,
        title: t(locale, item.title),
        kind: locale === "es" ? "Guía" : "Guide",
      })),
      ...faqs.map((item) => ({
        href: `/faq#${item.id}`,
        title: t(locale, item.question),
        kind: "FAQ",
      })),
    ];
    if (!needle) return pages.slice(0, 8);
    return pages.filter((item) => `${item.title} ${item.kind}`.toLowerCase().includes(needle)).slice(0, 12);
  }, [locale, query]);

  return (
    <dialog ref={dialogRef} className="w-full max-w-xl rounded-3xl bg-sand p-0 text-ink" onClick={(event) => {
      if (event.target === dialogRef.current) onClose();
    }}>
      <form method="dialog" className="border-b border-line p-4">
        <label htmlFor="site-search" className="sr-only">
          {locale === "es" ? "Buscar en el sitio" : "Search the site"}
        </label>
        <input
          id="site-search"
          ref={inputRef}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={locale === "es" ? "Casa, pesca, chef, Jacó…" : "House, fishing, chef, Jacó…"}
          className="w-full bg-transparent font-display text-2xl outline-none placeholder:text-muted"
        />
      </form>
      <ul className="max-h-96 overflow-y-auto p-2">
        {results.length === 0 ? (
          <li className="px-3 py-6 text-sm text-muted">{locale === "es" ? "Nada con ese nombre." : "Nothing under that name."}</li>
        ) : (
          results.map((result) => (
            <li key={`${result.href}-${result.title}`}>
              <Link
                href={localizeHref(locale, result.href)}
                onClick={onClose}
                className="flex items-baseline justify-between gap-4 rounded-2xl px-3 py-3 hover:bg-sand-2"
              >
                <span>{result.title}</span>
                <span className="shrink-0 text-xs uppercase tracking-wider text-muted">{result.kind}</span>
              </Link>
            </li>
          ))
        )}
      </ul>
    </dialog>
  );
}
