import { headers } from "next/headers";
import type { Locale } from "./copy";

export async function getLocale(): Promise<Locale> {
  const headerList = await headers();
  return headerList.get("x-locale") === "es" ? "es" : "en";
}

export async function getRequestPath(): Promise<string> {
  const headerList = await headers();
  return headerList.get("x-pathname") || "/";
}
