import { FastifyInstance, FastifyPluginOptions } from "fastify";
import ProductsController from "../../api/controllers/products/productsController";

const controller = new ProductsController();

export async function productsRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
	fastify.get("/products", controller.getAllProducts);

	fastify.get("/products/:id", controller.getProductById);

	fastify.post("/products", controller.createProduct);

	fastify.put("/products", controller.updateProduct);

	fastify.delete("/products/:id", controller.deleteProduct);
}