import UsersRepository from "../../repositories/users/usersRepository";

const repository = new UsersRepository();

class UsersService {
	async getAllUsers() {
		return await repository.getAllUsers();
	}

	async getUserByEmail(email: string) {
		if (email === "") {
			throw new Error("Para atualizar um usuário, o email deve ser informado.");
		}

		const user = await repository.getUserByEmail(email);

		if (!user) {
			throw new Error("Usuário não encontrado.");
		}

		return user;
	}

	async createUser(name: string, email: string) {
		if (name === "" || email === "") {
			throw new Error("Para criar um usuário, o nome e o email devem ser informados.");
		}

		const user = await repository.getUserByEmail(email);

		if (user) {
			throw new Error("Já existe um usuário com este email.");
		}

		return await repository.createUser(name, email);
	}

	async updateUser(id: string, name: string, email: string) {
		if (name === "" || email === "") {
			throw new Error("Para atualizar um usuário, nome e email devem ser informados.");
		}

		if (id === "") {
			throw new Error("ID do usuário não informado.");
		}

		const user = await repository.getUserById(id);
		console.log(user);

		if (!user) {
			throw new Error("Usuário não encontrado.");
		}

		if(user.id !== id) {
			throw new Error("Já existe um usuário com este email.");
		}

		return await repository.updateUser(id, name, email);
	}

	async deleteUser(id: string) {
		if (id === "") {
			throw new Error("ID do usuário não informado.");
		}

		const user = await repository.getUserById(id);

		if (!user) {
			throw new Error("Usuário não encontrado.");
		}

		await repository.deleteUser(id);
	}
}

export default UsersService;
