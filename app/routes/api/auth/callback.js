import { prisma } from "~/db.server";

export async function loader({ request }) {
    const url = new URL(request.url);
    const shop = url.searchParams.get("shop");
    const code = url.searchParams.get("code");

    const res = await fetch(`https://${shop}/admin/oauth/access_token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            client_id: process.env.SHOPIFY_API_KEY,
            client_secret: process.env.SHOPIFY_API_SECRET,
            code,
        }),
    });

    const { access_token } = await res.json();

    await prisma.connectedStore.upsert({
        where: { shopDomain: shop },
        update: { accessToken: access_token },
        create: { shopDomain: shop, accessToken: access_token },
    });

    return new Response("✅ Store connected! You can go back.");
}
