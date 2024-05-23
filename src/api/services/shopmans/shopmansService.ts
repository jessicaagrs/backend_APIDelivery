import OrdersRepository from "../../repositories/orders/ordersRepository";
import ShopmansRepository from "../../repositories/shopmans/shopmansRepository";

const repository = new ShopmansRepository();
const repositoryOrders = new OrdersRepository();

class ShopmansService {
	async getAllShopmans() {
		const shopmans = await repository.getAllShopmans();

		return shopmans;
	}

	async getShopmanById(id: string) {
		if (id === "") {
			throw new Error("O Id do vendedor deve ser informado.");
		}

		const shopman = await repository.getShopmanById(id);

		if (!shopman) {
			throw new Error("Vendedor não encontrado.");
		}

		return shopman;
	}

	async getShopmanByEmail(email: string | undefined) {
		if (email === undefined) {
			throw new Error("O email do vendedor deve ser informado.");
		}

		const shopman = await repository.getShopmanByEmail(email);

		if (!shopman) {
			throw new Error("Vendedor não encontrado.");
		}

		return shopman;
	}

	async createShopman(name: string | undefined, email: string | undefined, role: string | undefined) {
		if (name === undefined || email === undefined || role === undefined) {
			throw new Error("Para criar um vendedor, o nome, email e qual o tipo de autorização devem ser informados.");
		}

		const shopman = await repository.getShopmanByEmail(email);

		if (shopman) {
			throw new Error("Já existe um vendedor com este email.");
		}

		await repository.createShopman(name, email, role);
	}

	async updateShopman(
		id: string | undefined,
		name: string | undefined,
		email: string | undefined,
		role: string | undefined,
		status: boolean | undefined
	) {
		if (name === undefined || email === undefined || role === undefined || id === undefined) {
			throw new Error(
				"Para atualizar um vendedor, o nome, email, qual o tipo de autorização e o id devem ser informados."
			);
		}

		const shopman = await repository.getShopmanById(id);

		if (!shopman) {
			throw new Error("Vendedor não encontrado.");
		}

		const emailJaExiste = await repository.getShopmanByEmail(email);

		if (emailJaExiste && shopman.id !== id) {
			throw new Error("Já existe um vendedor com este email.");
		}

		await repository.updateShopman(id, name, email, role, status ?? shopman.status);
	}

	async deleteShopman(id: string | undefined) {
		if (id === undefined) {
			throw new Error("ID do vendedor não informado.");
		}

		const shopman = await repository.getShopmanById(id);

		if (!shopman) {
			throw new Error("Vendedor não encontrado.");
		}

		const shopmanInOrder = await repositoryOrders.getOrderByShopman(shopman.id);

		if (shopmanInOrder) {
			throw new Error("Vendedor não pode ser deletado, pois está vinculado a um pedido.");
		}

		await repository.deleteShopman(id);
	}
}

export default ShopmansService;
