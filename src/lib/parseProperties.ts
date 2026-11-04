/**
 * Minimal Java .properties parser (key=value, # comments, \n \t \\ escapes).
 * Safe for static Next.js builds — no network, no backend.
 */
export function parseProperties(text: string): Record<string, string> {
  const out: Record<string, string> = {};

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#") || line.startsWith("!")) continue;

    const eq = line.indexOf("=");
    const colon = line.indexOf(":");
    let sep = -1;
    if (eq === -1) sep = colon;
    else if (colon === -1) sep = eq;
    else sep = Math.min(eq, colon);
    if (sep <= 0) continue;

    const key = line.slice(0, sep).trim();
    if (!key) continue;

    out[key] = unescapeValue(line.slice(sep + 1).trim());
  }

  return out;
}

function unescapeValue(value: string): string {
  return value.replace(/\\([ntr\\=:#!])/g, (_, ch: string) => {
    switch (ch) {
      case "n":
        return "\n";
      case "t":
        return "\t";
      case "r":
        return "\r";
      default:
        return ch;
    }
  });
}

export function requireProp(props: Record<string, string>, key: string): string {
  const value = props[key];
  if (value === undefined) {
    throw new Error(`Missing required key "${key}" in constant.properties`);
  }
  return value;
}

export function optionalProp(props: Record<string, string>, key: string, fallback = ""): string {
  return props[key] ?? fallback;
}
