import { FastifyInstance, FastifyPluginOptions } from "fastify";
import OrdersController from "../../api/controllers/orders/ordersController";

const controller = new OrdersController();

export async function ordersRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
	fastify.get("/orders", controller.getAllOrders);

	fastify.get("/orders/byId/:id", controller.getOrderById);

	fastify.get("/orders/byStatus/:status", controller.getOrdersByStatus);

	fastify.post("/orders", controller.createOrder);

	fastify.put("/orders/bycustomer", controller.updateOrderByCustomer);

	fastify.put("/orders/byShopman", controller.updateOrderByShopman);

	fastify.delete("/orders/byCustomer/:id", controller.deleteOrderByCustomer);

	fastify.delete("/orders/byShopman/:id", controller.deleteOrderByShopman);
}