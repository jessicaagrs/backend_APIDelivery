import prismaClient from "../../../db/prisma";
import { TypeProductEnum } from "../../../enums/enums";

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

    async createProductsDefault(storeId: string) {
        await prismaClient.products.createMany({
            data: [
                {
                    description: "Pizza Queijo Gorgonzola e Tomates",
                    price: 25.99,
                    type: TypeProductEnum.FOODS,
                    urlImage:
                        "https://images.unsplash.com/photo-1597439591052-12fc4e1d755e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    storeId,
                },
                {
                    description: "Pastel de Carne e Legumes",
                    price: 10.99,
                    type: TypeProductEnum.FOODS,
                    urlImage:
                        "https://images.unsplash.com/photo-1608039783021-6116a558f0c5?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    storeId,
                },
                {
                    description: "Torta de Frutas Vermelhas Fatia",
                    price: 15.45,
                    type: TypeProductEnum.FOODS,
                    urlImage:
                        "https://images.unsplash.com/photo-1476887334197-56adbf254e1a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    storeId,
                },
                {
                    description: "Panqueca Vegetariana de Legumes",
                    price: 10.99,
                    type: TypeProductEnum.FOODS,
                    urlImage:
                        "https://images.unsplash.com/photo-1695712641569-05eee7b37b6d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    storeId,
                },
                {
                    description: "Torrada Completa de Frango",
                    price: 13.99,
                    type: TypeProductEnum.FOODS,
                    urlImage:
                        "https://images.unsplash.com/photo-1475090169767-40ed8d18f67d?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    storeId,
                },
                {
                    description: "Hamburguer de Carne com Porção de Batatas",
                    price: 39.9,
                    type: TypeProductEnum.FOODS,
                    urlImage:
                        "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    storeId,
                },
                {
                    description: "Porção de Frango Frito",
                    price: 39.9,
                    type: TypeProductEnum.FOODS,
                    urlImage:
                        "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    storeId,
                },
                {
                    description: "Suco de Laranja 500ml",
                    price: 8.99,
                    type: TypeProductEnum.DRINKS,
                    urlImage:
                        "https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    storeId,
                },
                {
                    description: "Suco de Morango 500ml",
                    price: 8.99,
                    type: TypeProductEnum.DRINKS,
                    urlImage:
                        "https://images.unsplash.com/photo-1568909344668-6f14a07b56a0?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    storeId,
                },
                {
                    description: "Milk Shake Oreo 300ml",
                    price: 13.45,
                    type: TypeProductEnum.DRINKS,
                    urlImage:
                        "https://images.unsplash.com/photo-1619158401201-8fa932695178?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    storeId,
                },
                {
                    description: "Milk Shake Morango 300ml",
                    price: 13.45,
                    type: TypeProductEnum.DRINKS,
                    urlImage:
                        "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    storeId,
                },
                {
                    description: "Capuccino Xícara Média",
                    price: 9.65,
                    type: TypeProductEnum.DRINKS,
                    urlImage:
                        "https://images.unsplash.com/photo-1514066558159-fc8c737ef259?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    storeId,
                },
                {
                    description: "Café com Leite, Chocolate e Chantilly 300ml",
                    price: 12.99,
                    type: TypeProductEnum.DRINKS,
                    urlImage:
                        "https://images.unsplash.com/photo-1592663527359-cf6642f54cff?q=80&w=2038&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    storeId,
                },
                {
                    description: "Coca Cola 250ml",
                    price: 8.99,
                    type: TypeProductEnum.DRINKS,
                    urlImage:
                        "https://images.unsplash.com/photo-1567103472667-6898f3a79cf2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    storeId,
                },
            ],
        });
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
