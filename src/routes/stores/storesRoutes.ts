import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import StoresController from "../../api/controllers/stores/storesController";
import { ErrorSchema } from "../../types/schemas/errorSchema";
import {
	insertStoreSchema,
	storeListSchema,
	storeMessageResponse,
	storeSchema,
	updateStoreSchema,
} from "../../types/schemas/storesSchemas";

const controller = new StoresController();

export async function storesRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
	fastify.get(
		"/stores",
		{
			schema: {
				description: "Returns a list of stores.",
				tags: ["stores"],
				response: {
					200: storeListSchema,
					400: ErrorSchema,
					401: ErrorSchema,
					404: ErrorSchema,
					500: ErrorSchema,
				},
			},
		},
		async (request: FastifyRequest<any>, reply: FastifyReply) => {
			await controller.getAllStores(request, reply);
		}
	);
	fastify.get(
		"/stores/:id",
		{
			preValidation: fastify.authenticate,
			schema: {
				description: "Returns a store via a specific id.",
				params: {
					type: "object",
					required: ["id"],
					properties: {
						id: {
							type: "string",
						},
					},
				},
				tags: ["stores"],
				response: {
					200: storeSchema,
					400: ErrorSchema,
					401: ErrorSchema,
					404: ErrorSchema,
					500: ErrorSchema,
				},
			},
		},
		async (request: FastifyRequest<any>, reply: FastifyReply) => {
			await controller.getStoreById(request, reply);
		}
	);
	fastify.post(
		"/stores",
		{
			preValidation: fastify.authenticate,
			schema: {
				description: "Add a new store.",
				tags: ["stores"],
				body: insertStoreSchema,
				response: {
					201: storeMessageResponse,
					400: ErrorSchema,
					401: ErrorSchema,
					404: ErrorSchema,
					500: ErrorSchema,
				},
			},
		},
		async (request: FastifyRequest<any>, reply: FastifyReply) => {
			await controller.createStore(request, reply);
		}
	);
	fastify.put(
		"/stores",
		{
			preValidation: fastify.authenticate,
			schema: {
				description: "Updates store data.",
				tags: ["stores"],
				body: updateStoreSchema,
				response: {
					200: storeMessageResponse,
					400: ErrorSchema,
					401: ErrorSchema,
					404: ErrorSchema,
					500: ErrorSchema,
				},
			},
		},
		async (request: FastifyRequest<any>, reply: FastifyReply) => {
			await controller.updateStore(request, reply);
		}
	);
	fastify.delete(
		"/stores/:id",
		{
			preValidation: fastify.authenticate,
			schema: {
				description: "Removes a store.",
				tags: ["stores"],
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
					200: storeMessageResponse,
					400: ErrorSchema,
					401: ErrorSchema,
					404: ErrorSchema,
					500: ErrorSchema,
				},
			},
		},
		async (request: FastifyRequest<any>, reply: FastifyReply) => {
			await controller.deleteStore(request, reply);
		}
	);
}
