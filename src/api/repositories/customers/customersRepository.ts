import prismaClient from "../../../db/prisma";

class CustomersRepository {
    async getAllCustomers() {
        const customers = await prismaClient.customers.findMany();

        return customers;
    }

    async getCustomersByPagination(take: number, page: number) {
        const totalCustomers = await prismaClient.customers.count();

        const skip = (page - 1) * take;

        const customers = await prismaClient.customers.findMany({
            take,
            skip,
        });

        return {
            totalPages: Math.ceil(totalCustomers / take),
            customers,
        };
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

    async createCustomer(name: string, email: string, password: string, phone: string) {
        await prismaClient.customers.create({
            data: {
                name,
                email,
                password,
                phone,
                status: true,
            },
        });
    }

    async updateCustomer(id: string, name: string, email: string, password: string, phone: string) {
        await prismaClient.customers.update({
            where: {
                id,
            },
            data: {
                name,
                email,
                password,
                phone,
                updateAt: new Date(),
            },
        });
    }

    async updatePasswordCustomer(id: string, password: string) {
        await prismaClient.customers.update({
            where: {
                id,
            },
            data: {
                password,
                updateAt: new Date(),
            },
        });
    }

    async disableCustomer(id: string, status: boolean) {
        await prismaClient.customers.update({
            where: {
                id,
            },
            data: {
                status,
                updateAt: new Date(),
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
