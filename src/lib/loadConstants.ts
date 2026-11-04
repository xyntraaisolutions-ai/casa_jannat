import { readFileSync } from "node:fs";
import { join } from "node:path";
import { optionalProp, parseProperties } from "./parseProperties";

/** Always reads `constant.properties` from disk (server-only). */
export function loadConstantProperties(): Record<string, string> {
  return parseProperties(readFileSync(join(process.cwd(), "constant.properties"), "utf8"));
}

export function showWebsiteDevInProgress(): boolean {
  const props = loadConstantProperties();
  return optionalProp(props, "show_website_dev_in_progress", "false").toLowerCase() === "true";
}
