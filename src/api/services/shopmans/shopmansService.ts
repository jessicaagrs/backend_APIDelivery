import { RoleEnum } from "../../../enums/enums";
import ShopmansRepository from "../../repositories/shopmans/shopmansRepository";

const repository = new ShopmansRepository();

class ShopmansService {
	async getAllShopmans() {
		const shopmans = await repository.getAllShopmans();

		return shopmans;
	}

	async getShopmanById(id: string) {
		if (id === "") {
			throw new Error("O Id do lojista deve ser informado.");
		}

		const shopman = await repository.getShopmanById(id);

		if (!shopman) {
			throw new Error("Lojista não encontrado.");
		}

		return shopman;
	}

	async getShopmanByEmail(email: string | undefined) {
		if (email === undefined) {
			throw new Error("O email do lojista deve ser informado.");
		}

		const shopman = await repository.getShopmanByEmail(email);

		if (!shopman) {
			throw new Error("Lojista não encontrado.");
		}

		return shopman;
	}

	async createShopman(name: string | undefined, email: string | undefined, role: string | undefined) {
		if (name === undefined || email === undefined || role === undefined) {
			throw new Error("Para criar um lojista, o nome, email e qual o tipo de autorização devem ser informados.");
		}

		const shopman = await repository.getShopmanByEmail(email);

		if (shopman) {
			throw new Error("Já existe um lojista com este email.");
		}

		await repository.createShopman(name, email, role);
	}

	async updateShopman(
		id: string | undefined,
		name: string | undefined,
		email: string | undefined,
		role: string | undefined
	) {
		if (name === undefined || email === undefined || role === undefined || id === undefined) {
			throw new Error(
				"Para atualizar um lojista, o nome, email, qual o tipo de autorização e o id devem ser informados."
			);
		}

		const shopman = await repository.getShopmanById(id);

		if (!shopman) {
			throw new Error("Lojista não encontrado.");
		}

		if (shopman.id !== id) {
			throw new Error("Já existe um lojista com este email.");
		}

		await repository.updateShopman(id, name, email, role);
	}

	async deleteShopman(id: string | undefined) {
		if (id === undefined) {
			throw new Error("ID do lojista não informado.");
		}

		const shopman = await repository.getShopmanById(id);

		if (!shopman) {
			throw new Error("Lojista não encontrado.");
		}

		await repository.deleteShopman(id);
	}
}

export default ShopmansService;
