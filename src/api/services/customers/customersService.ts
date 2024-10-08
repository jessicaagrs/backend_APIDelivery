import { CustomerModel } from "../../../types/model/customerModel";
import { decryptCustomerPassword, encryptCustomerPassword } from "../../../utils/formatter";
import CustomersRepository from "../../repositories/customers/customersRepository";
import OrdersRepository from "../../repositories/orders/ordersRepository";

const repository = new CustomersRepository();
const repositoryOrders = new OrdersRepository();

type insertCustomer = Omit<CustomerModel, "id" | "createdAt" | "updateAt" | "status">;
type updateCustomer = Omit<CustomerModel, "createdAt" | "updateAt" | "status">;

class CustomersService {
    async getAllCustomers() {
        return await repository.getAllCustomers();
    }

    async getCustomersByPagination(take: number | undefined, page: number | undefined) {
        if (take === undefined || page === undefined) {
            throw new Error("Para buscar os clientes, o número de registros e a página devem ser informados.");
        }

        const customers = await repository.getCustomersByPagination(take, page);
        return customers;
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

    async createCustomer({ name, email, password, phone }: insertCustomer) {
        if (name === undefined || email === undefined || password === undefined || phone === undefined) {
            throw new Error(
                "Para criar um cliente, o nome, senha, id da loja, telefone e o email devem ser informados."
            );
        }

        const customer = await repository.getCustomerByEmail(email);

        if (customer) {
            throw new Error("Já existe um cliente com este email.");
        }

        const passwordEncrypt = encryptCustomerPassword(password);

        await repository.createCustomer(name, email, passwordEncrypt, phone);
    }

    async updateCustomer({ id, name, email, password, phone }: updateCustomer) {
        if (name === "" || !name || email === "" || !email || !password || !phone) {
            throw new Error("Para atualizar um cliente, nome, senha, telefone e email devem ser informados.");
        }

        if (!id || id === "") {
            throw new Error("Id do cliente não informado.");
        }

        const customer = await repository.getCustomerById(id);

        if (!customer) {
            throw new Error("Cliente não encontrado.");
        }

        const emailJaExiste = await repository.getCustomerByEmail(email);

        if (emailJaExiste && emailJaExiste.id !== id) {
            throw new Error("Já existe um cliente com este email.");
        }

        const passwordDecrypt = decryptCustomerPassword(customer.password);

        password != passwordDecrypt ? (password = encryptCustomerPassword(password)) : (password = customer.password);

        await repository.updateCustomer(id, name, email, password, phone);
    }

    async deleteCustomer(id: string | undefined) {
        if (id === undefined) {
            throw new Error("ID do cliente não informado.");
        }

        const customer = await repository.getCustomerById(id);

        if (!customer) {
            throw new Error("Cliente não encontrado.");
        }

        const customerInOrder = await repositoryOrders.getOrderByCustomer(customer.id);

        if (customerInOrder) {
            await repository.disableCustomer(id, false);
            return;
        }

        await repository.deleteCustomer(id);
    }
}

export default CustomersService;
