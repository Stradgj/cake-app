import { json } from "@remix-run/node";
import prisma from "../db.server";

export async function action({ request }) {
    console.log("[connect] Manual store connect request");
    try {
        const { shop, apiKey, apiSecret } = await request.json();

        if (!shop || !apiKey || !apiSecret) {
            return json({ error: "Missing required fields" }, { status: 400 });
        }

        const existing = await prisma.store.findUnique({ where: { shop } });
        if (existing) {
            return json({ error: "Store already connected" }, { status: 400 });
        }

        const created = await prisma.store.create({
            data: { shop, apiKey, apiSecret },
        });

        console.log("[connect] Store saved:", created);
        return json({ status: "connected", shop });
    } catch (err) {
        console.error("Error in manual /api/connect:", err);
        return json({ error: "Failed to connect store manually" }, { status: 500 });
    }
}
