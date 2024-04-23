import { RoleEnum, StatusOrdersEnum, TypeProductEnum } from "../enums/enums";

export function validateStatusOrders(status: string): boolean {
	for (const value in StatusOrdersEnum) {
		if (StatusOrdersEnum[value as keyof typeof StatusOrdersEnum] === status) {
			return true;
		}
	}

	return false;
}

export function validateProductType(typeProduct: string): boolean {
	for (const value in TypeProductEnum) {
		if (TypeProductEnum[value as keyof typeof TypeProductEnum] === typeProduct) {
			return true;
		}
	}
	return false;
}

export function validateRole(typeRole: string): boolean {
	for (const value in RoleEnum) {
		if (RoleEnum[value as keyof typeof RoleEnum] === typeRole) {
			return true;
		}
	}
	return false;
}
