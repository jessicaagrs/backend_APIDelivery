import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ApiError } from "../../../error/apiError";
import ProductsService from "../../services/products/productsService";
import { TypeProductEnum } from "../../../enums/roleEnum";

const service = new ProductsService();

const paramsSchema = z.object({
	id: z.string().nullish(),
	description: z.string(),
	price: z.number(),
	type: z.string(),
	urlImage: z.string(),
});

const paramsIdSchema = z.string();

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

    async getProductById(request: FastifyRequest<{ Params: ParamsType }>, reply: FastifyReply) {
		try {
            const id = paramsIdSchema.parse(request.params.id);
			const product = await service.getProductById(id);
			return reply.send(product);
		} catch (error: any) {
			const statusCode = reply.statusCode || 500;
			const err = new ApiError(statusCode, error.message);
			reply.status(err.statusCode).send(err);
		}
	}

	async createProduct(request: FastifyRequest, reply: FastifyReply) {
		try {
			const { description, price, type, urlImage } = paramsSchema.parse(request.body);
			if (type != TypeProductEnum.ALIMENTOS && type != TypeProductEnum.BEBIDAS) {
				throw new Error("Tipo de produto inválido.");
			}

			await service.createProduct(description, price, type, urlImage);
			reply.status(201).send("Produto criado com sucesso.");
		} catch (error: any) {
			const statusCode = reply.statusCode || 500;
			const err = new ApiError(statusCode, error.message);
			reply.status(err.statusCode).send(err);
		}
	}

	async updateProduct(request: FastifyRequest, reply: FastifyReply) {
		try {
			const { id, description, price, type, urlImage } = paramsSchema.parse(request.body);
			if (type != TypeProductEnum.ALIMENTOS && type != TypeProductEnum.BEBIDAS) {
				throw new Error("Tipo de produto inválido.");
			}

			await service.updateProduct(description, price, type, urlImage, id ?? "");
			reply.send("Produto atualizado com sucesso.");
		} catch (error: any) {
			const statusCode = reply.statusCode || 500;
			const err = new ApiError(statusCode, error.message);
			reply.status(err.statusCode).send(err);
		}
	}

	async deleteProduct(request: FastifyRequest<{ Params: ParamsType }>, reply: FastifyReply) {
		try {
			const id = paramsIdSchema.parse(request.params.id);
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
