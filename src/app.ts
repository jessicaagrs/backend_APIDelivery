import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { authRoutes } from "./routes/auth/authRoutes";
import { customersRoutes } from "./routes/customers/customersRoutes";
import dataAnalyticsRoutes from "./routes/dataAnalytics/dataAnalyticsRoutes";
import { ordersRoutes } from "./routes/orders/ordersRoutes";
import { paymentsMethodsRoutes } from "./routes/paymentsMethods/paymentsMethodsRoutes";
import { productsRoutes } from "./routes/products/productsRoutes";
import { productsOrderRoutes } from "./routes/productsOrder/productsOrderRoutes";
import { shopmansRoutes } from "./routes/shopmans/shopmansRoutes";
import { storesRoutes } from "./routes/stores/storesRoutes";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.register(authRoutes);
    fastify.register(storesRoutes);
    fastify.register(customersRoutes);
    fastify.register(shopmansRoutes);
    fastify.register(paymentsMethodsRoutes);
    fastify.register(productsRoutes);
    fastify.register(ordersRoutes);
    fastify.register(productsOrderRoutes);
    fastify.register(dataAnalyticsRoutes);
}
