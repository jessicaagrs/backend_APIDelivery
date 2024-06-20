import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import ProductsOrderController from "../../api/controllers/productsOrder/productsOrderController";
import { ProductsOrderListSchema } from "../../types/schemas/productsOrderSchemas";
import { ErrorSchema } from "../../types/schemas/errorSchema";

const controller = new ProductsOrderController();

export async function productsOrderRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
	fastify.get(
		"/productsorder/:idOrder",
		{
			preValidation: fastify.authenticate,
			schema: {
				description: "Returns a list of products in an order.",
				tags: ["products order"],
				params: {
					type: "object",
					required: ["idOrder"],
					properties: {
						idOrder: {
							type: "string",
						},
					},
				},
				response: {
					200: ProductsOrderListSchema,
					400: ErrorSchema,
					401: ErrorSchema,
					404: ErrorSchema,
					500: ErrorSchema,
				},
			},
		},
		async (request: FastifyRequest<any>, reply: FastifyReply) => {
			await controller.getOrderedProducts(request, reply);
		}
	);
}
