import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { paymentsMethodsRoutes } from "./routes/paymentsMethods/paymentsMethodsRoutes";
import { customersRoutes } from "./routes/customers/customersRoutes";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
	fastify.register(customersRoutes);
	fastify.register(paymentsMethodsRoutes);
}
