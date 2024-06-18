import { Type, type Static } from "@sinclair/typebox";

const loginSchema = Type.Object({
	email: Type.String(),
	password: Type.String(),
	typeLogin: Type.String(),
});

const responseLoginSchema = Type.Object({
	token: Type.String(),
	user: Type.Object({
		id: Type.String(),
		email: Type.String(),
		creationDate: Type.String(),
	}),
});

const messageErrorResponse = Type.Literal("Unauthorized message");

export { loginSchema, responseLoginSchema, messageErrorResponse };
