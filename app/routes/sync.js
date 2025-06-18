import { json } from "@remix-run/node";
import prisma from "../db.server";

export async function loader({ request }) {
    const url = new URL(request.url);
    const shop = url.searchParams.get("shop");

    if (!shop) {
        return json({ error: "Missing shop parameter" }, { status: 400 });
    }

    const store = await prisma.store.findUnique({ where: { shop } });

    if (!store) {
        return json({ error: "Store not found" }, { status: 404 });
    }

    try {
        const response = await fetch(`https://${store.shop}/admin/api/2023-10/products.json`, {
            method: "GET",
            headers: {
                "X-Shopify-Access-Token": store.apiSecret,
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        return json({
            shop,
            productCount: data.products?.length || 0,
            products: data.products || [],
        });
    } catch (err) {
        console.error("Error syncing products:", err);
        return json({ error: "Failed to sync" }, { status: 500 });
    }
}
