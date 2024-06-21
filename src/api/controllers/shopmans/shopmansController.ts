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
		.cuid({
			message: "O id deve ser um CUID",
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
	status: z.boolean({
		required_error: "O status do vendedor é obrigatório",
		invalid_type_error: "O cargo do vendedor deve ser false ou true",
	}),
	password: z
		.string({
			required_error: "A senha é obrigatória",
			invalid_type_error: "A senha do cliente deve ser uma string",
		})
		.min(8, {
			message: "A senha deve ter no mínimo 8 caracteres",
		}),
	storeId: z
		.string({
			required_error: "O id da loja é obrigatório",
			invalid_type_error: "O id da loja deve ser uma string",
		})
		.cuid({
			message: "O id da loja deve ser um CUID",
		}),
	take: z
		.string()
		.transform(Number)
		.refine((value) => value > 0, {
			message: "O número de registros  deve ser maior que 0",
		}),
	skip: z.string().transform(Number),
});
type ParamsType = z.infer<typeof paramsSchema>;

class ShopmansController {
	async getAllShopmans(request: FastifyRequest, reply: FastifyReply) {
		try {
			const storeId = paramsSchema.partial().parse(request.params).storeId;
			const shopmans = await service.getAllShopmans(storeId);
			return reply.send(shopmans);
		} catch (error: any) {
			const statusCode = reply.statusCode || 500;
			const err = new ApiError(statusCode, error.message);
			reply.status(err.statusCode).send(err);
		}
	}

	async getShopmansByPagination(request: FastifyRequest, reply: FastifyReply) {
		try {
			const { take, skip, storeId } = paramsSchema.partial().parse(request.params);
			const shopmans = await service.getShopmansByPagination(take, skip, storeId);
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
			const { name, email, role, password, storeId } = paramsSchema.partial().parse(request.body);
			await service.createShopman(name, email, role, password, storeId);
			return reply.status(201).send("Vendedor criado com sucesso.");
		} catch (error: any) {
			const statusCode = reply.statusCode || 500;
			const err = new ApiError(statusCode, error.message);
			reply.status(err.statusCode).send(err);
		}
	}

	async updateShopman(request: FastifyRequest<{ Params: Partial<ParamsType> }>, reply: FastifyReply) {
		try {
			const { id, name, email, password } = paramsSchema.partial().parse(request.body);
			await service.updateShopman(id, name, email, password);
			return reply.status(200).send("Vendedor atualizado com sucesso.");
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
			return reply.status(200).send(`Vendedor [${id}] excluído com sucesso.`);
		} catch (error: any) {
			const statusCode = reply.statusCode || 500;
			const err = new ApiError(statusCode, error.message);
			reply.status(err.statusCode).send(err);
		}
	}
}

export default ShopmansController;
