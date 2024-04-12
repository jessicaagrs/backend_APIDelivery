import prismaClient from "../../../db/prisma";

class CustomersRepository {
	async getAllCustomers() {
		const customers = await prismaClient.customers.findMany();

		return customers;
	}

	async getCustomerByEmail(email: string) {
		const user = await prismaClient.customers.findUnique({
			where: {
				email,
			},
		});

		return user;
	}

	async getCustomerById(id: string) {
		const user = await prismaClient.customers.findUnique({
			where: {
				id,
			},
		});

		return user;
	}

	async createCustomer(name: string, email: string) {
		await prismaClient.customers.create({
			data: {
				name,
				email,
				status: true,
			},
		});
	}

	async updateCustomer(id: string, name: string, email: string) {
		await prismaClient.customers.update({
			where: {
				id,
			},
			data: {
				name,
				email,
				status: true,
				update_at: new Date(),
			},
		});
	}

	async deleteCustomer(id: string) {
		await prismaClient.customers.delete({
			where: {
				id,
			},
		});
	}
}

export default CustomersRepository;
