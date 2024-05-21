import { Type, type Static } from "@sinclair/typebox";

const CustomersInsertSchema = Type.Object({
	id: Type.String(),
	name: Type.String(),
	email: Type.String(),
	status: Type.Boolean(),
	created_at: Type.String(),
	update_at: Type.String(),
});

const CustomersUpdateSchema = Type.Omit(CustomersInsertSchema, ["id"]);

const CustomersListSchema = Type.Array(CustomersInsertSchema);

const CustomerMessageResponse = Type.Literal("Sucess Message");

export { CustomerMessageResponse, CustomersUpdateSchema, CustomersInsertSchema, CustomersListSchema };
