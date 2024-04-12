import prismaClient from "../../../db/prisma";

class ShopmansRepository {
	async getAllShopmans() {
		const shopmans = await prismaClient.shopmans.findMany();

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

	async createShopman(name: string, email: string, role: string) {
		await prismaClient.shopmans.create({
			data: {
				name,
				email,
				role,
				status: true,
			},
		});
	}

	async updateShopman(id: string, name: string, email: string, role: string) {
		await prismaClient.shopmans.update({
			where: {
				id,
			},
			data: {
				name,
				email,
				role,
				status: true,
				update_at: new Date(),
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
