import { Page, Card, Button } from "@shopify/polaris";
import { Link } from "@remix-run/react";

export default function HomePage() {
  return (
    <Page title="Product Sync App">
      <Card sectioned>
        <div style={{ display: "flex", gap: "20px" }}>
          <Link to="/add-store">
            <Button primary>Подключить магазин</Button>
          </Link>
          <Link to="/stores-list">
            <Button primary>Подключенные магазины</Button>
          </Link>
        </div>
      </Card>
    </Page >
  );
}
