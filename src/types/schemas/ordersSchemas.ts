import { Type, type Static } from "@sinclair/typebox";

const ProductSchema = Type.Object({
	id: Type.String(),
	productId: Type.String(),
	orderId: Type.String(),
	quantity: Type.Integer({ minimum: 1 }),
});

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
	createdAt: Type.String(),
	updateAt: Type.String(),
	products: Type.Array(ProductSchema, { minItems: 1 }),
});

const OrderInserSchema = Type.Object({
	customerId: Type.String(),
	paymentMethodId: Type.String(),
	value: Type.Number(),
	products: Type.Array(ProductInsertSchema, { minItems: 1 }),
});

const OrderUpdateShopmanSchema = Type.Pick(OrderSchema, ["id", "status", "shopmanId", "products"]);

const OrderUpdateCustomerSchema = Type.Omit(OrderSchema, ["customerId", "shopmanId", "createdAt", "updateAt"]);

const OrdersListSchema = Type.Array(OrderSchema);

const OrderMessageResponse = Type.Literal("Sucess Message");

export {
	OrderSchema,
	OrderInserSchema,
	OrderUpdateShopmanSchema,
	OrderUpdateCustomerSchema,
	OrdersListSchema,
	OrderMessageResponse,
};
