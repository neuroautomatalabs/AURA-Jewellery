export const isStaticPages = process.env.NEXT_PUBLIC_GITHUB_PAGES === "true";

export const PAGES_ADMIN_PASSWORD =
  process.env.NEXT_PUBLIC_ADMIN_PASSWORD?.trim() || "aura-demo";
