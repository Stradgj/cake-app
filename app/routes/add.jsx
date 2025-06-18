import { useState } from "react";
import { Page, TextField, Button } from "@shopify/polaris";

export default function AddStore() {
    const [shop, setShop] = useState("");
    const [apiKey, setApiKey] = useState("");
    const [apiSecret, setApiSecret] = useState("");

    const handleConnect = async () => {
        try {
            const res = await fetch("/api/connect", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ shop, apiKey, apiSecret }),
            });

            const data = await res.json();
            if (res.ok) {
                alert(`Store ${data.shop} connected.`);
            } else {
                alert("Error: " + data.error);
            }
        } catch (err) {
            console.error(err);
            alert("Failed to connect store");
        }
    };

    return (
        <Page title="Connect External Store">
            <TextField label="Shop Domain" value={shop} onChange={setShop} />
            <TextField label="API Key" value={apiKey} onChange={setApiKey} />
            <TextField label="API Secret" value={apiSecret} onChange={setApiSecret} />
            <Button onClick={handleConnect}>Connect Store</Button>
        </Page>
    );
}