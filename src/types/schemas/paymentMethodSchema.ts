import { Type } from "@sinclair/typebox";

const PaymentMethodSchema = Type.Object({
    id: Type.String(),
    description: Type.String(),
    storeId: Type.String(),
});

const paymentMethodInsertSchema = Type.Pick(PaymentMethodSchema, ["description", "storeId"]);

const paymentMethodUpdateSchema = Type.Omit(PaymentMethodSchema, ["storeId"]);

const paymentMethodListSchema = Type.Array(PaymentMethodSchema);

const paymentMethodMessageResponse = Type.Literal("Sucess Message");

const paymentsListPagination = Type.Object({
    payments: paymentMethodListSchema,
    totalPages: Type.Number(),
});

export {
    paymentMethodInsertSchema,
    paymentMethodListSchema,
    paymentMethodMessageResponse,
    PaymentMethodSchema,
    paymentMethodUpdateSchema,
    paymentsListPagination,
};
