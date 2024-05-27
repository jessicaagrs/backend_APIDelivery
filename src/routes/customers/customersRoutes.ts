import { FastifyInstance, FastifyPluginOptions } from "fastify";
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
		"/customers",
		{
			schema: {
				description: "Returns a list of customers.",
				tags: ["customers"],
				response: {
					200: CustomersListSchema,
					400: ErrorSchema,
					500: ErrorSchema,
				},
			},
		},
		controller.getAllCustomers
	);

	fastify.get(
		"/customers/:email",
		{
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
					500: ErrorSchema,
				},
			},
		},
		controller.getCustomerByEmail
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
					500: ErrorSchema,
				},
			},
		},
		controller.createCustomer
	);

	fastify.put(
		"/customers",
		{
			schema: {
				description: "Updates customer data.",
				tags: ["customers"],
				body: CustomersUpdateSchema,
				response: {
					200: CustomerMessageResponse,
					400: ErrorSchema,
					500: ErrorSchema,
				},
			},
		},
		controller.updateCustomer
	);

	fastify.delete(
		"/customers/:id",
		{
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
					500: ErrorSchema,
				},
			},
		},
		controller.deleteCustomer
	);
}
