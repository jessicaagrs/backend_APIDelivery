import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import CustomersController from "../../api/controllers/customers/customersController";
import {
	CustomerSchema,
	CustomerInsertSchema,
	CustomersUpdateSchema,
	CustomersListSchema,
	CustomerMessageResponse,
} from "../../types/schemas/customersSchemas";
import { ErrorSchema } from "../../types/schemas/errorSchema";

const controller = new CustomersController();

export async function customersRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
	fastify.get(
		"/customers/paginator/:take/:skip",
		{
			preValidation: fastify.authenticate,
			schema: {
				description:
					"Returns a list of customers by pagination. Enter the number of records and how many items to ignore.",
				tags: ["customers"],
				params: {
					type: "object",
					required: ["take", "skip"],
					properties: {
						take: {
							type: "string",
						},
						skip: {
							type: "string",
						},
					},
				},
				response: {
					200: CustomersListSchema,
					400: ErrorSchema,
					401: ErrorSchema,
					404: ErrorSchema,
					500: ErrorSchema,
				},
			},
		},
		async (request: FastifyRequest<any>, reply: FastifyReply) => {
			await controller.getCustomersByPagination(request, reply);
		}
	);
	fastify.get(
		"/customers",
		{
			preValidation: fastify.authenticate,
			schema: {
				description: "Returns a list of customers.",
				tags: ["customers"],
				response: {
					200: CustomersListSchema,
					400: ErrorSchema,
					401: ErrorSchema,
					404: ErrorSchema,
					500: ErrorSchema,
				},
			},
		},
		async (request: FastifyRequest<any>, reply: FastifyReply) => {
			await controller.getAllCustomers(request, reply);
		}
	);

	fastify.get(
		"/customers/:email",
		{
			preValidation: fastify.authenticate,
			schema: {
				description: "Returns a customer via a specific email.",
				tags: ["customers"],
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
					200: CustomerSchema,
					400: ErrorSchema,
					401: ErrorSchema,
					404: ErrorSchema,
					500: ErrorSchema,
				},
			},
		},
		async (request: FastifyRequest<any>, reply: FastifyReply) => {
			await controller.getCustomerByEmail(request, reply);
		}
	);

	fastify.post(
		"/customers",
		{
			schema: {
				description: "Add a new customer.",
				tags: ["customers"],
				body: CustomerInsertSchema,
				response: {
					201: CustomerMessageResponse,
					400: ErrorSchema,
					404: ErrorSchema,
					500: ErrorSchema,
				},
			},
		},
		async (request: FastifyRequest<any>, reply: FastifyReply) => {
			await controller.createCustomer(request, reply);
		}
	);

	fastify.put(
		"/customers",
		{
			preValidation: fastify.authenticate,
			schema: {
				description: "Updates customer data.",
				tags: ["customers"],
				body: CustomersUpdateSchema,
				response: {
					200: CustomerMessageResponse,
					400: ErrorSchema,
					401: ErrorSchema,
					404: ErrorSchema,
					500: ErrorSchema,
				},
			},
		},
		async (request: FastifyRequest<any>, reply: FastifyReply) => {
			await controller.updateCustomer(request, reply);
		}
	);

	fastify.delete(
		"/customers/:id",
		{
			preValidation: fastify.authenticate,
			schema: {
				description: "Removes a customer.",
				tags: ["customers"],
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
					200: CustomerMessageResponse,
					400: ErrorSchema,
					401: ErrorSchema,
					404: ErrorSchema,
					500: ErrorSchema,
				},
			},
		},
		async (request: FastifyRequest<any>, reply: FastifyReply) => {
			await controller.deleteCustomer(request, reply);
		}
	);
}
