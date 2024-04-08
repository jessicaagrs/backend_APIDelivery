import prismaClient from "../../../db/prisma";

class UsersRepository {
	async getAllUsers() {
		const users = await prismaClient.users.findMany();

		return users;
	}

	async getUser(email: string) {
		const user = await prismaClient.users.findUnique({
			where: {
				email,
			},
		});

		return user;
	}

	async createUser(name: string, email: string) {
		const user = await prismaClient.users.create({
			data: {
				name,
				email,
				status: true,
			},
		});

		return user;
	}

	async updateUser(id: string, name: string, email: string) {
		const user = await prismaClient.users.update({
			where: {
				id,
			},
			data: {
				name,
				email,
				status: true,
			},
		});

		return user;
	}

	async deleteUser(id: string) {
		await prismaClient.users.delete({
			where: {
				id,
			},
		});
	}
}

export default UsersRepository;
