import { FastifyReply, FastifyRequest } from "fastify";
import UsersService from "../../services/users/usersService";
import { User } from "../../../types/userInterface";

const SERVICE = new UsersService();

type ParamsType = {
	id?: string,
    email?: string,
};

class UsersController {
	async getAllUsers(request: FastifyRequest, reply: FastifyReply) {
		const users = await SERVICE.getAllUsers();

		return reply.send(users);
	}

	async getUser(request: FastifyRequest<{ Params: ParamsType }>, reply: FastifyReply) {
		const userEmail = request.params.email;

		const user = await SERVICE.getUser(userEmail ?? "");

		return reply.send(user);
	}

	async createUser(request: FastifyRequest, reply: FastifyReply) {
		const { name, email } = request.body as User;

		const user = await SERVICE.createUser(name, email);

		return reply.status(201).send(user);
	}

	async updateUser(request: FastifyRequest<{ Params: ParamsType }>, reply: FastifyReply) {
		const id = request.params.id;

		const { name, email } = request.body as User;

		const user = await SERVICE.updateUser(id ?? "", name, email);

		return reply.send(user);
	}

	async deleteUser(request: FastifyRequest<{ Params: ParamsType }>, reply: FastifyReply) {
		const id = request.params.id;

        await SERVICE.deleteUser(id ?? "");

        return reply.status(200).send(`Usuário ${id} deletado com sucesso.`);
	}
}

export default UsersController;
