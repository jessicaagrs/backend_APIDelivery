import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ApiError } from "../../../error/apiError";
import OrdersService from "../../services/orders/ordersService";
import { validateStatusOrders } from "../../../utils/formatter";
import ProductsOrderService from "../../services/productsOrder/productsOrderService";

const service = new OrdersService();
const productsOrderService = new ProductsOrderService();

const productSchema = z.object({
	productId: z
		.string({
			required_error: "O id do produto é obrigatório",
			invalid_type_error: "O id do produto deve ser uma string",
		})
		.min(1, {
			message: "O id do produto não pode ser vazio",
		}),
	quantity: z
		.number({
			required_error: "A quantidade é obrigatória",
			invalid_type_error: "A quantidade deve ser um número",
		})
		.int()
		.positive({
			message: "A quantidade deve ser maior que 0",
		}),
});
const paramsSchema = z.object({
	id: z
		.string({
			required_error: "O id do pedido é obrigatório",
			invalid_type_error: "O id do pedido deve ser uma string",
		})
		.min(1, {
			message: "O id do pedido não pode ser vazio",
		}),
	status: z
		.string({
			required_error: "O status do pedido é obrigatório",
			invalid_type_error: "O status do pedido deve ser uma string",
		})
		.refine((value) => validateStatusOrders(value), {
			message: "O status do pedido está incorreto, por favor utilize Pendente, Cancelado, Em Andamento ou Concluido",
		}),
	shopmanId: z
		.string({
			required_error: "O id do vendedor é obrigatório",
			invalid_type_error: "O id do vendedor deve ser uma string",
		})
		.min(1, {
			message: "O id do vendedor não pode ser vazio",
		}),
	customerId: z
		.string({
			required_error: "O id do cliente é obrigatório",
			invalid_type_error: "O id do cliente deve ser uma string",
		})
		.min(1, {
			message: "O id do cliente não pode ser vazio",
		}),
	paymentMethodId: z
		.string({
			required_error: "O id do método de pagamento é obrigatório",
			invalid_type_error: "O id do método de pagamento deve ser uma string",
		})
		.min(1, {
			message: "O id do método de pagamento não pode ser vazio",
		}),
	value: z
		.number({
			required_error: "O valor do pedido é obrigatório",
			invalid_type_error: "O valor do pedido deve ser um número",
		})
		.positive({
			message: "O valor do pedido deve ser maior que 0",
		}),
	products: z.array(productSchema).nonempty({
		message: "O array de produtos não pode ser vazio",
	}),
});

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

	async getOrderById(request: FastifyRequest<{ Params: Partial<ParamsType> }>, reply: FastifyReply) {
		try {
			const id = paramsSchema.partial().parse(request.params).id;
			const order = await service.getOrderById(id);
			return reply.send(order);
		} catch (error: any) {
			const statusCode = reply.statusCode || 500;
			const err = new ApiError(statusCode, error.message);
			reply.status(err.statusCode).send(err);
		}
	}

	async getOrdersByStatus(request: FastifyRequest<{ Params: Partial<ParamsType> }>, reply: FastifyReply) {
		try {
			const status = paramsSchema.partial().parse(request.params).status;
			const order = await service.getOrdersByStatus(status);
			return reply.send(order);
		} catch (error: any) {
			const statusCode = reply.statusCode || 500;
			const err = new ApiError(statusCode, error.message);
			reply.status(err.statusCode).send(err);
		}
	}

	async createOrder(request: FastifyRequest<{ Params: Partial<ParamsType> }>, reply: FastifyReply) {
		try {
			const { customerId, paymentMethodId, value, products } = paramsSchema.partial().parse(request.body);
			await service.createOrder(customerId, paymentMethodId, value);
			await productsOrderService.createProductsOrder(products ?? []);
			return reply.status(201).send("Pedido criado com sucesso.");
		} catch (error: any) {
			const statusCode = reply.statusCode || 500;
			const err = new ApiError(statusCode, error.message);
			reply.status(err.statusCode).send(err);
		}
	}

	async updateOrderByCustomer(request: FastifyRequest<{ Params: Partial<ParamsType> }>, reply: FastifyReply) {
		try {
			const { id, paymentMethodId, status, value } = paramsSchema.partial().parse(request.body);
			await service.updateOrderByCustomer(id, paymentMethodId, status, value);
			return reply.status(200).send("Pedido atualizado com sucesso.");
		} catch (error: any) {
			const statusCode = reply.statusCode || 500;
			const err = new ApiError(statusCode, error.message);
			reply.status(err.statusCode).send(err);
		}
	}

	async updateOrderByShopman(request: FastifyRequest<{ Params: Partial<ParamsType> }>, reply: FastifyReply) {
		try {
			const { id, shopmanId, status } = paramsSchema.partial().parse(request.body);
			await service.updateOrderByShopman(id, shopmanId, status);
			return reply.status(200).send("Pedido atualizado com sucesso.");
		} catch (error: any) {
			const statusCode = reply.statusCode || 500;
			const err = new ApiError(statusCode, error.message);
			reply.status(err.statusCode).send(err);
		}
	}

	async deleteOrderByCustomer(
		request: FastifyRequest<{ Params: FastifyRequest<{ Params: Partial<ParamsType> }> }>,
		reply: FastifyReply
	) {
		try {
			const id = paramsSchema.partial().parse(request.params).id;
			await service.deleteOrderByCustomer(id);
			return reply.status(200).send("Pedido cancelado com sucesso.");
		} catch (error: any) {
			const statusCode = reply.statusCode || 500;
			const err = new ApiError(statusCode, error.message);
			reply.status(err.statusCode).send(err);
		}
	}

	async deleteOrderByShopman(
		request: FastifyRequest<{ Params: FastifyRequest<{ Params: Partial<ParamsType> }> }>,
		reply: FastifyReply
	) {
		try {
			const id = paramsSchema.partial().parse(request.params).id;
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
