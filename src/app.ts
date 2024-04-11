import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { userRoutes } from "./routes/users/usersRoutes";
import { paymentsMethodsRoutes } from "./routes/paymentsMethods/paymentsMethodsRoutes";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
	fastify.register(userRoutes);
	fastify.register(paymentsMethodsRoutes);
}
