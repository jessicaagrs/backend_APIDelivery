import { ProductsOrderModel, ProductsOrderResponse } from "../../../types/model/productsOrderModel";
import OrdersRepository from "../../repositories/orders/ordersRepository";
import ProductsOrderRepository from "../../repositories/productsOrder/productsOrderRepository";

const repository = new ProductsOrderRepository();
const orderRepository = new OrdersRepository();

class ProductsOrderService {
	async createProductsOrder(products: ProductsOrderResponse[] | undefined, orderId: string) {
		if (products === undefined || products.length === 0) {
			throw new Error("A lista de produtos do pedido não pode ser vazia");
		}

		const productsOrder: ProductsOrderModel[] = products.map((product) => {
			return {
				productId: product.productId,
				quantity: product.quantity,
				orderId: orderId,
			};
		});

		await repository.createProductsOrder(productsOrder);
	}

	async getOrderedProducts(orderId: string) {
		if (!orderId) {
			throw new Error("O Id do pedido é obrigatório.");
		}

		const order = await orderRepository.getOrderById(orderId);

		if(!order){
			throw new Error("O pedido informado não existe.");
		}

		return await repository.getOrderedProducts(orderId);
	}
}

export default ProductsOrderService;
