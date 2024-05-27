/*
  Warnings:

  - You are about to drop the column `created_at` on the `Customers` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `Customers` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `customer_id` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `paymentMethod_id` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `shopman_id` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Shopmans` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `Shopmans` table. All the data in the column will be lost.
  - Added the required column `customerId` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethodId` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shopmanId` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customers" DROP COLUMN "created_at",
DROP COLUMN "update_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updateAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "created_at",
DROP COLUMN "customer_id",
DROP COLUMN "paymentMethod_id",
DROP COLUMN "shopman_id",
DROP COLUMN "update_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "customerId" TEXT NOT NULL,
ADD COLUMN     "paymentMethodId" TEXT NOT NULL,
ADD COLUMN     "shopmanId" TEXT NOT NULL,
ADD COLUMN     "updateAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Shopmans" DROP COLUMN "created_at",
DROP COLUMN "update_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updateAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "ProductsOrder" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "ProductsOrder_pkey" PRIMARY KEY ("id")
);
