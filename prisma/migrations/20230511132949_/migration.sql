-- CreateTable
CREATE TABLE "SubDIDMintRecord" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "subDID" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "verifier" TEXT,

    CONSTRAINT "SubDIDMintRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubDIDCdKey" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "isValid" BOOLEAN NOT NULL,
    "address" TEXT,
    "subDID" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubDIDCdKey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SGNMintRecord" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "tokenId" INTEGER NOT NULL,
    "subDID" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "contract" TEXT NOT NULL,

    CONSTRAINT "SGNMintRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tool" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "logo" TEXT,
    "description" TEXT,
    "url" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,

    CONSTRAINT "Tool_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SubDIDMintRecord_address_key" ON "SubDIDMintRecord"("address");

-- CreateIndex
CREATE UNIQUE INDEX "SubDIDCdKey_key_key" ON "SubDIDCdKey"("key");

-- CreateIndex
CREATE UNIQUE INDEX "SGNMintRecord_tokenId_key" ON "SGNMintRecord"("tokenId");

-- CreateIndex
CREATE INDEX "SGNMintRecord_subDID_idx" ON "SGNMintRecord"("subDID");

-- CreateIndex
CREATE INDEX "SGNMintRecord_timestamp_idx" ON "SGNMintRecord"("timestamp");

-- CreateIndex
CREATE INDEX "SGNMintRecord_contract_idx" ON "SGNMintRecord"("contract");
