import { FastifyInstance, FastifyPluginOptions } from "fastify";
import ShopmansController from "../../api/controllers/shopmans/shopmansController";
import {
	ShopmanSchema,
	shopmanInsertSchema,
	shopmanListSchema,
	shopmanMessageResponse,
	shopmanUpdateSchema,
} from "../../types/schemas/shopmansSchema";
import { ErrorSchema } from "../../types/schemas/errorSchema";

const controller = new ShopmansController();

export async function shopmansRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
	fastify.get(
		"/shopmans/all/:storeId",
		{
			schema: {
				description: "Returns a list of shopmans.",
				params: {
					type: "object",
					required: ["storeId"],
					properties: {
						storeId: {
							type: "string",
						},
					},
				},
				tags: ["shopmans"],
				response: {
					200: shopmanListSchema,
					400: ErrorSchema,
					500: ErrorSchema,
				},
			},
		},
		controller.getAllShopmans
	);

	fastify.get(
		"/shopmans/:email",
		{
			schema: {
				description: "Returns a shopman via a specific email.",
				tags: ["shopmans"],
				params: {
					type: "object",
					required: ["email"],
					properties: {
						email: {
							type: "string",
						},
					},
				},
				response: {
					200: ShopmanSchema,
					400: ErrorSchema,
					500: ErrorSchema,
				},
			},
		},
		controller.getShopmanByEmail
	);

	fastify.post(
		"/shopmans",
		{
			schema: {
				description: "Add a new shopman.",
				tags: ["shopmans"],
				body: shopmanInsertSchema,
				response: {
					201: shopmanMessageResponse,
					400: ErrorSchema,
					500: ErrorSchema,
				},
			},
		},
		controller.createShopman
	);

	fastify.put(
		"/shopmans",
		{
			schema: {
				description: "Updates shopman data.",
				tags: ["shopmans"],
				body: shopmanUpdateSchema,
				response: {
					200: shopmanMessageResponse,
					400: ErrorSchema,
					500: ErrorSchema,
				},
			},
		},
		controller.updateShopman
	);

	fastify.delete(
		"/shopmans/:id",
		{
			schema: {
				description: "Removes a shopman.",
				tags: ["shopmans"],
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
					200: shopmanMessageResponse,
					400: ErrorSchema,
					500: ErrorSchema,
				},
			},
		},
		controller.deleteShopman
	);
}
