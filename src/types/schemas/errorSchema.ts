import { Type, type Static } from '@sinclair/typebox'

export const ErrorSchema = Type.Object({
    statusCode: Type.Number(),
    error: Type.String(),
    message: Type.String(),
})