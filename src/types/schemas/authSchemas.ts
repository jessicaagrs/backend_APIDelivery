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

export { loginSchema, responseLoginSchema };
