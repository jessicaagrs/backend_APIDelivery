import prismaClient from "../../../db/prisma";

class PaymentsMethodsRepository {
	async getAllPaymentMethods() {
		const payments = await prismaClient.paymentsMethods.findMany();

		return payments;
	}

	async getPaymentMethodById(id: string) {
		const payment = await prismaClient.paymentsMethods.findUnique({
			where: {
				id,
			},
		});

		return payment;
	}
	async createOptionsPayment() {
		await prismaClient.paymentsMethods.createMany({
			data: [
				{ description: "Dinheiro" },
				{ description: "Pix" },
				{ description: "Cartão de Crédito Mastercard" },
				{ description: "Cartão de Crédito Visa" },
				{ description: "Cartão de Crédito Elo" },
				{ description: "Cartão de Crédito American Express" },
				{ description: "Cartão de Crédito Hipercard" },
				{ description: "Cartão de Crédito Alelo" },
				{ description: "Cartão de Débito Elo" },
				{ description: "Cartão de Débito Maestro" },
				{ description: "Cartão de Débito Visa Electron" },
				{ description: "Cartão de Débito Matercard" },
				{ description: "Cartão de Débito Banricompras" },
				{ description: "Vale Refeição Alelo" },
				{ description: "Vale Refeição Good Card" },
				{ description: "Vale Refeição Senff" },
				{ description: "Vale Refeição Ticket" },
				{ description: "Vale Refeição VR Benefícios" },
			],
		});
	}

	async createPaymentMethod(description: string) {
		await prismaClient.paymentsMethods.create({
			data: {
				description,
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
