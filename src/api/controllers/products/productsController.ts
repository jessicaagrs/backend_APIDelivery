import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ApiError } from "../../../error/apiError";
import { validateProductType } from "../../../utils/formatter";
import ProductsService from "../../services/products/productsService";

const service = new ProductsService();

const paramsSchema = z.object({
    id: z
        .string({
            required_error: "O id do produto é obrigatório",
            invalid_type_error: "O id do produto deve ser uma string",
        })
        .cuid({
            message: "O id deve ser um CUID",
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
        .refine(value => validateProductType(value), {
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
    filter: z
        .string({
            required_error: "O filtro é obrigatório",
            invalid_type_error: "O filtro deve ser uma string",
        })
        .min(1, {
            message: "O filtro deve ter pelo menos 1 caracter",
        }),
});

type ParamsType = z.infer<typeof paramsSchema>;

class ProductsController {
    async getAllProducts(request: FastifyRequest, reply: FastifyReply) {
        try {
            const storeId = paramsSchema.partial().parse(request.params).storeId;
            const products = await service.getAllProducts(storeId);
            return reply.send(products);
        } catch (error: any) {
            const statusCode = reply.statusCode || 500;
            const err = new ApiError(statusCode, error.message);
            reply.status(err.statusCode).send(err);
        }
    }

    async getProductsByPagination(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { take, page, storeId } = paramsSchema.partial().parse(request.params);
            const products = await service.getProductsByPagination(take, page, storeId);
            return reply.send(products);
        } catch (error: any) {
            const statusCode = reply.statusCode || 500;
            const err = new ApiError(statusCode, error.message);
            reply.status(err.statusCode).send(err);
        }
    }

    async getProductsByFilter(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { take, page, storeId, filter } = paramsSchema.partial().parse(request.params);
            const products = await service.getProductsByPagination(take, page, storeId, filter);
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
            const { description, price, type, urlImage, storeId } = paramsSchema.partial().parse(request.body);
            await service.createProduct(description, price, type, urlImage, storeId);
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
            await service.updateProduct(description, price, type, urlImage, id);
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
