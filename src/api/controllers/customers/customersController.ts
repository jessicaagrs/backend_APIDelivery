import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ApiError } from "../../../error/apiError";
import CustomersService from "../../services/customers/customersService";

const service = new CustomersService();
const paramsSchema = z.object({
	id: z.string({
		required_error: "O id do cliente é obrigatório",
		invalid_type_error: "O id do cliente deve ser uma string",
	}),
	name: z
		.string({
			required_error: "O nome do cliente é obrigatório",
			invalid_type_error: "O nome do cliente deve ser uma string",
		})
		.min(10, {
			message: "O nome do cliente deve ter no mínimo 10 caracteres",
		}),
	email: z
		.string({
			required_error: "O email do cliente é obrigatório",
		})
		.email({
			message: "O email do cliente deve ser em um formato de email válido",
		}),
});

type ParamsType = z.infer<typeof paramsSchema>;

class CustomersController {
	async getAllCustomers(request: FastifyRequest, reply: FastifyReply) {
		try {
			const customers = await service.getAllCustomers();
			return reply.send(customers);
		} catch (error: any) {
			const statusCode = reply.statusCode || 500;
			const err = new ApiError(statusCode, error.message);
			reply.status(err.statusCode).send(err);
		}
	}

	async getCustomerByEmail(request: FastifyRequest<{ Params: Partial<ParamsType> }>, reply: FastifyReply) {
		try {
			const email = paramsSchema.partial().parse(request.params).email;
			const customer = await service.getCustomerByEmail(email);
			return reply.send(customer);
		} catch (error: any) {
			const statusCode = reply.statusCode || 500;
			const err = new ApiError(statusCode, error.message);
			reply.status(err.statusCode).send(err);
		}
	}

	async createCustomer(request: FastifyRequest, reply: FastifyReply) {
		try {
			const { name, email } = paramsSchema.partial().parse(request.body);
			await service.createCustomer(name, email);
			return reply.status(201).send("Cliente criado com sucesso.");
		} catch (error: any) {
			const statusCode = reply.statusCode || 500;
			const err = new ApiError(statusCode, error.message);
			reply.status(err.statusCode).send(err);
		}
	}

	async updateCustomer(request: FastifyRequest<{ Params: ParamsType }>, reply: FastifyReply) {
		try {
			const { id, name, email } = paramsSchema.parse(request.body);
			await service.updateCustomer(id, name, email);
			return reply.send("Cliente atualizado com sucesso.");
		} catch (error: any) {
			const statusCode = reply.statusCode || 500;
			const err = new ApiError(statusCode, error.message);
			reply.status(err.statusCode).send(err);
		}
	}

	async deleteCustomer(request: FastifyRequest<{ Params: Partial<ParamsType> }>, reply: FastifyReply) {
		try {
			const id = paramsSchema.partial().parse(request.params).id;
			await service.deleteCustomer(id);
			return reply.status(200).send(`Cliente [${id}] deletado com sucesso.`);
		} catch (error: any) {
			const statusCode = reply.statusCode || 500;
			const err = new ApiError(statusCode, error.message);
			reply.status(err.statusCode).send(err);
		}
	}
}

export default CustomersController;
