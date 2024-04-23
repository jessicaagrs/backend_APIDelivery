import { StatusOrdersEnum } from "../enums/enums";

export function validarStatus(status: string): boolean {
	for (const value in StatusOrdersEnum) {
		if (StatusOrdersEnum[value as keyof typeof StatusOrdersEnum] === status) {
			return true;
		}
	}

	return false;
}
