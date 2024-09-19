import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import DataAnalyticsController from "../../api/controllers/dataAnalytics/dataAnalytics";
import {
    DataAnalyticsNewCustomersSchema,
    DataAnalyticsOrdersByMonthSchema,
    DataAnalyticsOrdersByStatusSchema,
    DataAnalyticsShopmansSchema,
} from "../../types/schemas/dataAnalyticsSchema";
import { ErrorSchema } from "../../types/schemas/errorSchema";

const controller = new DataAnalyticsController();

export default async function dataAnalyticsRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.get(
        "/dataAnalytics/totalOrdersByMonth/:storeId",
        {
            preValidation: fastify.authenticate,
            schema: {
                description: "Returns the total value of orders within a period.",
                tags: ["dataAnalytics"],
                params: {
                    type: "object",
                    properties: {
                        storeId: { type: "string" },
                    },
                },
                querystring: {
                    type: "object",
                    properties: {
                        startDate: { type: "string" },
                        endDate: { type: "string" },
                    },
                },
                response: {
                    200: DataAnalyticsOrdersByMonthSchema,
                    400: ErrorSchema,
                    401: ErrorSchema,
                    404: ErrorSchema,
                    500: ErrorSchema,
                },
            },
        },
        async (request: FastifyRequest<any>, reply: FastifyReply) => {
            await controller.getOrdersSummaryByPeriod(request, reply);
        }
    );

    fastify.get(
        "/dataAnalytics/totalOrdersByStatusByMonth/:storeId",
        {
            preValidation: fastify.authenticate,
            schema: {
                description: "Returns the total value by status of orders within a period.",
                tags: ["dataAnalytics"],
                params: {
                    type: "object",
                    properties: {
                        storeId: { type: "string" },
                    },
                },
                querystring: {
                    type: "object",
                    properties: {
                        startDate: { type: "string" },
                        endDate: { type: "string" },
                    },
                },
                response: {
                    200: DataAnalyticsOrdersByStatusSchema,
                    400: ErrorSchema,
                    401: ErrorSchema,
                    404: ErrorSchema,
                    500: ErrorSchema,
                },
            },
        },
        async (request: FastifyRequest<any>, reply: FastifyReply) => {
            await controller.getOrdersByStatusByPeriod(request, reply);
        }
    );

    fastify.get(
        "/dataAnalytics/totalNewCustomersByMonth/:storeId",
        {
            preValidation: fastify.authenticate,
            schema: {
                description: "Returns the total of new customers within a period.",
                tags: ["dataAnalytics"],
                params: {
                    type: "object",
                    properties: {
                        storeId: { type: "string" },
                    },
                },
                querystring: {
                    type: "object",
                    properties: {
                        startDate: { type: "string" },
                        endDate: { type: "string" },
                    },
                },
                response: {
                    200: DataAnalyticsNewCustomersSchema,
                    400: ErrorSchema,
                    401: ErrorSchema,
                    404: ErrorSchema,
                    500: ErrorSchema,
                },
            },
        },
        async (request: FastifyRequest<any>, reply: FastifyReply) => {
            await controller.getNewCustomersInStore(request, reply);
        }
    );

    fastify.get(
        "/dataAnalytics/totalSalesByShopmans/:storeId",
        {
            preValidation: fastify.authenticate,
            schema: {
                description: "Returns the total of sales by shopman within a period.",
                tags: ["dataAnalytics"],
                params: {
                    type: "object",
                    properties: {
                        storeId: { type: "string" },
                    },
                },
                querystring: {
                    type: "object",
                    properties: {
                        startDate: { type: "string" },
                        endDate: { type: "string" },
                    },
                },
                response: {
                    200: DataAnalyticsShopmansSchema,
                    400: ErrorSchema,
                    401: ErrorSchema,
                    404: ErrorSchema,
                    500: ErrorSchema,
                },
            },
        },
        async (request: FastifyRequest<any>, reply: FastifyReply) => {
            await controller.getShopmansByOrders(request, reply);
        }
    );
}
