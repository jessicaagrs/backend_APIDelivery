/*
  Warnings:

  - You are about to drop the `Store` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `phone` to the `Customers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customers" ADD COLUMN     "phone" TEXT NOT NULL;

-- DropTable
DROP TABLE "Store";

-- CreateTable
CREATE TABLE "Stores" (
    "id" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "corporateReason" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Stores_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Stores_cnpj_key" ON "Stores"("cnpj");
