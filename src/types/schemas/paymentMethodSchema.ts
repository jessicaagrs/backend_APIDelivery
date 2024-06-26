import { Type, type Static } from "@sinclair/typebox";

const PaymentMethodSchema = Type.Object({
	id: Type.String(),
	description: Type.String(),
	storeId: Type.String(),
});

const paymentMethodInsertSchema = Type.Pick(PaymentMethodSchema, ["description", "storeId"]);

const paymentMethodUpdateSchema = Type.Omit(PaymentMethodSchema, ["storeId"]);

const paymentMethodListSchema = Type.Array(PaymentMethodSchema);

const paymentMethodMessageResponse = Type.Literal("Sucess Message");

export {
	PaymentMethodSchema,
	paymentMethodInsertSchema,
	paymentMethodUpdateSchema,
	paymentMethodListSchema,
	paymentMethodMessageResponse,
};
