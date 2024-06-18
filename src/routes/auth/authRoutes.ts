import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { ErrorSchema } from "../../types/schemas/errorSchema";
import { loginSchema, messageErrorResponse, responseLoginSchema } from "../../types/schemas/authSchemas";
import AuthController from "../../api/controllers/auth/authController";

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
					401: messageErrorResponse,
					400: ErrorSchema,
					500: ErrorSchema,
				},
			},
		},
		controller.Login
	);
}
