import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { paymentsMethodsRoutes } from "./routes/paymentsMethods/paymentsMethodsRoutes";
import { customersRoutes } from "./routes/customers/customersRoutes";
import { shopmansRoutes } from "./routes/shopmans/shopmansRoutes";
import { productsRoutes } from "./routes/products/productsRoutes";
import { ordersRoutes } from "./routes/orders/ordersRoutes";
import { productsOrderRoutes } from "./routes/productsOrder/productsOrderRoutes";
import { storesRoutes } from "./routes/stores/storesRoutes";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
	fastify.register(storesRoutes);
	fastify.register(customersRoutes);
	fastify.register(shopmansRoutes);
	fastify.register(paymentsMethodsRoutes);
	fastify.register(productsRoutes);
	fastify.register(ordersRoutes);
	fastify.register(productsOrderRoutes);
}
