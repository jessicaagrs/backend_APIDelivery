import { TypeLoginEnum } from "../../../enums/enums";
import { LoginSchema } from "../../../types/model/authModel";
import {
	decryptCustomerPassword,
	encryptCustomerPassword,
	generateRandomPasswordReset,
} from "../../../utils/formatter";
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

    async verifyCustomerPresence(email: string) {
        const customer = await customerRepository.getCustomerByEmail(email);

        if (!customer) {
            throw new Error("Cliente não encontrado.");
        }

        return customer;
    }

    async LoginByCustomer(email: string, password: string) {
        const customer = await this.verifyCustomerPresence(email);

        const passwordDecrypt = decryptCustomerPassword(customer.password);

        if (passwordDecrypt !== password) {
            throw new Error("Credenciais inválidas.");
        }

        const responseLogin: LoginSchema = {
            token: "",
            user: {
                id: customer.id,
                typeLogin: TypeLoginEnum.CUSTOMER,
                creationDate: new Date().toString(),
            },
        };

        return responseLogin;
    }

    async verifyShopmanPresence(email: string) {
        const shopman = await shopmanRepository.getShopmanByEmail(email);

        if (!shopman) {
            throw new Error("Vendedor não encontrado.");
        }

        return shopman;
    }

    async LoginByShopman(email: string, password: string) {
        const shopman = await this.verifyShopmanPresence(email);

        const passwordDecrypt = decryptCustomerPassword(shopman.password);

        if (passwordDecrypt !== password) {
            throw new Error("Credenciais inválidas.");
        }

        const responseLogin: LoginSchema = {
            token: "",
            user: {
                id: shopman.id,
                typeLogin: TypeLoginEnum.SHOPMAN,
                creationDate: new Date().toString(),
            },
        };

        return responseLogin;
    }

    async createResetPassword(email: string | undefined, typeLogin: string | undefined) {
        if (email === undefined || typeLogin === undefined) {
            throw new Error("Para criar uma senha de reset, o email e o tipo de login devem ser informados.");
        }

        let passwordReset: string;

        if (typeLogin === TypeLoginEnum.CUSTOMER) {
            const customer = await this.verifyCustomerPresence(email);
            passwordReset = generateRandomPasswordReset();
            await customerRepository.updatePasswordCustomer(customer.id, encryptCustomerPassword(passwordReset));
        } else {
            const shopman = await this.verifyShopmanPresence(email);
            passwordReset = generateRandomPasswordReset();
            await shopmanRepository.updatePasswordShopman(shopman.id, encryptCustomerPassword(passwordReset));
        }

        console.log(`\x1b[42m aqui \x1b[0m`, passwordReset);

        return passwordReset;
    }
}

export default AuthService;
