import { json } from "@remix-run/node";
import prisma from "../db.server";

export async function loader() {
    const stores = await prisma.store.findMany();
    return json({ stores });
}

export async function action({ request }) {
    if (request.method === "DELETE") {
        const url = new URL(request.url);
        const shop = url.searchParams.get("shop");

        if (!shop) return json({ error: "Missing shop" }, { status: 400 });

        await prisma.store.delete({ where: { shop } });
        return json({ deleted: true });
    }

    return json({ error: "Unsupported method" }, { status: 405 });
}
