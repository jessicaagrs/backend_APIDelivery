import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import PaymentsMethodsController from "../../api/controllers/paymentsMethods/paymentsMethodsController";
import {
	PaymentMethodSchema,
	paymentMethodInsertSchema,
	paymentMethodListSchema,
	paymentMethodMessageResponse,
	paymentMethodUpdateSchema,
} from "../../types/schemas/paymentMethodSchema";
import { ErrorSchema } from "../../types/schemas/errorSchema";

const controller = new PaymentsMethodsController();

export async function paymentsMethodsRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
	fastify.get(
		"/paymentsmethods/:storeId",
		{
			preValidation: fastify.authenticate,
			schema: {
				description:
					"Returns a list of payment methods. If the store has not yet registered, the default payment methods will be generated the first time.",
				tags: ["payments methods"],
				params: {
					type: "object",
					required: ["storeId"],
					properties: {
						storeId: {
							type: "string",
						},
					},
				},
				response: {
					200: paymentMethodListSchema,
					400: ErrorSchema,
					401: ErrorSchema,
					404: ErrorSchema,
					500: ErrorSchema,
				},
			},
		},
		async (request: FastifyRequest<any>, reply: FastifyReply) => {
			await controller.getAllPaymentsMethods(request, reply);
		}
	);

	fastify.post(
		"/paymentsmethods",
		{
			preValidation: fastify.authenticate,
			schema: {
				description: "Add a new payment method.",
				tags: ["payments methods"],
				body: paymentMethodInsertSchema,
				response: {
					201: paymentMethodMessageResponse,
					400: ErrorSchema,
					401: ErrorSchema,
					404: ErrorSchema,
					500: ErrorSchema,
				},
			},
		},
		async (request: FastifyRequest<any>, reply: FastifyReply) => {
			await controller.createPaymentMethod(request, reply);
		}
	);

	fastify.put(
		"/paymentsmethods",
		{
			preValidation: fastify.authenticate,
			schema: {
				description: "Updates payment method data.",
				tags: ["payments methods"],
				body: paymentMethodUpdateSchema,
				response: {
					200: paymentMethodMessageResponse,
					400: ErrorSchema,
					401: ErrorSchema,
					404: ErrorSchema,
					500: ErrorSchema,
				},
			},
		},
		async (request: FastifyRequest<any>, reply: FastifyReply) => {
			await controller.updatePaymentMethod(request, reply);
		}
	);

	fastify.delete(
		"/paymentsmethods/:id",
		{
			preValidation: fastify.authenticate,
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
					401: ErrorSchema,
					404: ErrorSchema,
					500: ErrorSchema,
				},
			},
		},
		async (request: FastifyRequest<any>, reply: FastifyReply) => {
			await controller.deletePaymentMethod(request, reply);
		}
	);
}
