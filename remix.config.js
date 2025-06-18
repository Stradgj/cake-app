// remix.config.js
const { vercelVite } = require("@remix-run/vercel");
if (
  process.env.HOST &&
  (!process.env.SHOPIFY_APP_URL ||
    process.env.SHOPIFY_APP_URL === process.env.HOST)
) {
  process.env.SHOPIFY_APP_URL = process.env.HOST;
  delete process.env.HOST;
}

/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ...vercelVite(),
  ignoredRouteFiles: ["**/.*"],
  appDirectory: "app",
  dev: { port: 3000 },
};



