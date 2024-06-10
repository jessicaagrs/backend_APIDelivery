import { Type, type Static } from "@sinclair/typebox";

const CustomerSchema = Type.Object({
	id: Type.String(),
	name: Type.String(),
	email: Type.String(),
	status: Type.Boolean(),
	password: Type.String(),
	phone: Type.String(),
	createdAt: Type.String(),
	updateAt: Type.String(),
});

const CustomerInsertSchema = Type.Pick(CustomerSchema, ["name", "email", "password", "phone"]);

const CustomersUpdateSchema = Type.Omit(CustomerSchema, ["updateAt", "createdAt", "status"]);

const CustomersListSchema = Type.Array(CustomerSchema);

const CustomerMessageResponse = Type.Literal("Sucess Message");

export { CustomerMessageResponse, CustomerInsertSchema, CustomersUpdateSchema, CustomerSchema, CustomersListSchema };
