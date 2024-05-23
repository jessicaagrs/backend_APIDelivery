import { Type, type Static } from "@sinclair/typebox";

const ShopmanSchema = Type.Object({
	id: Type.String(),
	name: Type.String(),
    email: Type.String(),
    role: Type.String(),
    status: Type.Boolean(),
    createdAt: Type.String(),
    updateAt: Type.String()
});

const shopmanInsertSchema = Type.Omit(ShopmanSchema, ["id", "status", "createdAt", "updateAt"]);

const shopmanUpdateSchema = Type.Omit(ShopmanSchema, ["createdAt", "updateAt"]);

const shopmanListSchema = Type.Array(ShopmanSchema);

const shopmanMessageResponse = Type.Literal("Sucess Message");

export { ShopmanSchema, shopmanInsertSchema, shopmanUpdateSchema, shopmanListSchema, shopmanMessageResponse };