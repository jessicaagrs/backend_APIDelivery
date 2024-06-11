import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ApiError } from "../../../error/apiError";
import ProductsOrderService from "../../services/productsOrder/productsOrderService";

const service = new ProductsOrderService();

const paramsSchema = z.object({
	idOrder: z
		.string({
			required_error: "O id do método de pagamento é obrigatório",
			invalid_type_error: "O id do método de pagamento deve ser uma string",
		})
		.cuid({
			message: "O id deve ser um CUID",
		}),
});

type ParamsType = z.infer<typeof paramsSchema>;

class ProductsOrderController {
	async getOrderedProducts(request: FastifyRequest<{ Params: Partial<ParamsType> }>, reply: FastifyReply) {
		try {
			const idOrder = paramsSchema.parse(request.params).idOrder;
			const products = await service.getOrderedProducts(idOrder);
			return reply.send(products);
		} catch (error: any) {
			const statusCode = reply.statusCode || 500;
			const err = new ApiError(statusCode, error.message);
			reply.status(err.statusCode).send(err);
		}
	}
}

export default ProductsOrderController;
