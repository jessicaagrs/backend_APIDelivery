import { FastifyInstance, FastifyPluginOptions } from "fastify";
import OrdersController from "../../api/controllers/orders/ordersController";
import { ErrorSchema } from "../../types/schemas/errorSchema";
import {
	OrderSchema,
	OrderInsertSchema,
	OrderUpdateShopmanSchema,
	OrderUpdateCustomerSchema,
	OrdersListSchema,
	OrderMessageResponse,
} from "../../types/schemas/ordersSchemas";

const controller = new OrdersController();

export async function ordersRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
	fastify.get(
		"/orders",
		{
			schema: {
				description: "Returns a list of orders.",
				tags: ["orders"],
				response: {
					200: OrdersListSchema,
					400: ErrorSchema,
					500: ErrorSchema,
				},
			},
		},
		controller.getAllOrders
	);

	fastify.get(
		"/orders/byId/:id",
		{
			schema: {
				description: "Returns a order via a specific id.",
				tags: ["orders"],
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
					200: OrderSchema,
					400: ErrorSchema,
					500: ErrorSchema,
				},
			},
		},
		controller.getOrderById
	);

	fastify.get(
		"/orders/byStatus/:status",
		{
			schema: {
				description: "Returns a list of orders via a specific status.",
				tags: ["orders"],
				params: {
					type: "object",
					required: ["status"],
					properties: {
						status: {
							type: "string",
						},
					},
				},
				response: {
					200: OrdersListSchema,
					400: ErrorSchema,
					500: ErrorSchema,
				},
			},
		},
		controller.getOrdersByStatus
	);

	fastify.post(
		"/orders",
		{
			schema: {
				description: "Add a new order.",
				tags: ["orders"],
				body: OrderInsertSchema,
				response: {
					200: OrderMessageResponse,
					400: ErrorSchema,
					500: ErrorSchema,
				},
			},
		},
		controller.createOrder
	);

	fastify.put(
		"/orders/bycustomer",
		{
			schema: {
				description: "Route for customer order updates.",
				tags: ["orders"],
				body: OrderUpdateCustomerSchema,
				response: {
					200: OrderMessageResponse,
					400: ErrorSchema,
					500: ErrorSchema,
				},
			},
		},
		controller.updateOrderByCustomer
	);

	fastify.put(
		"/orders/byShopman",
		{
			schema: {
				description: "Route for shopman order updates.",
				tags: ["orders"],
				body: OrderUpdateShopmanSchema,
				response: {
					200: OrderMessageResponse,
					400: ErrorSchema,
					500: ErrorSchema,
				},
			},
		},
		controller.updateOrderByShopman
	);

	fastify.delete(
		"/orders/byCustomer/:id",
		{
			schema: {
				description: "Route to remove order by customer.",
				tags: ["orders"],
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
					200: OrderMessageResponse,
					400: ErrorSchema,
					500: ErrorSchema,
				},
			},
		},
		controller.deleteOrderByCustomer
	);

	fastify.delete(
		"/orders/byShopman/:id",
		{
			schema: {
				description: "Route to remove order by shopman.",
				tags: ["orders"],
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
					200: OrderMessageResponse,
					400: ErrorSchema,
					500: ErrorSchema,
				},
			},
		},
		controller.deleteOrderByShopman
	);
}
