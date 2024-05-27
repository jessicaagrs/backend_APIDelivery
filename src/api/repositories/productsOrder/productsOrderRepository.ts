import prismaClient from "../../../db/prisma";
import { ProductsOrderModel } from "../../../types/model/productsOrderModel";


class ProductsOrderRepository {

    async createProductsOrder(products : ProductsOrderModel[]) {
        await prismaClient.productsOrder.createMany({
            data: products
        });
    }

}

export default ProductsOrderRepository;