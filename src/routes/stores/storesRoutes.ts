import { FastifyInstance, FastifyPluginOptions } from "fastify";
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
					500: ErrorSchema,
				},
			},
		},
		controller.getAllStores
	);
	fastify.get(
		"/stores/:id",
		{
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
					500: ErrorSchema,
				},
			},
		},
		controller.getStoreById
	);
	fastify.post(
		"/stores",
		{
			schema: {
				description: "Add a new store.",
				tags: ["stores"],
				body: insertStoreSchema,
				response: {
					201: storeMessageResponse,
					400: ErrorSchema,
					500: ErrorSchema,
				},
			},
		},
		controller.createStore
	);
	fastify.put(
		"/stores",
		{
			schema: {
				description: "Updates store data.",
				tags: ["stores"],
				body: updateStoreSchema,
				response: {
					200: storeMessageResponse,
					400: ErrorSchema,
					500: ErrorSchema,
				},
			},
		},
		controller.updateStore
	);
	fastify.delete(
		"/paymentsmethods/:id",
		{
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
					500: ErrorSchema,
				},
			},
		},
		controller.deleteStore
	);
}
