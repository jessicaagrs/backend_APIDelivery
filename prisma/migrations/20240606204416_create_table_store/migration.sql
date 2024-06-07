/*
  Warnings:

  - Added the required column `password` to the `Customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storeId` to the `Customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storeId` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storeId` to the `PaymentsMethods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storeId` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Shopmans` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storeId` to the `Shopmans` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customers" ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "storeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "storeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PaymentsMethods" ADD COLUMN     "storeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "storeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Shopmans" ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "storeId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Store" (
    "id" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "corporateReason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Store_cnpj_key" ON "Store"("cnpj");
