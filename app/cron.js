import cron from "node-cron";
import { syncToConnectedStores } from "./sync.js";

cron.schedule("*/30 * * * *", async () => {
    console.log("🔄 Sync started");
    await syncToConnectedStores();
});
