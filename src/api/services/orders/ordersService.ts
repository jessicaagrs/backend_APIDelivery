import { StatusOrdersEnum } from "../../../enums/enums";
import { ProductsOrderResponse } from "../../../types/model/productsOrderModel";
import CustomersRepository from "../../repositories/customers/customersRepository";
import OrdersRepository from "../../repositories/orders/ordersRepository";
import PaymentsMethodsRepository from "../../repositories/paymentsMethods/paymentsMethodsRepository";
import ShopmansRepository from "../../repositories/shopmans/shopmansRepository";
import StoresRepository from "../../repositories/stores/storesRepository";
import ProductsOrderService from "../productsOrder/productsOrderService";

const repository = new OrdersRepository();
const repositoryCustomer = new CustomersRepository();
const repositoryPaymentMethod = new PaymentsMethodsRepository();
const repositoryShopman = new ShopmansRepository();
const productsOrderService = new ProductsOrderService();
const storesRepository = new StoresRepository();

class OrdersService {
    async getAllOrdersByStore(storeId: string | undefined) {
        if (storeId == undefined) throw new Error("O Id da loja é obrigatório");

        const storeExist = await storesRepository.getStoreById(storeId);

        if (!storeExist) throw new Error("Loja não encontrada");

        return await repository.getAllOrdersByStore(storeId);
    }

    async getOrdersByPagination(storeId: string | undefined, take: number | undefined, page: number | undefined) {
        if (take === undefined || page === undefined || storeId == undefined) {
            throw new Error(
                "Para buscar os pedidos, o número de registros, id da loja e a página devem ser informados."
            );
        }

        const orders = await repository.getOrdersByPagination(storeId, take, page);
        return orders;
    }

    async getAllOrdersByCustomer(
        storeId: string | undefined,
        customerId: string | undefined,
        take: number | undefined,
        page: number | undefined
    ) {
        if (storeId == undefined) throw new Error("O Id da loja é obrigatório");

        if (customerId == undefined) throw new Error("O Id do cliente é obrigatório");

        if (take === undefined || page === undefined) {
            throw new Error("Para buscar os pedidos, o número de registros e a página devem ser informados.");
        }

        const storeExist = await storesRepository.getStoreById(storeId);

        if (!storeExist) throw new Error("Loja não encontrada");

        const customerExist = await repositoryCustomer.getCustomerById(customerId);

        if (!customerExist) throw new Error("Cliente não encontrado");

        return await repository.getAllOrdersByCustomer(storeId, customerId, take, page);
    }

    async getOrderById(id: string | undefined) {
        if (id == undefined) throw new Error("O ID do pedido é obrigatório");
        return await repository.getOrderById(id);
    }

    async getOrdersByStoreForStatus(status: string | undefined, storeId: string | undefined) {
        if (status == undefined || storeId == undefined) throw new Error("O status e o id do pedido é obrigatório");

        const storeExist = await storesRepository.getStoreById(storeId);

        if (!storeExist) throw new Error("Loja não encontrada");

        return await repository.getOrdersByStoreForStatus(status, storeId);
    }

    async getOrdersByCustomerForStatus(
        status: string | undefined,
        storeId: string | undefined,
        customerId: string | undefined
    ) {
        if (status == undefined || storeId == undefined || customerId == undefined)
            throw new Error("O status, id do cliente e o id do pedido é obrigatório");

        const storeExist = await storesRepository.getStoreById(storeId);

        if (!storeExist) throw new Error("Loja não encontrada");

        const customerExist = await repositoryCustomer.getCustomerById(customerId);

        if (!customerExist) throw new Error("Cliente não encontrado");

        return await repository.getOrdersByCustomerForStatus(status, storeId, customerId);
    }

    async createOrder(
        customerId: string | undefined,
        paymentMethodId: string | undefined,
        value: number | undefined,
        products: ProductsOrderResponse[] | undefined,
        storeId: string | undefined
    ) {
        if (customerId == undefined) throw new Error("O ID do cliente é obrigatório");

        if (paymentMethodId == undefined) throw new Error("O ID do método de pagamento é obrigatório");

        if (value == undefined) throw new Error("O valor total do pedido é obrigatório");

        if (storeId == undefined) throw new Error("O id da loja é obrigatório");

        const storeExist = await storesRepository.getStoreById(storeId);

        if (!storeExist) throw new Error("Loja não encontrada");

        let customer = await repositoryCustomer.getCustomerById(customerId);
        if (customer == null) throw new Error("Não existe um cliente com o ID informado");

        let paymentMethod = await repositoryPaymentMethod.getPaymentMethodById(paymentMethodId);
        if (paymentMethod == null) throw new Error("Não existe um método de pagamento com o ID informado");

        const newOrder = await repository.createOrder(
            customerId,
            paymentMethodId,
            StatusOrdersEnum.PENDING,
            value,
            storeId
        );
        await productsOrderService.createProductsOrder(products, newOrder.id);
    }

    async updateOrderByCustomer(id: string | undefined, paymentMethodId: string | undefined) {
        if (id == undefined) throw new Error("O ID do pedido é obrigatório");

        if (paymentMethodId == undefined) throw new Error("O ID da forma de pagamento é obrigatória");

        let order = await repository.getOrderById(id);
        if (order == null) throw new Error("Não existe um pedido com o ID informado");

        let paymentMethod = await repositoryPaymentMethod.getPaymentMethodById(paymentMethodId);
        if (paymentMethod == null) throw new Error("Não existe um método de pagamento com o ID informado");

        await repository.updateOrderStatus(id, paymentMethodId, order.status, order.shopmanId);
    }

    async updateOrderByShopman(id: string | undefined, shopmanId: string | undefined, status: string | undefined) {
        if (id == undefined) throw new Error("O ID do pedido é obrigatório");

        if (shopmanId == undefined) throw new Error("O ID do vendedor é obrigatório");

        if (status == undefined) throw new Error("O status do pedido é obrigatório");

        let order = await repository.getOrderById(id);
        if (order == null) throw new Error("Não existe um pedido com o ID informado");

        const shopman = await repositoryShopman.getShopmanById(shopmanId);
        if (shopman == null) throw new Error("Não existe um vendedor com o ID informado");

        await repository.updateOrderStatus(id, order.paymentMethodId, status, shopmanId);
    }

    async deleteOrderByCustomer(id: string | undefined) {
        if (id == undefined) throw new Error("O ID do pedido é obrigatório");

        let order = await repository.getOrderById(id);
        if (order == null) throw new Error("Não existe um pedido com o ID informado");

        if (order.status != StatusOrdersEnum.PENDING)
            throw new Error("Não é possível cancelar um pedido com status diferente de Pendente");

        await repository.deleteOrder(id, StatusOrdersEnum.CANCELED);
    }

    async deleteOrderByShopman(id: string | undefined) {
        if (id == undefined) throw new Error("O ID do pedido é obrigatório");

        let order = await repository.getOrderById(id);
        if (order == null) throw new Error("Não existe um pedido com o ID informado");

        if (order.status == StatusOrdersEnum.CANCELED.toString()) throw new Error("O pedido já está cancelado.");

        await repository.deleteOrder(id, StatusOrdersEnum.CANCELED);
    }
}

export default OrdersService;
