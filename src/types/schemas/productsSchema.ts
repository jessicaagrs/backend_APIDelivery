import { Type, type Static } from "@sinclair/typebox";

const ProductSchema = Type.Object({
	id: Type.String(),
	description: Type.String(),
    price: Type.Number(),
    urlImage: Type.String(),
    type: Type.String(),
});

const productInsertSchema = Type.Omit(ProductSchema, ["id"]);

const productsListSchema = Type.Array(ProductSchema);

const productMessageResponse = Type.Literal("Sucess Message");

export { ProductSchema, productInsertSchema, productsListSchema, productMessageResponse };