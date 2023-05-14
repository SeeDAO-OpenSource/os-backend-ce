/*
  Warnings:

  - You are about to drop the `Tool` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Tool";

-- CreateTable
CREATE TABLE "InfraTool" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "logo" TEXT,
    "description" TEXT,
    "url" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,

    CONSTRAINT "InfraTool_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "InfraTool_name_idx" ON "InfraTool"("name");

-- CreateIndex
CREATE INDEX "InfraTool_type_idx" ON "InfraTool"("type");
