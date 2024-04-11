/*
  Warnings:

  - You are about to drop the `PaymentMethods` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "PaymentMethods";

-- CreateTable
CREATE TABLE "PaymentsMethods" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "PaymentsMethods_pkey" PRIMARY KEY ("id")
);
