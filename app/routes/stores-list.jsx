import { useState, useEffect } from "react";
import { Page, TextField, Button, Card, ResourceList, Text } from "@shopify/polaris";

export default function AddStore() {
    const [stores, setStores] = useState([]);

    useEffect(() => {
        loadStores();
    }, []);

    const loadStores = async () => {
        const res = await fetch("/stores");
        const data = await res.json();
        setStores(data.stores || []);
    };

    const syncProducts = async (shop) => {
        try {
            const res = await fetch(`sync?shop=${shop}`);
            const data = await res.json();
            console.log("Synced products:", data);
        } catch (err) {
            console.error("Sync failed:", err);
        }
    };

    const handleDelete = async (shop) => {
        try {
            const res = await fetch(`stores?shop=${shop}`, { method: "DELETE" });
            const data = await res.json();
            if (res.ok) {
                await loadStores();
            } else {
                alert("Error deleting store: " + data.error);
            }
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    return (
        <Page title="Your stores">
            <Card title="Connected Stores">
                <ResourceList
                    resourceName={{ singular: "store", plural: "stores" }}
                    items={stores}
                    renderItem={(store) => {
                        return (
                            <ResourceList.Item id={store.id} accessibilityLabel={`View details for ${store.shop}`}>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <Text variant="bodyMd" fontWeight="bold" as="h3">
                                        {store.shop}
                                    </Text>
                                    <Button destructive onClick={() => handleDelete(store.shop)}>
                                        Delete
                                    </Button>
                                </div>
                            </ResourceList.Item>
                        );
                    }}
                />
            </Card>
        </Page>
    );
}
