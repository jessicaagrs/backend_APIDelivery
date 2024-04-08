import UsersRepository from "../../repositories/users/usersRepository";

const REPOSITORY = new UsersRepository();

class UsersService {
	async getAllUsers() {
		return await REPOSITORY.getAllUsers();
	}

	async getUser(email: string) {
		if (email === "") {
			throw new Error("Para atualizar um usuário, o email deve ser informado.");
		}

		const user = await REPOSITORY.getUser(email);

		if (!user) {
			throw new Error("Usuário não encontrado.");
		}

		return user;
	}

	async createUser(name: string, email: string) {
		if (name === "" || email === "") {
			throw new Error("Para criar um usuário, o nome e o email devem ser informados.");
		}
		return await REPOSITORY.createUser(name, email);
	}

	async updateUser(id: string, name: string, email: string) {
		if (name === "" || email === "") {
			throw new Error("Para atualizar um usuário, nome e email devem ser informados.");
		}

        if(id === ""){
            throw new Error("ID do usuário não informado.");
        }

		return await REPOSITORY.updateUser(id, name, email);
	}

    async deleteUser(id: string) {
        if(id === ""){
            throw new Error("ID do usuário não informado.");
        }

        await REPOSITORY.deleteUser(id);
    }
}

export default UsersService;
