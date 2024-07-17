import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import AuthController from "../../api/controllers/auth/authController";
import {
	loginSchema,
	passwordResetResponseSchema,
	passwordResetSchema,
	responseLoginSchema,
} from "../../types/schemas/authSchemas";
import { ErrorSchema } from "../../types/schemas/errorSchema";

const controller = new AuthController();

export async function authRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.post(
        "/login",
        {
            schema: {
                description: "Login a user",
                tags: ["auth"],
                body: loginSchema,
                response: {
                    200: responseLoginSchema,
                    400: ErrorSchema,
                    401: ErrorSchema,
                    404: ErrorSchema,
                    500: ErrorSchema,
                },
            },
        },
        async (request: FastifyRequest<any>, reply: FastifyReply) => {
            await controller.Login(fastify, request, reply);
        }
    );
    fastify.post(
        "/passwordReset",
        {
            schema: {
                description: "Creates a password reset for the user",
                tags: ["auth"],
                body: passwordResetSchema,
                response: {
                    201: passwordResetResponseSchema,
                    400: ErrorSchema,
                    401: ErrorSchema,
                    404: ErrorSchema,
                    500: ErrorSchema,
                },
            },
        },
        async (request: FastifyRequest<any>, reply: FastifyReply) => {
            await controller.createResetPassword(fastify, request, reply);
        }
    );
}
