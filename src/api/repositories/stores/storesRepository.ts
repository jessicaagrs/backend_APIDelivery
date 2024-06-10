import prismaClient from "../../../db/prisma";

class StoresRepository {
	async getAllStores() {
		const stores = await prismaClient.stores.findMany();
		return stores;
	}

	async getStoreById(id: string) {
		const store = await prismaClient.stores.findUnique({
			where: {
				id,
			},
		});
		return store;
	}

	async getStoreByCNPJ(cnpj: string) {
		const store = await prismaClient.stores.findUnique({
			where: {
				cnpj,
			},
		});
		return store;
	}

	async createStore(cnpj: string, corporateReason: string, phone: string) {
		await prismaClient.stores.create({
			data: {
				cnpj,
				corporateReason,
				phone,
			},
		});
	}

	async updateStore(id: string, corporateReason: string, phone: string) {
		await prismaClient.stores.update({
			where: {
				id,
			},
			data: {
				corporateReason,
				phone,
				updateAt: new Date(),
			},
		});
	}

	async deleteStore(id: string) {
		await prismaClient.stores.delete({
			where: {
				id,
			},
		});
	}
}

export default StoresRepository;
