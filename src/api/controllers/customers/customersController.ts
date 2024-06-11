import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ApiError } from "../../../error/apiError";
import CustomersService from "../../services/customers/customersService";

const service = new CustomersService();
const paramsSchema = z.object({
	id: z
		.string({
			required_error: "O id do cliente é obrigatório",
			invalid_type_error: "O id do cliente deve ser uma string",
		})
		.cuid({
			message: "O id deve ser um CUID",
		}),
	name: z
		.string({
			required_error: "O nome do cliente é obrigatório",
			invalid_type_error: "O nome do cliente deve ser uma string",
		})
		.min(10, {
			message: "O nome do cliente deve ter no mínimo 10 caracteres",
		}),
	password: z
		.string({
			required_error: "A senha é obrigatória",
			invalid_type_error: "A senha do cliente deve ser uma string",
		})
		.min(8, {
			message: "A senha deve ter no mínimo 8 caracteres",
		}),
	phone: z
		.string({
			required_error: "O telefone é obrigatório",
			invalid_type_error: "O telefone deve ser uma string",
		})
		.min(10, {
			message: "O telefone deve ter no mínimo 10 caracteres, considerando o DD",
		}),
	email: z
		.string({
			required_error: "O email do cliente é obrigatório",
		})
		.email({
			message: "O email do cliente deve ser em um formato de email válido",
		}),
	status: z.boolean({
		required_error: "O status do cliente é obrigatório",
		invalid_type_error: "O cargo do vendedor deve ser false ou true",
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
			const { name, email, password, phone } = paramsSchema.partial().parse(request.body);
			await service.createCustomer({ name, email, password, phone });
			return reply.status(201).send("Cliente criado com sucesso.");
		} catch (error: any) {
			const statusCode = reply.statusCode || 500;
			const err = new ApiError(statusCode, error.message);
			reply.status(err.statusCode).send(err);
		}
	}

	async updateCustomer(request: FastifyRequest<{ Params: ParamsType }>, reply: FastifyReply) {
		try {
			const { id, name, email, password, phone } = paramsSchema.partial().parse(request.body);
			await service.updateCustomer({ id, name, email, password, phone });
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
			return reply.status(200).send(`Cliente [${id}] removido com sucesso.`);
		} catch (error: any) {
			const statusCode = reply.statusCode || 500;
			const err = new ApiError(statusCode, error.message);
			reply.status(err.statusCode).send(err);
		}
	}
}

export default CustomersController;
