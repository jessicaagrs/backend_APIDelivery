import { TypeLoginEnum } from "../../../enums/enums";
import { LoginSchema } from "../../../types/model/authModel";
import { decryptCustomerPassword } from "../../../utils/formatter";
import CustomersRepository from "../../repositories/customers/customersRepository";
import ShopmansRepository from "../../repositories/shopmans/shopmansRepository";

const customerRepository = new CustomersRepository();
const shopmanRepository = new ShopmansRepository();

class AuthService {
	async Login(email: string | undefined, password: string | undefined, typeLogin: string | undefined) {
		if (email === undefined || password === undefined || typeLogin === undefined) {
			throw new Error("Para fazer login, o email, tipo do login e a senha devem ser informados.");
		}

		if (typeLogin === TypeLoginEnum.CUSTOMER) {
			return await this.LoginByCustomer(email, password);
		}

		return await this.LoginByShopman(email, password);
	}

	async LoginByCustomer(email: string, password: string) {
		const customer = await customerRepository.getCustomerByEmail(email);

		if (!customer) {
			throw new Error("Cliente não encontrado.");
		}

		const passwordDecrypt = decryptCustomerPassword(customer.password);

		if (passwordDecrypt !== password) {
			throw new Error("Credenciais inválidas.");
		}

		const responseLogin: LoginSchema = {
			token: "",
			user: {
				id: customer.id,
				email: customer.email,
				creationDate: new Date().toString(),
			},
		};

		return responseLogin;
	}

	async LoginByShopman(email: string, password: string) {
		const shopman = await shopmanRepository.getShopmanByEmail(email);

		if (!shopman) {
			throw new Error("Vendedor não encontrado.");
		}

		const passwordDecrypt = decryptCustomerPassword(shopman.password);

		if (passwordDecrypt !== password) {
			throw new Error("Credenciais inválidas.");
		}

		const responseLogin: LoginSchema = {
			token: "",
			user: {
				id: shopman.id,
				email: shopman.email,
				creationDate: new Date().toString(),
			},
		};

		return responseLogin;
	}
}

export default AuthService;
