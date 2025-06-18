import { json } from "@remix-run/node";
import { syncAll } from "~/scripts/sync";

export const loader = async () => {
    await syncAll();
    return json({ ok: true });
};