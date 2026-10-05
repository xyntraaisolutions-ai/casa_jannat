export type Locale = "en" | "es";

export type Copy = {
  en: string;
  es: string;
};

export function t(locale: Locale, copy: Copy): string {
  return copy[locale];
}

export function c(en: string, es: string): Copy {
  return { en, es };
}

export function localizeHref(locale: Locale, href: string): string {
  if (locale !== "es" || href.startsWith("/es")) return href;
  const hashAt = href.indexOf("#");
  const hash = hashAt >= 0 ? href.slice(hashAt) : "";
  const beforeHash = hashAt >= 0 ? href.slice(0, hashAt) : href;
  const queryAt = beforeHash.indexOf("?");
  const path = queryAt >= 0 ? beforeHash.slice(0, queryAt) : beforeHash;
  const query = queryAt >= 0 ? beforeHash.slice(queryAt) : "";
  const localized = path === "/" ? "/es" : `/es${path}`;
  return `${localized}${query}${hash}`;
}

export function barePath(path?: string | null): string {
  const withoutQuery = (path ?? "/").split("?")[0]?.split("#")[0] || "/";
  if (withoutQuery === "/es") return "/";
  if (withoutQuery.startsWith("/es/")) return withoutQuery.slice(3) || "/";
  return withoutQuery || "/";
}
