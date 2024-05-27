import { Type, type Static } from "@sinclair/typebox";

const CustomerSchema = Type.Object({
	id: Type.String(),
	name: Type.String(),
	email: Type.String(),
	status: Type.Boolean(),
	createdAt: Type.String(),
	updateAt: Type.String(),
});

const CustomerInsertSchema = Type.Pick(CustomerSchema, ["name", "email"]);

const CustomersUpdateSchema = Type.Omit(CustomerSchema, ["updateAt", "createdAt"]);

const CustomersListSchema = Type.Array(CustomerSchema);

const CustomerMessageResponse = Type.Literal("Sucess Message");

export { CustomerMessageResponse, CustomerInsertSchema, CustomersUpdateSchema, CustomerSchema, CustomersListSchema };