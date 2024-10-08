import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import OrdersController from "../../api/controllers/orders/ordersController";
import { ErrorSchema } from "../../types/schemas/errorSchema";
import {
	OrderInsertSchema,
	OrderListPagination,
	OrderMessageResponse,
	OrderSchema,
	OrderUpdateCustomerSchema,
	OrderUpdateShopmanSchema,
	OrdersListSchema,
} from "../../types/schemas/ordersSchemas";

const controller = new OrdersController();

export async function ordersRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.get(
        "/orders/paginator/:storeId/:take/:page",
        {
            preValidation: fastify.authenticate,
            schema: {
                description: "Returns a list of orders by pagination. Enter the number of pages.",
                tags: ["orders"],
                params: {
                    type: "object",
                    required: ["storeId", "take", "page"],
                    properties: {
                        storeId: {
                            type: "string",
                        },
                        take: {
                            type: "string",
                        },
                        page: {
                            type: "string",
                        },
                    },
                },
                response: {
                    200: OrderListPagination,
                    400: ErrorSchema,
                    401: ErrorSchema,
                    404: ErrorSchema,
                    500: ErrorSchema,
                },
            },
        },
        async (request: FastifyRequest<any>, reply: FastifyReply) => {
            await controller.getOrdersByPagination(request, reply);
        }
    );

    fastify.get(
        "/orders/paginator/:customerId/:storeId/:take/:page",
        {
            preValidation: fastify.authenticate,
            schema: {
                description: "Returns a list of orders by pagination. Enter the number of pages.",
                tags: ["orders"],
                params: {
                    type: "object",
                    required: ["customerId", "storeId", "take", "page"],
                    properties: {
                        customerId: {
                            type: "string",
                        },
                        storeId: {
                            type: "string",
                        },
                        take: {
                            type: "string",
                        },
                        page: {
                            type: "string",
                        },
                    },
                },
                response: {
                    200: OrderListPagination,
                    400: ErrorSchema,
                    401: ErrorSchema,
                    404: ErrorSchema,
                    500: ErrorSchema,
                },
            },
        },
        async (request: FastifyRequest<any>, reply: FastifyReply) => {
            await controller.getAllOrdersByCustomer(request, reply);
        }
    );

    fastify.get(
        "/orders/byStore/all/:storeId",
        {
            preValidation: fastify.authenticate,
            schema: {
                description: "Returns a list of orders by store.",
                params: {
                    type: "object",
                    required: ["storeId"],
                    properties: {
                        storeId: {
                            type: "string",
                        },
                    },
                },
                tags: ["orders"],
                response: {
                    200: OrdersListSchema,
                    400: ErrorSchema,
                    401: ErrorSchema,
                    404: ErrorSchema,
                    500: ErrorSchema,
                },
            },
        },
        async (request: FastifyRequest<any>, reply: FastifyReply) => {
            await controller.getAllOrdersByStore(request, reply);
        }
    );

    fastify.get(
        "/orders/byId/:id",
        {
            preValidation: fastify.authenticate,
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
                    401: ErrorSchema,
                    404: ErrorSchema,
                    500: ErrorSchema,
                },
            },
        },
        async (request: FastifyRequest<any>, reply: FastifyReply) => {
            await controller.getOrderById(request, reply);
        }
    );

    fastify.get(
        "/orders/byStoreForStatus/:status/:storeId",
        {
            preValidation: fastify.authenticate,
            schema: {
                description: "Returns a list of orders via a specific status and store.",
                tags: ["orders"],
                params: {
                    type: "object",
                    required: ["status", "storeId"],
                    properties: {
                        status: {
                            type: "string",
                        },
                        storeId: {
                            type: "string",
                        },
                    },
                },
                response: {
                    200: OrdersListSchema,
                    400: ErrorSchema,
                    401: ErrorSchema,
                    404: ErrorSchema,
                    500: ErrorSchema,
                },
            },
        },
        async (request: FastifyRequest<any>, reply: FastifyReply) => {
            await controller.getOrdersByStoreForStatus(request, reply);
        }
    );

    fastify.get(
        "/orders/byCustomerForStatus/:status/:customerId/:storeId",
        {
            preValidation: fastify.authenticate,
            schema: {
                description: "Returns a list of orders via a specific status and customer.",
                tags: ["orders"],
                params: {
                    type: "object",
                    required: ["status", "storeId", "customerId"],
                    properties: {
                        status: {
                            type: "string",
                        },
                        storeId: {
                            type: "string",
                        },
                        customerId: {
                            type: "string",
                        },
                    },
                },
                response: {
                    200: OrdersListSchema,
                    400: ErrorSchema,
                    401: ErrorSchema,
                    404: ErrorSchema,
                    500: ErrorSchema,
                },
            },
        },
        async (request: FastifyRequest<any>, reply: FastifyReply) => {
            await controller.getOrdersByCustomerForStatus(request, reply);
        }
    );

    fastify.post(
        "/orders",
        {
            preValidation: fastify.authenticate,
            schema: {
                description: "Add a new order.",
                tags: ["orders"],
                body: OrderInsertSchema,
                response: {
                    200: OrderMessageResponse,
                    400: ErrorSchema,
                    401: ErrorSchema,
                    404: ErrorSchema,
                    500: ErrorSchema,
                },
            },
        },
        async (request: FastifyRequest<any>, reply: FastifyReply) => {
            await controller.createOrder(request, reply);
        }
    );

    fastify.put(
        "/orders/bycustomer",
        {
            preValidation: fastify.authenticate,
            schema: {
                description: "Route for customer order updates.",
                tags: ["orders"],
                body: OrderUpdateCustomerSchema,
                response: {
                    200: OrderMessageResponse,
                    400: ErrorSchema,
                    401: ErrorSchema,
                    404: ErrorSchema,
                    500: ErrorSchema,
                },
            },
        },
        async (request: FastifyRequest<any>, reply: FastifyReply) => {
            await controller.updateOrderByCustomer(request, reply);
        }
    );

    fastify.put(
        "/orders/byShopman",
        {
            preValidation: fastify.authenticate,
            schema: {
                description: "Route for shopman order updates.",
                tags: ["orders"],
                body: OrderUpdateShopmanSchema,
                response: {
                    200: OrderMessageResponse,
                    400: ErrorSchema,
                    401: ErrorSchema,
                    404: ErrorSchema,
                    500: ErrorSchema,
                },
            },
        },
        async (request: FastifyRequest<any>, reply: FastifyReply) => {
            await controller.updateOrderByShopman(request, reply);
        }
    );

    fastify.delete(
        "/orders/byCustomer/:id",
        {
            preValidation: fastify.authenticate,
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
                    401: ErrorSchema,
                    404: ErrorSchema,
                    500: ErrorSchema,
                },
            },
        },
        async (request: FastifyRequest<any>, reply: FastifyReply) => {
            await controller.deleteOrderByCustomer(request, reply);
        }
    );

    fastify.delete(
        "/orders/byShopman/:id",
        {
            preValidation: fastify.authenticate,
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
                    401: ErrorSchema,
                    404: ErrorSchema,
                    500: ErrorSchema,
                },
            },
        },
        async (request: FastifyRequest<any>, reply: FastifyReply) => {
            await controller.deleteOrderByShopman(request, reply);
        }
    );
}
