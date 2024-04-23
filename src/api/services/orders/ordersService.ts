import { StatusOrdersEnum } from "../../../enums/enums";
import { validarStatus } from "../../../utils/formatter";
import CustomersRepository from "../../repositories/customers/customersRepository";
import OrdersRepository from "../../repositories/orders/ordersRepository";
import PaymentsMethodsRepository from "../../repositories/paymentsMethods/paymentsMethodsRepository";
import ShopmansRepository from "../../repositories/shopmans/shopmansRepository";

const repository = new OrdersRepository();
const repositoryCustomer = new CustomersRepository();
const repositoryPaymentMethod = new PaymentsMethodsRepository();
const repositoryShopman = new ShopmansRepository();

class OrdersService {
	async getAllOrders() {
		return await repository.getAllOrders();
	}

	async getOrderById(id: string | undefined) {
		if (id == undefined) throw new Error("O ID do pedido é obrigatório");
		return await repository.getOrderById(id);
	}

	async getOrdersByStatus(status: string | undefined) {
		if (status == undefined) throw new Error("O status do pedido é obrigatório");
		if (!validarStatus(status)) throw new Error("O status informado não é válido");
		return await repository.getOrdersByStatus(status);
	}

	async createOrder(customerId: string | undefined, paymentMethodId: string | undefined, value: number | undefined) {
		if (customerId == undefined) throw new Error("O ID do cliente é obrigatório");

		if (paymentMethodId == undefined) throw new Error("O ID do método de pagamento é obrigatório");

		if (value == undefined) throw new Error("O valor total do pedido é obrigatório");

		let customer = await repositoryCustomer.getCustomerById(customerId);
		if (customer == null) throw new Error("Não existe um cliente com o ID informado");

		let paymentMethod = await repositoryPaymentMethod.getPaymentMethodById(paymentMethodId);
		if (paymentMethod == null) throw new Error("Não existe um método de pagamento com o ID informado");

		await repository.createOrder(customerId, paymentMethodId, StatusOrdersEnum.PENDING, value);
	}

	async updateOrderByCustomer(
		id: string | undefined,
		shopmanId: string | undefined,
		paymentMethodId: string | undefined,
		status: string | undefined,
		value: number | undefined
	) {
		if (id == undefined) throw new Error("O ID do pedido é obrigatório");

		if (paymentMethodId == undefined) throw new Error("O ID da forma de pagamento é obrigatória");

		if (value == undefined) throw new Error("O valor total do pedido é obrigatório");

		if (shopmanId == undefined) throw new Error("O ID do vendedor é obrigatório");

		if (status == undefined) throw new Error("O status do pedido é obrigatório");

		if (!validarStatus(status) && status != StatusOrdersEnum.PENDING)
			throw new Error("O status não é válido ou é diferente de Pendente");

		let order = await repository.getOrderById(id);
		if (order == null) throw new Error("Não existe um pedido com o ID informado");

		const shopman = await repositoryShopman.getShopmanById(shopmanId);
		if (shopman == null) throw new Error("Não existe um vendedor com o ID informado");

		let paymentMethod = await repositoryPaymentMethod.getPaymentMethodById(paymentMethodId);
		if (paymentMethod == null) throw new Error("Não existe um método de pagamento com o ID informado");

		await repository.updateOrderStatus(id, shopmanId, paymentMethodId, status, value);
	}

	async updateOrderByShopman(
		id: string | undefined,
		shopmanId: string | undefined,
		paymentMethodId: string | undefined,
		status: string | undefined,
		value: number | undefined
	) {
		if (id == undefined) throw new Error("O ID do pedido é obrigatório");

		if (paymentMethodId == undefined) throw new Error("O ID da forma de pagamento é obrigatória");

		if (shopmanId == undefined) throw new Error("O ID do vendedor é obrigatório");

		if (value == undefined) throw new Error("O valor total do pedido é obrigatório");

		if (status == undefined) throw new Error("O status do pedido é obrigatório");

		if (!validarStatus(status)) throw new Error("O status informado não é válido");

		let order = await repository.getOrderById(id);
		if (order == null) throw new Error("Não existe um pedido com o ID informado");

		const shopman = await repositoryShopman.getShopmanById(shopmanId);
		if (shopman == null) throw new Error("Não existe um vendedor com o ID informado");

		let paymentMethod = await repositoryPaymentMethod.getPaymentMethodById(paymentMethodId);
		if (paymentMethod == null) throw new Error("Não existe um método de pagamento com o ID informado");

		await repository.updateOrderStatus(id, shopmanId, paymentMethodId, status, value);
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
