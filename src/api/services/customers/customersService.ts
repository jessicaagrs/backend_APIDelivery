import CustomersRepository from "../../repositories/customers/customersRepository";

const repository = new CustomersRepository();

class CustomersService {
	async getAllCustomers() {
		return await repository.getAllCustomers();
	}

	async getCustomerByEmail(email: string | undefined) {
		if (email === undefined) {
			throw new Error("Para atualizar um cliente, o email deve ser informado.");
		}

		const customer = await repository.getCustomerByEmail(email);

		if (!customer) {
			throw new Error("Cliente não encontrado.");
		}

		return customer;
	}

	async createCustomer(name: string | undefined, email: string | undefined) {
		if (name === undefined || email === undefined) {
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

		const emailJaExiste = await repository.getCustomerByEmail(email);

		if (emailJaExiste && emailJaExiste.id !== id) {
			throw new Error("Já existe um cliente com este email.");
		}

		await repository.updateCustomer(id, name, email);
	}

	async deleteCustomer(id: string | undefined) {
		if (id === undefined) {
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
