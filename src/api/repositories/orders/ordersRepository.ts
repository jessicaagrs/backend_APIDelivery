import prismaClient from "../../../db/prisma";

class OrdersRepository {
	async getAllOrdersByStore(storeId: string) {
		return await prismaClient.orders.findMany({
			where: {
				storeId,
			},
		});
	}

	async getAllOrdersByCustomer(storeId: string, customerId: string) {
		return await prismaClient.orders.findMany({
			where: {
				storeId,
				customerId
			},
		});
	}

	async getOrdersByStoreForStatus(status: string, storeId: string) {
		return await prismaClient.orders.findMany({
			where: {
				status,
				storeId,
			},
		});
	}

	async getOrdersByCustomerForStatus(status: string, storeId: string, customerId : string) {
		return await prismaClient.orders.findMany({
			where: {
				status,
				storeId,
				customerId
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
				shopmanId: id,
			},
		});
	}

	async getOrderByCustomer(id: string) {
		return await prismaClient.orders.findFirst({
			where: {
				customerId: id,
			},
		});
	}

	async getOrderByPaymentMethod(id: string) {
		return await prismaClient.orders.findFirst({
			where: {
				paymentMethodId: id,
			},
		});
	}

	async getOrderByStore(id: string) {
		return await prismaClient.orders.findFirst({
			where: {
				storeId: id,
			},
		});
	}

	async createOrder(customerId: string, paymentMethodId: string, status: string, value: number, storeId: string) {
		return await prismaClient.orders.create({
			data: {
				customerId: customerId,
				shopmanId: "",
				paymentMethodId: paymentMethodId,
				status,
				value,
				storeId,
			},
		});
	}

	async updateOrderStatus(id: string, paymentMethodId: string, status: string, shopmanId: string) {
		return await prismaClient.orders.update({
			where: {
				id,
			},
			data: {
				shopmanId,
				paymentMethodId,
				status,
				updateAt: new Date(),
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
			},
		});
	}
}

export default OrdersRepository;
