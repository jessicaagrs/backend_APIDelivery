import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ApiError } from "../../../error/apiError";
import ProductsService from "../../services/products/productsService";
import { validateProductType } from "../../../utils/formatter";

const service = new ProductsService();

const paramsSchema = z.object({
	id: z
		.string({
			required_error: "O id do produto é obrigatório",
			invalid_type_error: "O id do produto deve ser uma string",
		})
		.min(1, {
			message: "O id do produto não pode ser vazio",
		}),
	description: z
		.string({
			required_error: "A descrição do produto é obrigatório",
			invalid_type_error: "A descrição do produto deve ser uma string",
		})
		.min(5, {
			message: "A descrição do  produto deve ter pelo menos 5 caracteres",
		}),
	price: z
		.number({
			required_error: "O preço do produto é obrigatório",
			invalid_type_error: "O preço do produto deve ser um número",
		})
		.positive({
			message: "O preço do produto deve ser maior que 0",
		}),
	type: z
		.string({
			required_error: "O tipo do produto é obrigatório",
			invalid_type_error: "O tipo do produto deve ser uma string",
		})
		.refine((value) => validateProductType(value), {
			message: "O tipo do produto deve ser um dos seguintes valores: 'Alimentos' ou 'Bebidas'",
		}),
	urlImage: z
		.string({
			required_error: "A url da imagem do produto é obrigatório",
			invalid_type_error: "A url da imagem do produto deve ser uma string",
		})
		.url({
			message: "A url deve ter um formato válido",
		}),
});

type ParamsType = z.infer<typeof paramsSchema>;

class ProductsController {
	async getAllProducts(request: FastifyRequest, reply: FastifyReply) {
		try {
			const products = await service.getAllProducts();
			return reply.send(products);
		} catch (error: any) {
			const statusCode = reply.statusCode || 500;
			const err = new ApiError(statusCode, error.message);
			reply.status(err.statusCode).send(err);
		}
	}

	async getProductById(request: FastifyRequest<{ Params: Partial<ParamsType> }>, reply: FastifyReply) {
		try {
			const id = paramsSchema.partial().parse(request.params).id;
			const product = await service.getProductById(id);
			return reply.send(product);
		} catch (error: any) {
			const statusCode = reply.statusCode || 500;
			const err = new ApiError(statusCode, error.message);
			reply.status(err.statusCode).send(err);
		}
	}

	async createProduct(request: FastifyRequest<{ Params: Partial<ParamsType> }>, reply: FastifyReply) {
		try {
			const { description, price, type, urlImage } = paramsSchema.partial().parse(request.body);
			await service.createProduct(description, price, type, urlImage);
			reply.status(201).send("Produto criado com sucesso.");
		} catch (error: any) {
			const statusCode = reply.statusCode || 500;
			const err = new ApiError(statusCode, error.message);
			reply.status(err.statusCode).send(err);
		}
	}

	async updateProduct(request: FastifyRequest<{ Params: Partial<ParamsType> }>, reply: FastifyReply) {
		try {
			const { id, description, price, type, urlImage } = paramsSchema.partial().parse(request.body);
			await service.updateProduct(description, price, type, urlImage, id ?? "");
			reply.send("Produto atualizado com sucesso.");
		} catch (error: any) {
			const statusCode = reply.statusCode || 500;
			const err = new ApiError(statusCode, error.message);
			reply.status(err.statusCode).send(err);
		}
	}

	async deleteProduct(request: FastifyRequest<{ Params: Partial<ParamsType> }>, reply: FastifyReply) {
		try {
			const id = paramsSchema.partial().parse(request.params).id;
			await service.deleteProduct(id);
			reply.send("Produto deletado com sucesso.");
		} catch (error: any) {
			const statusCode = reply.statusCode || 500;
			const err = new ApiError(statusCode, error.message);
			reply.status(err.statusCode).send(err);
		}
	}
}

export default ProductsController;
