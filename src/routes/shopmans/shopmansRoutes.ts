import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
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
		"/shopmans/paginator/:storeId/:take/:skip",
		{
			preValidation: fastify.authenticate,
			schema: {
				description:
					"Returns a list of shopmans by pagination. Enter the number of records and how many items to ignore.",
				tags: ["shopmans"],
				params: {
					type: "object",
					required: ["storeId", "take", "skip"],
					properties: {
						storeId: {
							type: "string",
						},
						take: {
							type: "string",
						},
						skip: {
							type: "string",
						}
					},
				},
				response: {
					200: shopmanListSchema,
					400: ErrorSchema,
					401: ErrorSchema,
					404: ErrorSchema,
					500: ErrorSchema,
				},
			},
		},
		async (request: FastifyRequest<any>, reply: FastifyReply) => {
			await controller.getShopmansByPagination(request, reply);
		}
	);

	fastify.get(
		"/shopmans/all/:storeId",
		{
			preValidation: fastify.authenticate,
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
					401: ErrorSchema,
					404: ErrorSchema,
					500: ErrorSchema,
				},
			},
		},
		async (request: FastifyRequest<any>, reply: FastifyReply) => {
			await controller.getAllShopmans(request, reply);
		}
	);

	fastify.get(
		"/shopmans/:email",
		{
			preValidation: fastify.authenticate,
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
					401: ErrorSchema,
					404: ErrorSchema,
					500: ErrorSchema,
				},
			},
		},
		async (request: FastifyRequest<any>, reply: FastifyReply) => {
			await controller.getShopmanByEmail(request, reply);
		}
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
					401: ErrorSchema,
					404: ErrorSchema,
					500: ErrorSchema,
				},
			},
		},
		async (request: FastifyRequest<any>, reply: FastifyReply) => {
			await controller.createShopman(request, reply);
		}
	);

	fastify.put(
		"/shopmans",
		{
			preValidation: fastify.authenticate,
			schema: {
				description: "Updates shopman data.",
				tags: ["shopmans"],
				body: shopmanUpdateSchema,
				response: {
					200: shopmanMessageResponse,
					400: ErrorSchema,
					401: ErrorSchema,
					404: ErrorSchema,
					500: ErrorSchema,
				},
			},
		},
		async (request: FastifyRequest<any>, reply: FastifyReply) => {
			await controller.updateShopman(request, reply);
		}
	);

	fastify.delete(
		"/shopmans/:id",
		{
			preValidation: fastify.authenticate,
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
					401: ErrorSchema,
					404: ErrorSchema,
					500: ErrorSchema,
				},
			},
		},
		async (request: FastifyRequest<any>, reply: FastifyReply) => {
			await controller.deleteShopman(request, reply);
		}
	);
}
