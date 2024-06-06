import prismaClient from "../../../db/prisma";
import { ProductsInOrder, ProductsOrderModel } from "../../../types/model/productsOrderModel";

class ProductsOrderRepository {
	async createProductsOrder(products: ProductsOrderModel[]) {
		await prismaClient.productsOrder.createMany({
			data: products,
		});
	}

	async getOrderedProducts(orderId: string) {
		const orderedProducts = await prismaClient.productsOrder.findMany({
			where: { orderId },
			select: {
				productId: true,
				quantity: true,
			},
		});

		const productIds = orderedProducts.map((order) => order.productId);

		const products = await prismaClient.products.findMany({
			where: {
				id: { in: productIds },
			},
			select: {
				id: true,
				description: true,
				price: true,
				urlImage: true,
			},
		});

		const result = products.map((product) => {
			const productInOrder = orderedProducts.find((order) => order.productId === product.id);
			if (productInOrder) {
				const newProduct: ProductsInOrder = {
					id: productInOrder.productId,
					quantity: productInOrder.quantity,
					description: product.description,
					price: Number(product.price),
					urlImage: product.urlImage,
				};

				return newProduct;
			}

			return null;
		});

		return result;
	}
}

export default ProductsOrderRepository;
