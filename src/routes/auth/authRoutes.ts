import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { ErrorSchema } from "../../types/schemas/errorSchema";
import { loginSchema, responseLoginSchema } from "../../types/schemas/authSchemas";
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
}
