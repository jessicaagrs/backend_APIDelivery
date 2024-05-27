import { ProductsOrderModel, ProductsOrderResponse } from "../../../types/model/productsOrderModel";
import ProductsOrderRepository from "../../repositories/productsOrder/productsOrderRepository";

const repository = new ProductsOrderRepository();

class ProductsOrderService{

    async createProductsOrder(products: ProductsOrderResponse[] | undefined, orderId: string) {
        if(products === undefined || products.length === 0) {
            throw new Error("A lista de produtos do pedido não pode ser vazia");
        }

        const productsOrder : ProductsOrderModel[] = products.map((product) => {
            return {
                productId: product.productId,
                quantity: product.quantity,
                orderId: orderId
            }
        });

        await repository.createProductsOrder(productsOrder);
    }

    async updateProductsOrder(id: string, products: ProductsOrderResponse[] | undefined) {
        if(products === undefined || products.length === 0) {
            throw new Error("A lista de produtos do pedido não pode ser vazia");
        }
    }

}

export default ProductsOrderService;