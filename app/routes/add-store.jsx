import { useState, useEffect } from "react";
import { Page, TextField, Button, Card, ResourceList, Text } from "@shopify/polaris";

export default function AddStore() {
    const [shop, setShop] = useState("");
    const [apiKey, setApiKey] = useState("");
    const [apiSecret, setApiSecret] = useState("");
    const [stores, setStores] = useState([]);

    const handleConnect = async () => {
        try {
            const res = await fetch("/controller", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ shop, apiKey, apiSecret }),
            });

            const data = await res.json();
            if (res.ok) {
                await syncProducts(data.shop);
            } else {
                alert("Error: " + data.error);
            }
        } catch (err) {
            console.error(err);
            alert("Failed to connect store");
        }
    };

    const syncProducts = async (shop) => {
        try {
            const res = await fetch(`/sync?shop=${shop}`);
            const data = await res.json();
            console.log("Synced products:", data);
        } catch (err) {
            console.error("Sync failed:", err);
        }
    };

    return (
        <Page title="Connect External Store">
            <TextField label="Shop Domain" value={shop} onChange={setShop} />
            <TextField label="API Key" value={apiKey} onChange={setApiKey} />
            <TextField style={{ marginBottom: '10px' }} label="API Secret" value={apiSecret} onChange={setApiSecret} />
            <br></br>
            <Button onClick={handleConnect}>Connect Store</Button>
        </Page>
    );
}
