import { Type, type Static } from "@sinclair/typebox";

const storeSchema = Type.Object({
	id: Type.String(),
	cnpj: Type.String(),
	corporateReason: Type.String(),
	phone: Type.String(),
	updatedAt: Type.Optional(Type.String()),
	createAt: Type.Optional(Type.String()),
});

const insertStoreSchema = Type.Pick(storeSchema, ["cnpj", "corporateReason", "phone"]);

const updateStoreSchema = Type.Pick(storeSchema, ["id", "cnpj", "corporateReason", "phone"]);

const storeListSchema = Type.Array(storeSchema);

const storeMessageResponse = Type.Literal("Sucess Message");

export { storeSchema, insertStoreSchema, updateStoreSchema, storeListSchema, storeMessageResponse };
