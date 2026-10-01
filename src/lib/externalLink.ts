import { SITE_URL } from "../content/site.ts";

const OWN_HOST = new URL(SITE_URL).host;

export function isExternalHref(href: string): boolean {
  if (!/^https?:\/\//i.test(href)) return false;
  try {
    return new URL(href).host !== OWN_HOST;
  } catch {
    return false;
  }
}

export function linkProps(href: string): { href: string; target?: "_blank"; rel?: string } {
  return isExternalHref(href) ? { href, target: "_blank", rel: "noopener noreferrer" } : { href };
}
