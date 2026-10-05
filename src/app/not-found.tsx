import { LocaleLink } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="px-6 pb-24 pt-36">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-jungle">404</p>
      <h1 className="mt-3 font-display text-6xl text-ocean">This page is not in Jacó.</h1>
      <p className="mt-4 max-w-md text-muted">The house is still there. The link is not.</p>
      <LocaleLink locale="en" href="/" className="mt-6 inline-flex rounded-full bg-ocean px-5 py-3 text-sm font-semibold text-sand">
        Back to Jaco Escape
      </LocaleLink>
    </div>
  );
}
