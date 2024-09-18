import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ApiError } from "../../../error/apiError";
import { validateStatusOrders } from "../../../utils/formatter";
import OrdersService from "../../services/orders/ordersService";

const service = new OrdersService();
const productSchema = z.object({
    productId: z
        .string({
            required_error: "O id do produto é obrigatório",
            invalid_type_error: "O id do produto deve ser uma string",
        })
        .cuid({
            message: "O id do produto deve ser um CUID",
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
        .cuid({
            message: "O id deve ser um CUID",
        }),
    status: z
        .string({
            required_error: "O status do pedido é obrigatório",
            invalid_type_error: "O status do pedido deve ser uma string",
        })
        .refine(value => validateStatusOrders(value), {
            message:
                "O status do pedido está incorreto, por favor utilize Pendente, Cancelado, Em Andamento ou Concluido",
        }),
    shopmanId: z
        .string({
            required_error: "O id do vendedor é obrigatório",
            invalid_type_error: "O id do vendedor deve ser uma string",
        })
        .cuid({
            message: "O id do vendedor deve ser um CUID",
        }),
    customerId: z
        .string({
            required_error: "O id do cliente é obrigatório",
            invalid_type_error: "O id do cliente deve ser uma string",
        })
        .cuid({
            message: "O id do cliente deve ser um CUID",
        }),
    paymentMethodId: z
        .string({
            required_error: "O id do método de pagamento é obrigatório",
            invalid_type_error: "O id do método de pagamento deve ser uma string",
        })
        .cuid({
            message: "O id da forma de pagamento deve ser um CUID",
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
        .refine(value => value > 0, {
            message: "O número de registros  deve ser maior que 0",
        }),
    page: z.string().transform(Number),
});

type ParamsType = z.infer<typeof paramsSchema>;

class OrdersController {
    async getAllOrdersByStore(request: FastifyRequest, reply: FastifyReply) {
        try {
            const storeId = paramsSchema.partial().parse(request.params).storeId;
            const orders = await service.getAllOrdersByStore(storeId);
            return reply.send(orders);
        } catch (error: any) {
            const statusCode = reply.statusCode || 500;
            const err = new ApiError(statusCode, error.message);
            reply.status(err.statusCode).send(err);
        }
    }

    async getOrdersByPagination(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { storeId, take, page } = paramsSchema.partial().parse(request.params);
            const orders = await service.getOrdersByPagination(storeId, take, page);
            return reply.send(orders);
        } catch (error: any) {
            const statusCode = reply.statusCode || 500;
            const err = new ApiError(statusCode, error.message);
            reply.status(err.statusCode).send(err);
        }
    }

    async getAllOrdersByCustomer(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { storeId, customerId } = paramsSchema.partial().parse(request.params);
            const orders = await service.getAllOrdersByCustomer(storeId, customerId);
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

    async getOrdersByStoreForStatus(request: FastifyRequest<{ Params: Partial<ParamsType> }>, reply: FastifyReply) {
        try {
            const { status, storeId } = paramsSchema.partial().parse(request.params);
            const order = await service.getOrdersByStoreForStatus(status, storeId);
            return reply.send(order);
        } catch (error: any) {
            const statusCode = reply.statusCode || 500;
            const err = new ApiError(statusCode, error.message);
            reply.status(err.statusCode).send(err);
        }
    }

    async getOrdersByCustomerForStatus(request: FastifyRequest<{ Params: Partial<ParamsType> }>, reply: FastifyReply) {
        try {
            const { status, storeId, customerId } = paramsSchema.partial().parse(request.params);
            const order = await service.getOrdersByCustomerForStatus(status, storeId, customerId);
            return reply.send(order);
        } catch (error: any) {
            const statusCode = reply.statusCode || 500;
            const err = new ApiError(statusCode, error.message);
            reply.status(err.statusCode).send(err);
        }
    }

    async createOrder(request: FastifyRequest<{ Params: Partial<ParamsType> }>, reply: FastifyReply) {
        try {
            const { customerId, paymentMethodId, value, products, storeId } = paramsSchema
                .partial()
                .parse(request.body);
            await service.createOrder(customerId, paymentMethodId, value, products, storeId);
            return reply.status(201).send("Pedido criado com sucesso.");
        } catch (error: any) {
            const statusCode = reply.statusCode || 500;
            const err = new ApiError(statusCode, error.message);
            reply.status(err.statusCode).send(err);
        }
    }

    async updateOrderByCustomer(request: FastifyRequest<{ Params: Partial<ParamsType> }>, reply: FastifyReply) {
        try {
            const { id, paymentMethodId } = paramsSchema.partial().parse(request.body);
            await service.updateOrderByCustomer(id, paymentMethodId);
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
