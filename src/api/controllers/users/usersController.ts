import { FastifyReply, FastifyRequest } from "fastify";
import UsersService from "../../services/users/usersService";
import { z } from "zod";
import { ApiError } from "../../../error/apiError";

const service = new UsersService();
const paramsSchema = z.object({
	id: z.string().nullish(),
	name: z.string().nullable(),
	email: z.string().email().nullable(),
});

const paramsIdSchema = z.string();

const paramsEmailSchema = z.string().email();

type ParamsType = z.infer<typeof paramsSchema>;

class UsersController {
	async getAllUsers(request: FastifyRequest, reply: FastifyReply) {
		try {
			const users = await service.getAllUsers();
			return reply.send(users);
		} catch (error : any) {
			const statusCode = reply.statusCode || 500; 
			const err = new ApiError(statusCode, error.message);
			reply.status(err.statusCode).send(err);
		}
	}

	async getUserByEmail(request: FastifyRequest<{ Params: ParamsType }>, reply: FastifyReply) {
		try {
			const userEmail = paramsEmailSchema.parse(request.params.email);
			const user = await service.getUserByEmail(userEmail);
	
			return reply.send(user);

		} catch (error : any) {
			const statusCode = reply.statusCode || 500; 
			const err = new ApiError(statusCode, error.message);
			reply.status(err.statusCode).send(err);
		}
	}

	async createUser(request: FastifyRequest, reply: FastifyReply) {
		try {
			const { name, email } = paramsSchema.parse(request.body);
			const user = await service.createUser(name ?? "", email ?? "");
	
			return reply.status(201).send(user);
		} catch (error : any) {
			const statusCode = reply.statusCode || 500; 
			const err = new ApiError(statusCode, error.message);
			reply.status(err.statusCode).send(err);
		}
	}

	async updateUser(request: FastifyRequest<{ Params: ParamsType }>, reply: FastifyReply) {
		try {
			const id = paramsIdSchema.parse(request.params.id);
			const { name, email } = paramsSchema.parse(request.body);
			const user = await service.updateUser(id, name ?? "", email ?? "");
	
			return reply.send(user);
		} catch (error : any) {
			const statusCode = reply.statusCode || 500; 
			const err = new ApiError(statusCode, error.message);
			reply.status(err.statusCode).send(err);
		}
	}

	async deleteUser(request: FastifyRequest<{ Params: ParamsType }>, reply: FastifyReply) {
		try {
			const id = paramsIdSchema.parse(request.params.id);
			await service.deleteUser(id);
	
			return reply.status(200).send(`Usuário ${id} deletado com sucesso.`);
		} catch (error : any) {
			const statusCode = reply.statusCode || 500; 
			const err = new ApiError(statusCode, error.message);
			reply.status(err.statusCode).send(err);
		}
	}
}

export default UsersController;
