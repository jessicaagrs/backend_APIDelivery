import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ApiError } from "../../../error/apiError";
import PaymentsMethodsService from "../../services/paymentsMethods/paymentsMethodsService";

const service = new PaymentsMethodsService();

const paramsSchema = z.object({
	id: z.string().nullish(),
	description: z.string(),
});

const paramsDescriptionSchema = z.object({
	description: z.string(),
});

const paramsIdSchema = z.string();

type ParamsType = z.infer<typeof paramsSchema>;

class PaymentsMethodsController {
	async getAllPaymentsMethods(request: FastifyRequest, reply: FastifyReply) {
		try {
			const paymentsMethods = await service.getAllPaymentsMethods();
			return reply.send(paymentsMethods);
		} catch (error: any) {
			const statusCode = reply.statusCode || 500;
			const err = new ApiError(statusCode, error.message);
			reply.status(err.statusCode).send(err);
		}
	}

	async createPaymentMethod(request: FastifyRequest, reply: FastifyReply) {
		try {
			const { description } = paramsDescriptionSchema.parse(request.body);
			await service.createPaymentMethod(description);
			return reply.status(201).send("Forma de pagamento criada com sucesso.");
		} catch (error: any) {
			const statusCode = reply.statusCode || 500;
			const err = new ApiError(statusCode, error.message);
			reply.status(err.statusCode).send(err);
		}
	}

	async updatePaymentMethod(request: FastifyRequest<{ Params: ParamsType }>, reply: FastifyReply) {
		try {
			const { id, description } = paramsSchema.parse(request.body);
			await service.updatePaymentMethod(description, id ?? "");
			return reply.status(200).send("Forma de pagamento atualizada com sucesso.");
		} catch (error: any) {
			const statusCode = reply.statusCode || 500;
			const err = new ApiError(statusCode, error.message);
			reply.status(err.statusCode).send(err);
		}
	}

	async deletePaymentMethod(request: FastifyRequest<{ Params: ParamsType }>, reply: FastifyReply) {
		try {
			const id = paramsIdSchema.parse(request.params.id);
			await service.deletePaymentMethod(id);
			return reply.status(200).send(`Forma de pagamento [${id}] excluída com sucesso.`);
		} catch (error: any) {
			const statusCode = reply.statusCode || 500;
			const err = new ApiError(statusCode, error.message);
			reply.status(err.statusCode).send(err);
		}
	}
}

export default PaymentsMethodsController;
