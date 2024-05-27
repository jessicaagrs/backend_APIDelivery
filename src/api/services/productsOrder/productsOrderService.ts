import { ProductsOrderModel } from "../../../types/model/productsOrderModel";
import ProductsOrderRepository from "../../repositories/productsOrder/productsOrderRepository";

const repository = new ProductsOrderRepository();

class ProductsOrderService{

    async createProductsOrder(products: ProductsOrderModel[]) {
        if(products.length === 0) {
            throw new Error("A lista de produtos do pedido não pode ser vazia");
        }

        await repository.createProductsOrder(products);
    }

}

export default ProductsOrderService;