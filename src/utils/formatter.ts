import { StatusOrdersEnum } from "../enums/enums";

export function validateStatusOrders(status: string): boolean {
	for (const value in StatusOrdersEnum) {
		if (StatusOrdersEnum[value as keyof typeof StatusOrdersEnum] === status) {
			return true;
		}
	}

	return false;
}

export function validateProductType(tipoProduto: string): boolean {
	return tipoProduto === "Alimentos" || tipoProduto === "Bebidas";
}
