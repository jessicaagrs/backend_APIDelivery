import prismaClient from "../../../db/prisma";

class OrdersRepository {
	async getAllOrders() {
		return await prismaClient.orders.findMany();
	}

	async getOrdersByStatus(status: string) {
		return await prismaClient.orders.findMany({
			where: {
				status,
			},
		});
	}

	async getOrderById(id: string) {
		return await prismaClient.orders.findUnique({
			where: {
				id,
			},
		});
	}

    async getOrderByShopman(id: string) {
		return await prismaClient.orders.findFirst({
			where: {
				shopman_id: id,
			},
		});
	}

	async createOrder(customerId: string, paymentMethodId: string, status: string, value: number) {
		await prismaClient.orders.create({
			data: {
				customer_id: customerId,
                shopman_id: "",
                paymentMethod_id: paymentMethodId,
                status,
                value
			},
		});
	}

    async updateOrderStatus(id: string, shopmanId: string, paymentMethodId: string, status: string, value: number) {
        await prismaClient.orders.update({
            where: {
                id,
            },
            data: {
                shopman_id: shopmanId,
                paymentMethod_id: paymentMethodId,
                status,
                value
            },
        });
    }

    async deleteOrder(id: string, status: string) {
        await prismaClient.orders.update({
            where: {
                id,
            },
            data: {
                status,
            }
        });
    }
}

export default OrdersRepository;
