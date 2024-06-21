import OrdersRepository from "../../repositories/orders/ordersRepository";
import PaymentsMethodsRepository from "../../repositories/paymentsMethods/paymentsMethodsRepository";
import StoresRepository from "../../repositories/stores/storesRepository";

const repository = new PaymentsMethodsRepository();
const repositoryOrders = new OrdersRepository();
const repositoryStore = new StoresRepository();

class PaymentsMethodsService {
	async getAllPaymentsMethods(storeId: string | undefined) {
		if (storeId === undefined) {
			throw new Error("Id da loja não informado.");
		}

		const storeExist = await repositoryStore.getStoreById(storeId);

		if (!storeExist) throw new Error("Loja não encontrada.");

		const payments = await repository.getAllPaymentMethods(storeId);

		if (payments.length === 0) {
			await repository.createOptionsPayment(storeId);
			return await repository.getAllPaymentMethods(storeId);
		}

		return payments;
	}

	async getPaymentsMethodsByPagination(
		take: number | undefined,
		skip: number | undefined,
		storeId: string | undefined
	) {
		if (take === undefined || skip === undefined || storeId === undefined) {
			throw new Error(
				"Para buscar os métodos de pagamentos, o número de registros, id da loja e a quantidade de itens a serem ignorados devem ser informados."
			);
		}

		const payments = await repository.getPaymentsMethodsByPagination(take, skip, storeId);
		return payments;
	}

	async createPaymentMethod(description: string | undefined, storeId: string | undefined) {
		if (description === undefined || storeId === undefined) {
			throw new Error("Para criar um método de pagamento, a descrição e o id da loja devem ser informados.");
		}

		const storeExist = await repositoryStore.getStoreById(storeId);

		if (!storeExist) throw new Error("Loja não encontrada.");

		await repository.createPaymentMethod(description, storeId);
	}

	async updatePaymentMethod(description: string | undefined, id: string | undefined) {
		if (description === undefined || id === undefined) {
			throw new Error(
				"Para atualizar um método de pagamento, a descrição e o id da forma de pagamento devem ser informados."
			);
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
