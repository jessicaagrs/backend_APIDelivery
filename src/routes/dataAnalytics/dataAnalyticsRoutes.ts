import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import DataAnalyticsController from "../../api/controllers/dataAnalytics/dataAnalytics";
import { ErrorSchema } from "../../types/schemas/errorSchema";
import { DataAnalyticsSchema } from "../../types/schemas/dataAnalyticsSchema";

const controller = new DataAnalyticsController();

export default async function dataAnalyticsRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.get(
        "/dataAnalytics/totalOrdersByMonth/:storeId",
        {
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
                    200: DataAnalyticsSchema,
                    400: ErrorSchema,
                    401: ErrorSchema,
                    404: ErrorSchema,
                    500: ErrorSchema,
                },
            },
        },
        async (request: FastifyRequest<any>, reply: FastifyReply) => {
            await controller.getTotalOrdersFromPeriod(request, reply);
        }
    );
}