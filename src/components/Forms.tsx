"use client";

import { useState } from "react";
import { occasions } from "@/content/occasions";
import { experiences } from "@/content/experiences";
import { faqCategories, faqs } from "@/content/faqs";
import { t, type Locale } from "@/lib/copy";
import { hostAction, hostHref, site } from "@/lib/site";

const budgets = [
  { id: "4", en: "Under $4,000", es: "Menos de $4,000" },
  { id: "8", en: "$4,000–$8,000", es: "$4,000–$8,000" },
  { id: "12", en: "$8,000–$12,000", es: "$8,000–$12,000" },
  { id: "open", en: "We will know it when we see it", es: "Lo sabremos al verlo" },
];

export function PlanForm({ locale }: { locale: Locale }) {
  const [step, setStep] = useState(0);
  const [occasion, setOccasion] = useState(occasions[0]?.slug ?? "");
  const [flexible, setFlexible] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(6);
  const [budget, setBudget] = useState(budgets[1].id);
  const [interests, setInterests] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [ready, setReady] = useState(false);

  const steps = locale === "es"
    ? ["Ocasión", "Fechas", "Grupo", "Presupuesto", "Intereses", "Contacto"]
    : ["Occasion", "Dates", "Group", "Budget", "Interests", "Contact"];

  function toggle(slug: string) {
    setInterests((current) => (current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug]));
  }

  const occasionTitle = occasions.find((item) => item.slug === occasion);
  const body = [
    locale === "es" ? "Plan a medida para Casa Jannat" : "Custom plan for Casa Jannat",
    `${name} · ${email} · ${phone}`,
    `${locale === "es" ? "Ocasión" : "Occasion"}: ${occasionTitle ? t(locale, occasionTitle.title) : occasion}`,
    flexible
      ? locale === "es"
        ? "Fechas flexibles"
        : "Dates are flexible"
      : `${checkIn || "?"} → ${checkOut || "?"}`,
    `${locale === "es" ? "Grupo" : "Group"}: ${guests}`,
    `${locale === "es" ? "Presupuesto" : "Budget"}: ${t(locale, budgets.find((item) => item.id === budget) ?? budgets[0])}`,
    interests
      .map((slug) => experiences.find((item) => item.slug === slug))
      .filter(Boolean)
      .map((item) => t(locale, item!.title))
      .join(", "),
  ].join("\n");

  const canNext =
    (step === 0 && occasion) ||
    (step === 1 && (flexible || (checkIn && checkOut))) ||
    step === 2 ||
    step === 3 ||
    step === 4 ||
    (step === 5 && name.trim() && email.includes("@") && phone.trim().length > 5);

  return (
    <div className="rounded-3xl bg-white p-6 shadow-card">
      <ol className="flex flex-wrap gap-2 text-xs">
        {steps.map((label, index) => (
          <li key={label} className={`rounded-full px-3 py-1 ${index === step ? "bg-ocean text-sand" : "bg-sand text-muted"}`}>
            {index + 1}. {label}
          </li>
        ))}
      </ol>
      <div className="mt-6">
        {step === 0 ? (
          <div className="grid gap-2 sm:grid-cols-2">
            {occasions.map((item) => (
              <button key={item.slug} type="button" onClick={() => setOccasion(item.slug)} className={`rounded-2xl border px-4 py-4 text-left ${occasion === item.slug ? "border-ocean bg-sand" : "border-line"}`}>
                <span className="font-display text-2xl text-ocean">{t(locale, item.title)}</span>
                <span className="mt-1 block text-sm text-muted">{t(locale, item.summary)}</span>
              </button>
            ))}
          </div>
        ) : null}
        {step === 1 ? (
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={flexible} onChange={(event) => setFlexible(event.target.checked)} />
              {locale === "es" ? "Las fechas son flexibles" : "Dates are flexible"}
            </label>
            {!flexible ? (
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="text-sm">
                  {locale === "es" ? "Llegada" : "Arrive"}
                  <input type="date" value={checkIn} onChange={(event) => setCheckIn(event.target.value)} className="mt-1 w-full rounded-xl border border-line px-3 py-2" />
                </label>
                <label className="text-sm">
                  {locale === "es" ? "Salida" : "Leave"}
                  <input type="date" value={checkOut} onChange={(event) => setCheckOut(event.target.value)} className="mt-1 w-full rounded-xl border border-line px-3 py-2" />
                </label>
              </div>
            ) : null}
          </div>
        ) : null}
        {step === 2 ? (
          <label className="block text-sm">
            {locale === "es" ? "¿Cuántos son?" : "How many of you?"}
            <input type="number" min={1} max={20} value={guests} onChange={(event) => setGuests(Number(event.target.value))} className="mt-2 w-32 rounded-xl border border-line px-3 py-2" />
          </label>
        ) : null}
        {step === 3 ? (
          <div className="grid gap-2">
            {budgets.map((item) => (
              <button key={item.id} type="button" onClick={() => setBudget(item.id)} className={`rounded-2xl border px-4 py-3 text-left ${budget === item.id ? "border-ocean bg-sand" : "border-line"}`}>
                {t(locale, item)}
              </button>
            ))}
          </div>
        ) : null}
        {step === 4 ? (
          <div className="flex flex-wrap gap-2">
            {experiences.filter((item) => item.featured).map((item) => (
              <button key={item.slug} type="button" onClick={() => toggle(item.slug)} aria-pressed={interests.includes(item.slug)} className={`rounded-full px-3 py-2 text-sm ${interests.includes(item.slug) ? "bg-ocean text-sand" : "bg-sand"}`}>
                {t(locale, item.title)}
              </button>
            ))}
          </div>
        ) : null}
        {step === 5 ? (
          <div className="grid gap-3">
            <input value={name} onChange={(event) => setName(event.target.value)} placeholder={locale === "es" ? "Nombre" : "Name"} className="rounded-xl border border-line px-3 py-2" />
            <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder={locale === "es" ? "Correo" : "Email"} type="email" className="rounded-xl border border-line px-3 py-2" />
            <input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder={locale === "es" ? "WhatsApp o teléfono" : "WhatsApp or phone"} className="rounded-xl border border-line px-3 py-2" />
          </div>
        ) : null}
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        {step > 0 ? (
          <button type="button" className="rounded-full border border-line px-4 py-2 text-sm" onClick={() => setStep((value) => value - 1)}>
            {locale === "es" ? "Atrás" : "Back"}
          </button>
        ) : null}
        {step < 5 ? (
          <button type="button" disabled={!canNext} className="rounded-full bg-ocean px-4 py-2 text-sm font-semibold text-sand disabled:opacity-40" onClick={() => setStep((value) => value + 1)}>
            {locale === "es" ? "Seguir" : "Continue"}
          </button>
        ) : (
          <button type="button" disabled={!canNext} className="rounded-full bg-coral-deep px-4 py-2 text-sm font-semibold text-white disabled:opacity-40" onClick={() => setReady(true)}>
            {locale === "es" ? "Revisar el mensaje" : "Review the message"}
          </button>
        )}
      </div>
      {ready ? (
        <div className="mt-6 rounded-2xl bg-sand p-4">
          <p className="text-sm">{locale === "es" ? "Envía este plan. Respondemos en persona." : "Send this plan. A person replies."}</p>
          <a href={hostHref(body, "Plan my trip")} className="mt-3 inline-flex rounded-full bg-ocean px-4 py-2 text-sm font-semibold text-sand">
            {hostAction(locale)}
          </a>
          <p className="mt-2 text-xs text-muted">{site.email}</p>
        </div>
      ) : null}
    </div>
  );
}

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
      <textarea required minLength={8} value={message} onChange={(event) => setMessage(event.target.value)} rows={5} placeholder={locale === "es" ? "Fechas, grupo, lo que estás armando" : "Dates, the group, what you are putting together"} className="w-full rounded-xl border border-line px-3 py-3" />
      <button type="submit" className="rounded-full bg-ocean px-5 py-3 text-sm font-semibold text-sand">
        {locale === "es" ? "Preparar el mensaje" : "Prepare the message"}
      </button>
      {ready ? (
        <p className="text-sm">
          <a className="font-semibold underline" href={hostHref(body, "Casa Jannat")}>
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
        <a className="self-center text-sm underline" href={hostHref(`${locale === "es" ? "Quiero notas de la casa en" : "Please send house notes to"} ${email}`, "House notes")}>
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
