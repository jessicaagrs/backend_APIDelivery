import ShopmansService from "../../services/shopmans/shopmansService";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ApiError } from "../../../error/apiError";

const service = new ShopmansService();

const paramsSchema = z.object({
	id: z.string().nullish(),
	name: z.string(),
	email: z.string().email(),
	role: z.string(),
});

const paramsIdSchema = z.string();

const paramsEmailSchema = z.string().email();

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

	async getShopmanByEmail(request: FastifyRequest<{ Params: ParamsType }>, reply: FastifyReply) {
		try {
			const email = paramsEmailSchema.parse(request.params.email);
			const shopman = await service.getShopmanByEmail(email);
			return reply.send(shopman);
		} catch (error: any) {
			const statusCode = reply.statusCode || 500;
			const err = new ApiError(statusCode, error.message);
			reply.status(err.statusCode).send(err);
		}
	}

	async createShopman(request: FastifyRequest, reply: FastifyReply) {
		try {
			const { name, email, role } = paramsSchema.parse(request.body);
			await service.createShopman(name, email, role);
			return reply.status(201).send("Lojista criado com sucesso.");
		} catch (error: any) {
			const statusCode = reply.statusCode || 500;
			const err = new ApiError(statusCode, error.message);
			reply.status(err.statusCode).send(err);
		}
	}

	async updateShopman(request: FastifyRequest, reply: FastifyReply) {
		try {
			const { id, name, email, role } = paramsSchema.parse(request.body);
			await service.updateShopman(id ?? "", name, email, role);
			return reply.status(200).send("Lojista atualizado com sucesso.");
		} catch (error: any) {
			const statusCode = reply.statusCode || 500;
			const err = new ApiError(statusCode, error.message);
			reply.status(err.statusCode).send(err);
		}
	}

	async deleteShopman(request: FastifyRequest<{ Params: ParamsType }>, reply: FastifyReply) {
		try {
			const id = paramsIdSchema.parse(request.params.id);
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
