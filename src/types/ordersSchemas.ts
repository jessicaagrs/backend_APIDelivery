import { Type, type Static } from "@sinclair/typebox";

const OrderSchema = Type.Object({
	id: Type.String(),
	customerId: Type.String(),
	shopmanId: Type.String(),
	paymentMethodId: Type.String(),
	value: Type.Number(),
	status: Type.String(),
	createdAt: Type.String(),
	updateAt: Type.String(),
});

const OrderUpdateShopmanSchema = Type.Pick(OrderSchema, ["id", "status", "shopmanId"]);

const OrderUpdateCustomerSchema = Type.Omit(OrderSchema, ["customerId", "shopmanId", "createdAt", "updateAt"]);

const OrderInserSchema = Type.Omit(OrderSchema, ["id", "shopmanId", "status", "createdAt", "updateAt"]);

const OrdersListSchema = Type.Array(OrderSchema);

const OrderMessageResponse = Type.Literal("Sucess Message");

export { OrderSchema, OrderInserSchema, OrderUpdateShopmanSchema, OrderUpdateCustomerSchema, OrdersListSchema, OrderMessageResponse };
