import { RoleEnum } from "../../../enums/enums";
import { decryptCustomerPassword, encryptCustomerPassword } from "../../../utils/formatter";
import OrdersRepository from "../../repositories/orders/ordersRepository";
import ShopmansRepository from "../../repositories/shopmans/shopmansRepository";
import StoresRepository from "../../repositories/stores/storesRepository";

const repository = new ShopmansRepository();
const repositoryOrders = new OrdersRepository();
const repositoryStores = new StoresRepository();

class ShopmansService {
	async getAllShopmans(storeId: string | undefined) {
		if (!storeId) throw new Error("O id da loja deve ser informado.");

		const storeExist = await repositoryStores.getStoreById(storeId);

		if (!storeExist) throw new Error("Loja não encontrada.");

		const shopmans = await repository.getAllShopmans(storeId);

		return shopmans;
	}

	async getShopmansByPagination(take: number | undefined, skip: number | undefined, storeId: string | undefined) {
		if (take === undefined || skip === undefined || storeId === undefined) {
			throw new Error(
				"Para buscar os vendedores, o número de registros, id da loja e a quantidade de itens a serem ignorados devem ser informados."
			);
		}

		const shopmans = await repository.getShopmansByPagination(take, skip, storeId);
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

	async createShopman(
		name: string | undefined,
		email: string | undefined,
		role: string | undefined,
		password: string | undefined,
		storeId: string | undefined
	) {
		if (
			name === undefined ||
			email === undefined ||
			role === undefined ||
			password === undefined ||
			storeId === undefined
		) {
			throw new Error(
				"Para criar um vendedor, o nome, email, senha, id da loja e qual o tipo de autorização devem ser informados."
			);
		}

		const shopman = await repository.getShopmanByEmail(email);

		if (shopman) {
			throw new Error("Já existe um vendedor com este email.");
		}

		const storeExist = await repositoryStores.getStoreById(storeId);

		if (!storeExist) throw new Error("Loja não encontrada.");

		if (role === RoleEnum.ADMIN) {
			const roleInStore = await repository.getShopmanByRoleInStore(role, storeId);

			if (roleInStore) throw new Error("Já existe um administrador na loja informada.");
		}

		const passwordEncrypt = encryptCustomerPassword(password);

		await repository.createShopman(name, email, role, passwordEncrypt, storeId);
	}

	async updateShopman(
		id: string | undefined,
		name: string | undefined,
		email: string | undefined,
		password: string | undefined
	) {
		if (name === undefined || email === undefined || id === undefined || password === undefined) {
			throw new Error("Para atualizar um vendedor, o nome, email, senha, status e o id devem ser informados.");
		}

		const shopman = await repository.getShopmanById(id);

		if (!shopman) {
			throw new Error("Vendedor não encontrado.");
		}

		const emailJaExiste = await repository.getShopmanByEmail(email);

		if (emailJaExiste && shopman.id !== id) {
			throw new Error("Já existe um vendedor com este email.");
		}

		const passwordDecrypt = decryptCustomerPassword(shopman.password);

		password != passwordDecrypt ? (password = encryptCustomerPassword(password)) : (password = shopman.password);

		await repository.updateShopman(id, name, email, password);
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
			await repository.disableShopman(id, false);
			return;
		}

		await repository.deleteShopman(id);
	}
}

export default ShopmansService;
