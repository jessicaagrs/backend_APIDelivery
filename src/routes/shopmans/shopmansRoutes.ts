import { FastifyInstance, FastifyPluginOptions } from "fastify";
import ShopmansController from "../../api/controllers/shopmans/shopmansController";

const controller = new ShopmansController();

export async function shopmansRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
	fastify.get("/shopmans", controller.getAllShopmans);

	fastify.get("/shopmans/:email", controller.getShopmanByEmail);

	fastify.post("/shopmans", controller.createShopman);

	fastify.put("/shopmans", controller.updateShopman);

	fastify.delete("/shopmans/:id", controller.deleteShopman);
}
