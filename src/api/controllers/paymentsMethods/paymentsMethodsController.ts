import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ApiError } from "../../../error/apiError";
import PaymentsMethodsService from "../../services/paymentsMethods/paymentsMethodsService";

const service = new PaymentsMethodsService();

const paramsSchema = z.object({
	id: z
		.string({
			required_error: "O id do método de pagamento é obrigatório",
			invalid_type_error: "O id do método de pagamento deve ser uma string",
		})
		.min(1, {
			message: "O id do método de pagamento não pode ser vazio",
		}),
	description: z
		.string({
			required_error: "A descrição do método de pagamento é obrigatório",
			invalid_type_error: "A descrição do método de pagamento deve ser uma string",
		})
		.min(5, {
			message: "A descrição do  método de pagamento deve ter pelo menos 5 caracteres",
		}),
	storeId: z.string({
		required_error: "O id da loja é obrigatório",
		invalid_type_error: "O id da loja deve ser uma string",
	}),
});

type ParamsType = z.infer<typeof paramsSchema>;

class PaymentsMethodsController {
	async getAllPaymentsMethods(request: FastifyRequest, reply: FastifyReply) {
		try {
			const storeId = paramsSchema.partial().parse(request.params).storeId;
			const paymentsMethods = await service.getAllPaymentsMethods(storeId);
			return reply.send(paymentsMethods);
		} catch (error: any) {
			const statusCode = reply.statusCode || 500;
			const err = new ApiError(statusCode, error.message);
			reply.status(err.statusCode).send(err);
		}
	}

	async createPaymentMethod(request: FastifyRequest<{ Params: Partial<ParamsType> }>, reply: FastifyReply) {
		try {
			const { description, storeId } = paramsSchema.partial().parse(request.body);
			await service.createPaymentMethod(description, storeId);
			return reply.status(201).send("Forma de pagamento criada com sucesso.");
		} catch (error: any) {
			const statusCode = reply.statusCode || 500;
			const err = new ApiError(statusCode, error.message);
			reply.status(err.statusCode).send(err);
		}
	}

	async updatePaymentMethod(request: FastifyRequest<{ Params: Partial<ParamsType> }>, reply: FastifyReply) {
		try {
			const { id, description, storeId } = paramsSchema.partial().parse(request.body);
			await service.updatePaymentMethod(description, id, storeId);
			return reply.status(200).send("Forma de pagamento atualizada com sucesso.");
		} catch (error: any) {
			const statusCode = reply.statusCode || 500;
			const err = new ApiError(statusCode, error.message);
			reply.status(err.statusCode).send(err);
		}
	}

	async deletePaymentMethod(request: FastifyRequest<{ Params: Partial<ParamsType> }>, reply: FastifyReply) {
		try {
			const id = paramsSchema.partial().parse(request.params).id;
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
