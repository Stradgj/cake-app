-- CreateTable
CREATE TABLE "ConnectedStore" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "shopDomain" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "ConnectedStore_shopDomain_key" ON "ConnectedStore"("shopDomain");
