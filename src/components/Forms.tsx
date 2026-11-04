"use client";

import { useState } from "react";
import { faqCategories, faqs } from "@/content/faqs";
import { t, type Locale } from "@/lib/copy";
import { hostAction, hostHref, site } from "@/lib/site";

export function ContactForm({ locale }: { locale: Locale }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [ready, setReady] = useState(false);
  const body = `${name} · ${email}\n\n${message}`;
  return (
    <form
      className="space-y-3"
      onSubmit={(event) => {
        event.preventDefault();
        if (!name.trim() || !email.includes("@") || message.trim().length < 8) return;
        setReady(true);
      }}
    >
      <input required value={name} onChange={(event) => setName(event.target.value)} placeholder={locale === "es" ? "Nombre" : "Name"} className="w-full rounded-xl border border-line px-3 py-3" />
      <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder={locale === "es" ? "Correo" : "Email"} className="w-full rounded-xl border border-line px-3 py-3" />
      <textarea
        required
        minLength={8}
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        rows={5}
        placeholder={locale === "es" ? "Fechas, grupo, tu pregunta" : "Dates, the group, your question"}
        className="w-full rounded-xl border border-line px-3 py-3"
      />
      <button type="submit" className="rounded-full bg-ocean px-5 py-3 text-sm font-semibold text-sand">
        {locale === "es" ? "Preparar el mensaje" : "Prepare the message"}
      </button>
      {ready ? (
        <p className="text-sm">
          <a
            className="font-semibold underline"
            href={hostHref(body, "Casa Jannat")}
            target="_blank"
            rel="noopener noreferrer"
          >
            {hostAction(locale)}
          </a>
        </p>
      ) : null}
    </form>
  );
}

export function Newsletter({ locale }: { locale: Locale }) {
  const [email, setEmail] = useState("");
  const [ready, setReady] = useState(false);
  return (
    <form
      className="mt-6 flex flex-col gap-2 sm:flex-row"
      onSubmit={(event) => {
        event.preventDefault();
        if (!email.includes("@")) return;
        setReady(true);
      }}
    >
      <label className="sr-only" htmlFor="notes-email">
        Email
      </label>
      <input
        id="notes-email"
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder={locale === "es" ? "Tu correo" : "Your email"}
        className="w-full rounded-full border border-white/30 bg-white/10 px-4 py-3 text-sand placeholder:text-sand/60"
      />
      <button type="submit" className="rounded-full bg-sand px-5 py-3 text-sm font-semibold text-ocean">
        {locale === "es" ? "Escribirme" : "Write to me"}
      </button>
      {ready ? (
        <a
          className="self-center text-sm underline"
          href={hostHref(
            `${locale === "es" ? "Quiero notas de la casa en" : "Please send house notes to"} ${email}`,
            "House notes",
          )}
          target="_blank"
          rel="noopener noreferrer"
        >
          {hostAction(locale)}
        </a>
      ) : null}
    </form>
  );
}

export function FaqList({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState<string | null>(faqs[0]?.id ?? null);
  return (
    <div className="space-y-10">
      {faqCategories.map((category) => (
        <section key={category.en}>
          <h2 className="font-display text-3xl text-ocean">{t(locale, category)}</h2>
          <div className="mt-4 divide-y divide-line rounded-3xl bg-white">
            {faqs
              .filter((faq) => faq.category.en === category.en)
              .map((faq) => {
                const expanded = open === faq.id;
                return (
                  <div key={faq.id} id={faq.id}>
                    <button type="button" className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left" aria-expanded={expanded} onClick={() => setOpen(expanded ? null : faq.id)}>
                      <span className="font-medium">{t(locale, faq.question)}</span>
                      <span aria-hidden="true">{expanded ? "–" : "+"}</span>
                    </button>
                    {expanded ? <p className="px-5 pb-5 text-sm leading-relaxed text-muted">{t(locale, faq.answer)}</p> : null}
                  </div>
                );
              })}
          </div>
        </section>
      ))}
    </div>
  );
}
