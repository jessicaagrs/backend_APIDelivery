import { Type } from "@sinclair/typebox";

const loginSchema = Type.Object({
    email: Type.String(),
    password: Type.String(),
    typeLogin: Type.String(),
});

const passwordResetSchema = Type.Object({
    email: Type.String(),
    typeLogin: Type.String(),
});

const passwordResetResponseSchema = Type.Object({
    password: Type.String(),
});

const responseLoginSchema = Type.Object({
    token: Type.String(),
    user: Type.Object({
        id: Type.String(),
        typeLogin: Type.String(),
        creationDate: Type.String(),
    }),
});

export { loginSchema, passwordResetResponseSchema, passwordResetSchema, responseLoginSchema };

