import ShopmansService from "../../services/shopmans/shopmansService";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ApiError } from "../../../error/apiError";
import { validateRole } from "../../../utils/formatter";

const service = new ShopmansService();

const paramsSchema = z.object({
	id: z
		.string({
			required_error: "O id do vendedor é obrigatório",
			invalid_type_error: "O id do vendedor deve ser uma string",
		})
		.min(1, {
			message: "O id do vendedor não pode ser vazio",
		}),
	name: z
		.string({
			required_error: "O nome do vendedor é obrigatório",
			invalid_type_error: "O nome do vendedor deve ser uma string",
		})
		.min(10, {
			message: "O nome do vendedor deve ter no mínimo 10 caracteres",
		}),
	email: z
		.string({
			required_error: "O email do vendedor é obrigatório",
			invalid_type_error: "O email do vendedor deve ser uma string",
		})
		.email({
			message: "O email do vendedor deve ser em um formato de email válido",
		}),
	role: z
		.string({
			required_error: "O cargo do vendedor é obrigatório",
			invalid_type_error: "O cargo do vendedor deve ser uma string",
		})
		.refine((value) => validateRole(value), {
			message: "A permissão do vendedor deve ser um dos seguintes valores:'Admin' ou 'Usuario'",
		}),
});
type ParamsType = z.infer<typeof paramsSchema>;

class ShopmansController {
	async getAllShopmans(request: FastifyRequest, reply: FastifyReply) {
		try {
			const shopmans = await service.getAllShopmans();
			return reply.send(shopmans);
		} catch (error: any) {
			const statusCode = reply.statusCode || 500;
			const err = new ApiError(statusCode, error.message);
			reply.status(err.statusCode).send(err);
		}
	}

	async getShopmanByEmail(request: FastifyRequest<{ Params: Partial<ParamsType> }>, reply: FastifyReply) {
		try {
			const email = paramsSchema.partial().parse(request.params).email;
			const shopman = await service.getShopmanByEmail(email);
			return reply.send(shopman);
		} catch (error: any) {
			const statusCode = reply.statusCode || 500;
			const err = new ApiError(statusCode, error.message);
			reply.status(err.statusCode).send(err);
		}
	}

	async createShopman(request: FastifyRequest<{ Params: Partial<ParamsType> }>, reply: FastifyReply) {
		try {
			const { name, email, role } = paramsSchema.partial().parse(request.body);
			await service.createShopman(name, email, role);
			return reply.status(201).send("Lojista criado com sucesso.");
		} catch (error: any) {
			const statusCode = reply.statusCode || 500;
			const err = new ApiError(statusCode, error.message);
			reply.status(err.statusCode).send(err);
		}
	}

	async updateShopman(request: FastifyRequest<{ Params: Partial<ParamsType> }>, reply: FastifyReply) {
		try {
			const { id, name, email, role } = paramsSchema.partial().parse(request.body);
			await service.updateShopman(id, name, email, role);
			return reply.status(200).send("Lojista atualizado com sucesso.");
		} catch (error: any) {
			const statusCode = reply.statusCode || 500;
			const err = new ApiError(statusCode, error.message);
			reply.status(err.statusCode).send(err);
		}
	}

	async deleteShopman(request: FastifyRequest<{ Params: Partial<ParamsType> }>, reply: FastifyReply) {
		try {
			const id = paramsSchema.partial().parse(request.params).id;
			await service.deleteShopman(id);
			return reply.status(200).send(`Lojista [${id}] excluído com sucesso.`);
		} catch (error: any) {
			const statusCode = reply.statusCode || 500;
			const err = new ApiError(statusCode, error.message);
			reply.status(err.statusCode).send(err);
		}
	}
}

export default ShopmansController;
