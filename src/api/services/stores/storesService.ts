import StoresRepository from "../../repositories/stores/storesRepository";
import OrdersRepository from "../../repositories/orders/ordersRepository";

const repository = new StoresRepository();
const ordersRepository = new OrdersRepository();

class StoresService {
	async getAllStores() {
		const stores = await repository.getAllStores();
		return stores;
	}

	async getStoreById(id: string | undefined) {
		if (id == undefined) throw new Error("O id da loja é obrigatório");
		const store = await repository.getStoreById(id);
		return store;
	}

	async getStoreByCNPJ(cnpj: string | undefined) {
		if (cnpj == undefined) throw new Error("O cnpj da loja é obrigatório");
		const store = await repository.getStoreByCNPJ(cnpj);
		return store;
	}

	async createStore(cnpj: string | undefined, corporateReason: string | undefined, phone: string | undefined) {
		if (cnpj == undefined || corporateReason == undefined || phone == undefined)
			throw new Error("O cnpj, telefone e a razão social da loja são obrigatórios");

		const cnpjExist = await repository.getStoreByCNPJ(cnpj);

		if (cnpjExist) throw new Error("CNPJ informado já existe.");

		await repository.createStore(cnpj, corporateReason, phone);
	}

	async updateStore(
		id: string | undefined,
		cnpj: string | undefined,
		corporateReason: string | undefined,
		phone: string | undefined
	) {
		if (id == undefined || cnpj == undefined || corporateReason == undefined || phone == undefined)
			throw new Error("O id, cnpj, telefone e a razão social da loja são obrigatórios");

		const storeExist = await repository.getStoreById(id);

		if (!storeExist) throw new Error("Loja não encontrada");

		await repository.updateStore(id, cnpj, corporateReason, phone);
	}

	async deleteStore(id: string | undefined) {
		if (id == undefined) throw new Error("O id da loja é obrigatório");

		const storeExist = await repository.getStoreById(id);

		if (!storeExist) throw new Error("Loja não encontrada");

		const storeInOrder = await ordersRepository.getOrderByStore(id);

		if (storeInOrder) throw new Error("Loja com pedidos não pode ser excluída");

		await repository.deleteStore(id);
	}
}

export default StoresService;
