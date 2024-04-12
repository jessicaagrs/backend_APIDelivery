import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ApiError } from "../../../error/apiError";
import CustomersService from "../../services/customers/customersService";

const service = new CustomersService();
const paramsSchema = z.object({
	id: z.string().nullish(),
	name: z.string(),
	email: z.string().email(),
});

const paramsIdSchema = z.string();

const paramsEmailSchema = z.string().email();

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

	async getCustomerByEmail(request: FastifyRequest<{ Params: ParamsType }>, reply: FastifyReply) {
		try {
			const customerEmail = paramsEmailSchema.parse(request.params.email);
			const customer = await service.getCustomerByEmail(customerEmail);

			return reply.send(customer);
		} catch (error: any) {
			const statusCode = reply.statusCode || 500;
			const err = new ApiError(statusCode, error.message);
			reply.status(err.statusCode).send(err);
		}
	}

	async createCustomer(request: FastifyRequest, reply: FastifyReply) {
		try {
			const { name, email } = paramsSchema.parse(request.body);
			await service.createCustomer(name, email);

			reply.status(201).send("Cliente criado com sucesso.");
		} catch (error: any) {
			const statusCode = reply.statusCode || 500;
			const err = new ApiError(statusCode, error.message);
			reply.status(err.statusCode).send(err);
		}
	}

	async updateCustomer(request: FastifyRequest<{ Params: ParamsType }>, reply: FastifyReply) {
		try {
			const id = paramsIdSchema.parse(request.params.id);
			const { name, email } = paramsSchema.parse(request.body);
			await service.updateCustomer(id, name, email);

			return reply.send("Cliente atualizado com sucesso.");
		} catch (error: any) {
			const statusCode = reply.statusCode || 500;
			const err = new ApiError(statusCode, error.message);
			reply.status(err.statusCode).send(err);
		}
	}

	async deleteCustomer(request: FastifyRequest<{ Params: ParamsType }>, reply: FastifyReply) {
		try {
			const id = paramsIdSchema.parse(request.params.id);
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
