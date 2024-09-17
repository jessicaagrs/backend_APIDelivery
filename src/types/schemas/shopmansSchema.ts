import { Type } from "@sinclair/typebox";

const ShopmanSchema = Type.Object({
    id: Type.String(),
    name: Type.String(),
    email: Type.String(),
    role: Type.String(),
    status: Type.Boolean(),
    password: Type.String(),
    storeId: Type.String(),
    createdAt: Type.String(),
    updateAt: Type.String(),
});

const shopmanInsertSchema = Type.Omit(ShopmanSchema, ["id", "status", "createdAt", "updateAt"]);

const shopmanUpdateSchema = Type.Omit(ShopmanSchema, ["createdAt", "updateAt", "storeId", "status", "role"]);

const shopmanListSchema = Type.Array(ShopmanSchema);

const shopmanMessageResponse = Type.Literal("Sucess Message");

const shopmansListPaginationSchema = Type.Object({
    shopmans: shopmanListSchema,
    totalPages: Type.Number(),
});

export {
    shopmanInsertSchema,
    shopmanListSchema,
    shopmanMessageResponse,
    ShopmanSchema,
    shopmansListPaginationSchema,
    shopmanUpdateSchema,
};
