// remix.config.js
import { vercelVite } from "@remix-run/vercel";

if (
  process.env.HOST &&
  (!process.env.SHOPIFY_APP_URL ||
    process.env.SHOPIFY_APP_URL === process.env.HOST)
) {
  process.env.SHOPIFY_APP_URL = process.env.HOST;
  delete process.env.HOST;
}

/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ...vercelVite(), // 🟢 это ключ к SSR + API в Vercel
  ignoredRouteFiles: ["**/.*"],
  appDirectory: "app",
  dev: { port: 3000 },
};
