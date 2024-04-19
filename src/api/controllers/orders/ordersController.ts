import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ApiError } from "../../../error/apiError";
import OrdersService from "../../services/orders/ordersService";

const service = new OrdersService();

const paramsSchema = z.object({
	id: z.string().nullish(),
    status: z.string().nullish(),
    shopmanId: z.string().nullish(),
    customerId: z.string().nullish(),
    paymentMethodId: z.string().nullable(),
    value: z.number().nullable(),
});

const paramsIdSchema = z.string();

type ParamsType = z.infer<typeof paramsSchema>;

class OrdersController {
	async getAllOrders(request: FastifyRequest, reply: FastifyReply) {
		try {
			const orders = await service.getAllOrders();
			return reply.send(orders);
		} catch (error: any) {
			const statusCode = reply.statusCode || 500;
			const err = new ApiError(statusCode, error.message);
			reply.status(err.statusCode).send(err);
		}
	}

	async getOrderById(request: FastifyRequest<{ Params: ParamsType }>, reply: FastifyReply) {
		try {
			const id = paramsIdSchema.parse(request.params.id);
			const order = await service.getOrderById(id);
			return reply.send(order);
		} catch (error: any) {
			const statusCode = reply.statusCode || 500;
			const err = new ApiError(statusCode, error.message);
			reply.status(err.statusCode).send(err);
		}
	}

	async getOrdersByStatus(request: FastifyRequest<{ Params: ParamsType }>, reply: FastifyReply) {
		try {
			const status = paramsIdSchema.parse(request.params.status);
			const order = await service.getOrdersByStatus(status);
			return reply.send(order);
		} catch (error: any) {
			const statusCode = reply.statusCode || 500;
			const err = new ApiError(statusCode, error.message);
			reply.status(err.statusCode).send(err);
		}
	}

    async createOrder(request: FastifyRequest, reply: FastifyReply) {
        try {
			const {customerId, paymentMethodId, value} = paramsSchema.parse(request.body);
			await service.createOrder(customerId ?? "", paymentMethodId ?? "", value ?? 0);
			return reply.status(201).send("Pedido criado com sucesso.");
		} catch (error: any) {
			const statusCode = reply.statusCode || 500;
			const err = new ApiError(statusCode, error.message);
			reply.status(err.statusCode).send(err);
		}
    }

    async updateOrderByCustomer(request: FastifyRequest, reply: FastifyReply) {
        try {
			const {id, shopmanId, paymentMethodId, status, value} = paramsSchema.parse(request.body);
			await service.updateOrderByCustomer(id ?? "", shopmanId ?? "", paymentMethodId ?? "", status ?? "", value ?? 0);
			return reply.status(200).send("Pedido atualizado com sucesso.");
		} catch (error: any) {
			const statusCode = reply.statusCode || 500;
			const err = new ApiError(statusCode, error.message);
			reply.status(err.statusCode).send(err);
		}
    }

    async updateOrderByShopman(request: FastifyRequest, reply: FastifyReply) {
        try {
			const {id, shopmanId, paymentMethodId, status, value} = paramsSchema.parse(request.body);
			await service.updateOrderByShopman(id ?? "", shopmanId ?? "", paymentMethodId ?? "", status ?? "", value ?? 0);
			return reply.status(200).send("Pedido atualizado com sucesso.");
		} catch (error: any) {
			const statusCode = reply.statusCode || 500;
			const err = new ApiError(statusCode, error.message);
			reply.status(err.statusCode).send(err);
		}
    }

    async deleteOrderByCustomer(request: FastifyRequest<{ Params: ParamsType }>, reply: FastifyReply) {
		try {
			const id = paramsIdSchema.parse(request.params.id);
			await service.deleteOrderByCustomer(id);
			return reply.status(200).send("Pedido cancelado com sucesso.");
		} catch (error: any) {
			const statusCode = reply.statusCode || 500;
			const err = new ApiError(statusCode, error.message);
			reply.status(err.statusCode).send(err);
		}
	}

    async deleteOrderByShopman(request: FastifyRequest<{ Params: ParamsType }>, reply: FastifyReply) {
		try {
			const id = paramsIdSchema.parse(request.params.id);
			await service.deleteOrderByShopman(id);
			return reply.status(200).send("Pedido cancelado com sucesso.");
		} catch (error: any) {
			const statusCode = reply.statusCode || 500;
			const err = new ApiError(statusCode, error.message);
			reply.status(err.statusCode).send(err);
		}
	}
}

export default OrdersController;
