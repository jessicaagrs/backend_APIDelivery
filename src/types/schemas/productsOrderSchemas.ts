import { Type, type Static } from "@sinclair/typebox";

const ProductsOrderSchema = Type.Object({
	id: Type.String(),
	quantity: Type.Number(),
	description: Type.String(),
	urlImage: Type.String(),
	price: Type.Number(),
});

const ProductsOrderListSchema = Type.Array(ProductsOrderSchema);

export { ProductsOrderListSchema };
