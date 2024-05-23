import OrdersRepository from "../../repositories/orders/ordersRepository";
import PaymentsMethodsRepository from "../../repositories/paymentsMethods/paymentsMethodsRepository";

const repository = new PaymentsMethodsRepository();
const repositoryOrders = new OrdersRepository();

class PaymentsMethodsService {
	async getAllPaymentsMethods() {
		const payments = await repository.getAllPaymentMethods();

		if (payments.length === 0) {
			await repository.createOptionsPayment();
			return await repository.getAllPaymentMethods();
		}

		return payments;
	}

	async createPaymentMethod(description: string | undefined) {
		if (description === undefined) {
			throw new Error("Para criar um método de pagamento, a descrição deve ser informada.");
		}

		await repository.createPaymentMethod(description);
	}

	async updatePaymentMethod(description: string | undefined, id: string | undefined) {
		if (description === undefined || id === undefined) {
			throw new Error("Para atualizar um método de pagamento, a descrição e o id devem ser informados.");
		}

		const payment = await repository.getPaymentMethodById(id);

		if (!payment) {
			throw new Error("Método de pagamento não encontrado.");
		}

		await repository.updatePaymentMethod(id, description);
	}

	async deletePaymentMethod(id: string | undefined) {
		if (id === undefined) {
			throw new Error("ID do método de pagamento não informado.");
		}

		const payment = await repository.getPaymentMethodById(id);

		if (!payment) {
			throw new Error("Método de pagamento não encontrado.");
		}

		const paymentInOrder = await repositoryOrders.getOrderByPaymentMethod(payment.id);

		if (paymentInOrder) {
			throw new Error("Forma de pagamento não pode ser deletada, pois está vinculada a um pedido.");
		}

		await repository.deletePaymentMethod(id);
	}
}

export default PaymentsMethodsService;
