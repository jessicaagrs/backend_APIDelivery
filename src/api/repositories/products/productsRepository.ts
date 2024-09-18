import prismaClient from "../../../db/prisma";

class ProductsRepository {
    async getAllProducts(storeId: string) {
        const products = await prismaClient.products.findMany({
            where: {
                storeId,
            },
        });

        return products;
    }

    async getProductsByPagination(take: number, page: number, storeId: string, filter?: string) {
        const totalProducts = await prismaClient.products.count({
            where: {
                storeId,
                OR: filter
                    ? [
                          { type: { contains: filter, mode: "insensitive" } },
                          { description: { contains: filter, mode: "insensitive" } },
                      ]
                    : undefined,
            },
        });

        const skip = (page - 1) * take;

        const products = await prismaClient.products.findMany({
            where: {
                storeId,
                OR: filter
                    ? [
                          { type: { contains: filter, mode: "insensitive" } },
                          { description: { contains: filter, mode: "insensitive" } },
                      ]
                    : undefined,
            },
            take,
            skip,
        });

        return {
            totalPages: Math.ceil(totalProducts / take),
            products,
        };
    }

    async getProductById(id: string) {
        const product = await prismaClient.products.findUnique({
            where: {
                id,
            },
        });

        return product;
    }

    async createProduct(description: string, price: number, type: string, urlImage: string, storeId: string) {
        await prismaClient.products.create({
            data: {
                description,
                price,
                type,
                urlImage,
                storeId,
            },
        });
    }

    async updateProduct(id: string, description: string, price: number, type: string, urlImage: string) {
        await prismaClient.products.update({
            where: {
                id,
            },
            data: {
                description,
                price,
                type,
                urlImage,
            },
        });
    }

    async deleteProduct(id: string) {
        await prismaClient.products.delete({
            where: {
                id,
            },
        });
    }
}

export default ProductsRepository;
