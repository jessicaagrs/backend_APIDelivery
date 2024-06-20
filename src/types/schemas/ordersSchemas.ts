import { Type, type Static } from "@sinclair/typebox";

const ProductInsertSchema = Type.Object({
	productId: Type.String(),
	quantity: Type.Integer({ minimum: 1 }),
});

const OrderSchema = Type.Object({
	id: Type.String(),
	customerId: Type.String(),
	shopmanId: Type.String(),
	paymentMethodId: Type.String(),
	value: Type.Number(),
	status: Type.String(),
	storeId: Type.String(),
	createdAt: Type.String(),
	updateAt: Type.String(),
});

const OrderInsertSchema = Type.Object({
	customerId: Type.String(),
	paymentMethodId: Type.String(),
	value: Type.Number(),
	storeId: Type.String(),
	products: Type.Array(ProductInsertSchema, { minItems: 1 }),
});

const OrderUpdateShopmanSchema = Type.Pick(OrderSchema, ["id", "status", "shopmanId"]);

const OrderUpdateCustomerSchema = Type.Omit(OrderSchema, [
	"customerId",
	"shopmanId",
	"createdAt",
	"updateAt",
	"storeId",
	"value",
	"status",
]);

const OrdersListSchema = Type.Array(OrderSchema);

const OrderMessageResponse = Type.Literal("Sucess Message");

export {
	OrderSchema,
	OrderInsertSchema,
	OrderUpdateShopmanSchema,
	OrderUpdateCustomerSchema,
	OrdersListSchema,
	OrderMessageResponse,
};
