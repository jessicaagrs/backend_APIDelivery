import { Type, type Static } from "@sinclair/typebox";

const storeSchema = Type.Object({
	id: Type.String(),
	cnpj: Type.String(),
	corporateReason: Type.String(),
	phone: Type.String(),
	createdAt: Type.String(),
	updateAt: Type.String(),
});

const insertStoreSchema = Type.Object({
	cnpj: Type.String(),
	corporateReason: Type.String(),
	phone: Type.String(),
	acessPassword: Type.String(),
});

const updateStoreSchema = Type.Pick(storeSchema, ["id", "corporateReason", "phone"]);

const storeListSchema = Type.Array(storeSchema);

const storeMessageResponse = Type.Literal("Sucess Message");

export { storeSchema, insertStoreSchema, updateStoreSchema, storeListSchema, storeMessageResponse };
