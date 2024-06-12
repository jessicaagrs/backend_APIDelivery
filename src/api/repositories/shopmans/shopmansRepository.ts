import prismaClient from "../../../db/prisma";

class ShopmansRepository {
	async getAllShopmans(storeId: string) {
		const shopmans = await prismaClient.shopmans.findMany({
			where: {
				storeId,
			},
		});

		return shopmans;
	}

	async getShopmanById(id: string) {
		const shopman = await prismaClient.shopmans.findUnique({
			where: {
				id,
			},
		});

		return shopman;
	}

	async getShopmanByEmail(email: string) {
		const shopman = await prismaClient.shopmans.findUnique({
			where: {
				email,
			},
		});

		return shopman;
	}

	async getShopmanByRoleInStore(role: string, storeId: string) {
		const shopman = await prismaClient.shopmans.findFirst({
			where: {
				role,
				storeId,
			},
		});

		return shopman;
	}

	async createShopman(name: string, email: string, role: string, password: string, storeId: string) {
		await prismaClient.shopmans.create({
			data: {
				name,
				email,
				role,
				password,
				storeId,
				status: true,
			},
		});
	}

	async updateShopman(id: string, name: string, email: string, role: string, password: string) {
		await prismaClient.shopmans.update({
			where: {
				id,
			},
			data: {
				name,
				email,
				role,
				password,
				updateAt: new Date(),
			},
		});
	}

	async disableShopman(id: string, status: boolean) {
		await prismaClient.shopmans.update({
			where: {
				id,
			},
			data: {
				status,
				updateAt: new Date(),
			},
		});
	}

	async deleteShopman(id: string) {
		await prismaClient.shopmans.delete({
			where: {
				id,
			},
		});
	}
}

export default ShopmansRepository;
