import { Type } from "@sinclair/typebox";

const ProductSchema = Type.Object({
    id: Type.String(),
    description: Type.String(),
    price: Type.Number(),
    urlImage: Type.String(),
    type: Type.String(),
    storeId: Type.String(),
});

const productInsertSchema = Type.Omit(ProductSchema, ["id"]);

const productUpdateSchema = Type.Omit(ProductSchema, ["storeId"]);

const productsListSchema = Type.Array(ProductSchema);

const productsListPaginationSchema = Type.Object({
    products: productsListSchema,
    totalPages: Type.Number(),
});

const productMessageResponse = Type.Literal("Sucess Message");

export {
    productInsertSchema,
    productMessageResponse,
    ProductSchema,
    productsListPaginationSchema,
    productsListSchema,
    productUpdateSchema,
};
