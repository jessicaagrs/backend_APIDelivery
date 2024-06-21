import prismaClient from "../../../db/prisma";

class PaymentsMethodsRepository {
	async getAllPaymentMethods(storeId: string) {
		const payments = await prismaClient.paymentsMethods.findMany({
			where: {
				storeId,
			},
		});

		return payments;
	}

	async getPaymentsMethodsByPagination(take: number, skip: number, storeId: string) {
		return await prismaClient.paymentsMethods.findMany({
			where: {
				storeId,
			},
			take,
			skip,
		});
	}

	async getPaymentMethodById(id: string) {
		const payment = await prismaClient.paymentsMethods.findUnique({
			where: {
				id,
			},
		});

		return payment;
	}
	async createOptionsPayment(storeId: string) {
		await prismaClient.paymentsMethods.createMany({
			data: [
				{ description: "Dinheiro", storeId },
				{ description: "Pix", storeId },
				{ description: "Cartão de Crédito Mastercard", storeId },
				{ description: "Cartão de Crédito Visa", storeId },
				{ description: "Cartão de Crédito Elo", storeId },
				{ description: "Cartão de Crédito American Express", storeId },
				{ description: "Cartão de Crédito Hipercard", storeId },
				{ description: "Cartão de Crédito Alelo", storeId },
				{ description: "Cartão de Débito Elo", storeId },
				{ description: "Cartão de Débito Maestro", storeId },
				{ description: "Cartão de Débito Visa Electron", storeId },
				{ description: "Cartão de Débito Matercard", storeId },
				{ description: "Cartão de Débito Banricompras", storeId },
				{ description: "Vale Refeição Alelo", storeId },
				{ description: "Vale Refeição Good Card", storeId },
				{ description: "Vale Refeição Senff", storeId },
				{ description: "Vale Refeição Ticket", storeId },
				{ description: "Vale Refeição VR Benefícios", storeId },
			],
		});
	}

	async createPaymentMethod(description: string, storeId: string) {
		await prismaClient.paymentsMethods.create({
			data: {
				description,
				storeId,
			},
		});
	}

	async updatePaymentMethod(id: string, description: string) {
		await prismaClient.paymentsMethods.update({
			where: {
				id,
			},
			data: {
				description,
			},
		});
	}

	async deletePaymentMethod(id: string) {
		await prismaClient.paymentsMethods.delete({
			where: {
				id,
			},
		});
	}
}

export default PaymentsMethodsRepository;
