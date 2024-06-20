import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import ProductsController from "../../api/controllers/products/productsController";
import {
	ProductSchema,
	productInsertSchema,
	productMessageResponse,
	productUpdateSchema,
	productsListSchema,
} from "../../types/schemas/productsSchema";
import { ErrorSchema } from "../../types/schemas/errorSchema";

const controller = new ProductsController();

export async function productsRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
	fastify.get(
		"/products/all/:storeId",
		{
			preValidation: fastify.authenticate,
			schema: {
				description:
					"Returns a list of products. If the store has not yet registered, standard products will be generated the first time.",
				params: {
					type: "object",
					required: ["storeId"],
					properties: {
						storeId: {
							type: "string",
						},
					},
				},
				tags: ["products"],
				response: {
					200: productsListSchema,
					400: ErrorSchema,
					401: ErrorSchema,
					404: ErrorSchema,
					500: ErrorSchema,
				},
			},
		},
		async (request: FastifyRequest<any>, reply: FastifyReply) => {
			await controller.getAllProducts(request, reply);
		}
	);

	fastify.get(
		"/products/:id",
		{
			preValidation: fastify.authenticate,
			schema: {
				description: "Returns a product via a specific id.",
				tags: ["products"],
				params: {
					type: "object",
					required: ["id"],
					properties: {
						id: {
							type: "string",
						},
					},
				},
				response: {
					200: ProductSchema,
					400: ErrorSchema,
					401: ErrorSchema,
					404: ErrorSchema,
					500: ErrorSchema,
				},
			},
		},
		async (request: FastifyRequest<any>, reply: FastifyReply) => {
			await controller.getProductById(request, reply);
		}
	);

	fastify.post(
		"/products",
		{
			preValidation: fastify.authenticate,
			schema: {
				description: "Add a new product.",
				tags: ["products"],
				body: productInsertSchema,
				response: {
					201: productMessageResponse,
					400: ErrorSchema,
					401: ErrorSchema,
					404: ErrorSchema,
					500: ErrorSchema,
				},
			},
		},
		async (request: FastifyRequest<any>, reply: FastifyReply) => {
			await controller.createProduct(request, reply);
		}
	);

	fastify.put(
		"/products",
		{
			preValidation: fastify.authenticate,
			schema: {
				description: "Updates product data.",
				tags: ["products"],
				body: productUpdateSchema,
				response: {
					200: productMessageResponse,
					400: ErrorSchema,
					401: ErrorSchema,
					404: ErrorSchema,
					500: ErrorSchema,
				},
			},
		},
		async (request: FastifyRequest<any>, reply: FastifyReply) => {
			await controller.updateProduct(request, reply);
		}
	);

	fastify.delete(
		"/products/:id",
		{
			preValidation: fastify.authenticate,
			schema: {
				description: "Removes a product.",
				tags: ["products"],
				params: {
					type: "object",
					required: ["id"],
					properties: {
						id: {
							type: "string",
						},
					},
				},
				response: {
					200: productMessageResponse,
					400: ErrorSchema,
					401: ErrorSchema,
					404: ErrorSchema,
					500: ErrorSchema,
				},
			},
		},
		async (request: FastifyRequest<any>, reply: FastifyReply) => {
			await controller.deleteProduct(request, reply);
		}
	);
}
