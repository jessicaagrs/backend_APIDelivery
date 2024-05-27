import { FastifyInstance, FastifyPluginOptions } from "fastify";
import PaymentsMethodsController from "../../api/controllers/paymentsMethods/paymentsMethodsController";
import {
	PaymentMethodSchema,
	paymentMethodInsertSchema,
	paymentMethodListSchema,
	paymentMethodMessageResponse,
} from "../../types/schemas/paymentMethodSchema";
import { ErrorSchema } from "../../types/schemas/errorSchema";

const controller = new PaymentsMethodsController();

export async function paymentsMethodsRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
	fastify.get(
		"/paymentsmethods",
		{
			schema: {
				description: "Returns a list of payment methods.",
				tags: ["payments methods"],
				response: {
					200: paymentMethodListSchema,
					400: ErrorSchema,
					500: ErrorSchema,
				},
			},
		},
		controller.getAllPaymentsMethods
	);

	fastify.post(
		"/paymentsmethods",
		{
			schema: {
				description: "Add a new payment method.",
				tags: ["payments methods"],
				body: paymentMethodInsertSchema,
				response: {
					201: paymentMethodMessageResponse,
					400: ErrorSchema,
					500: ErrorSchema,
				},
			},
		},
		controller.createPaymentMethod
	);

	fastify.put(
		"/paymentsmethods",
		{
			schema: {
				description: "Updates payment method data.",
				tags: ["payments methods"],
				body: PaymentMethodSchema,
				response: {
					200: paymentMethodMessageResponse,
					400: ErrorSchema,
					500: ErrorSchema,
				},
			},
		},
		controller.updatePaymentMethod
	);

	fastify.delete(
		"/paymentsmethods/:id",
		{
			schema: {
				description: "Removes a payment methods.",
				tags: ["payments methods"],
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
					200: paymentMethodMessageResponse,
					400: ErrorSchema,
					500: ErrorSchema,
				},
			},
		},
		controller.deletePaymentMethod
	);
}
