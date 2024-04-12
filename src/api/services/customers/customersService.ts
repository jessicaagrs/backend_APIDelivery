import CustomersRepository from "../../repositories/customers/usersRepository";

const repository = new CustomersRepository();

class CustomersService {
	async getAllCustomers() {
		return await repository.getAllCustomers();
	}

	async getCustomerByEmail(email: string) {
		if (email === "") {
			throw new Error("Para atualizar um cliente, o email deve ser informado.");
		}

		const customer = await repository.getCustomerByEmail(email);

		if (!customer) {
			throw new Error("Cliente não encontrado.");
		}

		return customer;
	}

	async createCustomer(name: string, email: string) {
		if (name === "" || email === "") {
			throw new Error("Para criar um cliente, o nome e o email devem ser informados.");
		}

		const customer = await repository.getCustomerByEmail(email);

		if (customer) {
			throw new Error("Já existe um cliente com este email.");
		}

		await repository.createCustomer(name, email);
	}

	async updateCustomer(id: string, name: string, email: string) {
		if (name === "" || email === "") {
			throw new Error("Para atualizar um cliente, nome e email devem ser informados.");
		}

		if (id === "") {
			throw new Error("ID do cliente não informado.");
		}

		const customer = await repository.getCustomerById(id);

		if (!customer) {
			throw new Error("Cliente não encontrado.");
		}

		if (customer.id !== id) {
			throw new Error("Já existe um cliente com este email.");
		}

		await repository.updateCustomer(id, name, email);
	}

	async deleteCustomer(id: string) {
		if (id === "") {
			throw new Error("ID do cliente não informado.");
		}

		const customer = await repository.getCustomerById(id);

		if (!customer) {
			throw new Error("Cliente não encontrado.");
		}

		await repository.deleteCustomer(id);
	}
}

export default CustomersService;
