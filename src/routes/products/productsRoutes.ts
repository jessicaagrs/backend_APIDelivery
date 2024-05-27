import { FastifyInstance, FastifyPluginOptions } from "fastify";
import ProductsController from "../../api/controllers/products/productsController";
import {
	ProductSchema,
	productInsertSchema,
	productMessageResponse,
	productsListSchema,
} from "../../types/schemas/productsSchema";
import { ErrorSchema } from "../../types/schemas/errorSchema";

const controller = new ProductsController();

export async function productsRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
	fastify.get(
		"/products",
		{
			schema: {
				description: "Returns a list of products.",
				tags: ["products"],
				response: {
					200: productsListSchema,
					400: ErrorSchema,
					500: ErrorSchema,
				},
			},
		},
		controller.getAllProducts
	);

	fastify.get(
		"/products/:id",
		{
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
					500: ErrorSchema,
				},
			},
		},
		controller.getProductById
	);

	fastify.post(
		"/products",
		{
			schema: {
				description: "Add a new product.",
				tags: ["products"],
				body: productInsertSchema,
				response: {
					201: productMessageResponse,
					400: ErrorSchema,
					500: ErrorSchema,
				},
			},
		},
		controller.createProduct
	);

	fastify.put(
		"/products",
		{
			schema: {
				description: "Updates product data.",
				tags: ["products"],
				body: ProductSchema,
				response: {
					200: productMessageResponse,
					400: ErrorSchema,
					500: ErrorSchema,
				},
			},
		},
		controller.updateProduct
	);

	fastify.delete(
		"/products/:id",
		{
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
					500: ErrorSchema,
				},
			},
		},
		controller.deleteProduct
	);
}
