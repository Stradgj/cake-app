import { json } from "@remix-run/node";
import { prisma } from "../../db.server";

export async function loader() {
  if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
  return res.status(401).end('Unauthorized');
}
    const stores = await prisma.store.findMany();
    const primary = process.env.MAIN_STORE_DOMAIN;

    if (!primary) {
        return json({ error: "Primary store not connected" }, { status: 400 });
    }

    // Получаем товары из основного
    const productsRes = await fetch(`https://${primary.shop}/admin/api/2023-10/products.json`, {
        headers: {
            "X-Shopify-Access-Token": process.env.MAIN_STORE_TOKEN,
            "Content-Type": "application/json",
        },
    });
    const { products } = await productsRes.json();

    const errors = [];

    for (const store of stores) {
        if (store.shop === primary.shop) continue;

        try {
            for (const product of products) {
                await fetch(`https://${store.shop}/admin/api/2023-10/products.json`, {
                    method: "POST",
                    headers: {
                        "X-Shopify-Access-Token": store.apiSecret,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ product }),
                });
            }
        } catch (e) {
            errors.push({ shop: store.shop, error: e.message });
        }
    }

    return json({ status: "sync complete", errors });
}
