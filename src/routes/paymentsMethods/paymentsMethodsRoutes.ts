import { FastifyInstance, FastifyPluginOptions } from "fastify";
import PaymentsMethodsController from "../../api/controllers/paymentsMethods/paymentsMethodsController";

const controller = new PaymentsMethodsController();

export async function paymentsMethodsRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
	fastify.get("/paymentsmethods", controller.getAllPaymentsMethods);

	fastify.post("/paymentsmethods", controller.createPaymentMethod);

	fastify.put("/paymentsmethods/:id", controller.updatePaymentMethod);

	fastify.delete("/paymentsmethods/:id", controller.deletePaymentMethod);
}