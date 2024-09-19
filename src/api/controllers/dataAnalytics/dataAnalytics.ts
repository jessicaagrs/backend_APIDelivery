import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ApiError } from "../../../error/apiError";
import { validateDateByRequest } from "../../../utils/formatter";
import DataAnalyticsService from "../../services/dataAnalytics/dataAnalytics";

const service = new DataAnalyticsService();

const paramsSchema = z
    .object({
        storeId: z
            .string({
                required_error: "O id da loja é obrigatório",
                invalid_type_error: "O id da loja deve ser uma string",
            })
            .cuid({
                message: "O id deve ser um CUID",
            }),
        startDate: z
            .string({
                required_error: "A data de início é obrigatória",
            })
            .refine(date => validateDateByRequest(date) !== null, {
                message: "A data de início deve ser uma data válida",
            })
            .transform(date => validateDateByRequest(date) as Date),
        endDate: z
            .string({
                required_error: "A data de fim é obrigatória",
            })
            .refine(date => validateDateByRequest(date) !== null, {
                message: "A data de fim deve ser uma data válida",
            })
            .transform(date => validateDateByRequest(date) as Date),
    })
    .refine(data => data.startDate <= data.endDate, {
        message: "A data de início deve ser anterior ou igual à data de fim",
    });

type ParamsType = z.infer<typeof paramsSchema>;

class DataAnalyticsController {
    async getTotalOrdersFromPeriod(
        request: FastifyRequest<{ Params: Partial<ParamsType>; Querystring: Partial<ParamsType> }>,
        reply: FastifyReply
    ) {
        const queryParams = {
            storeId: request.params.storeId,
            startDate: request.query.startDate,
            endDate: request.query.endDate,
        };

        try {

            const validation = paramsSchema.safeParse(queryParams);

            if(!validation.success){
                throw new Error(validation.error.errors[0].message);
            }

            const result = await service.getTotalOrdersFromPeriod(
                queryParams.storeId,
                queryParams.startDate,
                queryParams.endDate
            );
            reply.send(result);
        } catch (error: any) {
            const statusCode = reply.statusCode || 500;
            const err = new ApiError(statusCode, error.message);
            reply.status(err.statusCode).send(err);
        }
    }
}

export default DataAnalyticsController;
