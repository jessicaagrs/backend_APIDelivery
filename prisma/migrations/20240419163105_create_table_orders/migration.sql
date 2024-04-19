-- CreateTable
CREATE TABLE "Orders" (
    "id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "shopman_id" TEXT NOT NULL,
    "paymentMethod_id" TEXT NOT NULL,
    "value" DECIMAL(10,2) NOT NULL,
    "status" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);
