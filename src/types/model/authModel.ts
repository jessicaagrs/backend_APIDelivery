export interface LoginSchema {
	token: string;
	user: {
		id: string;
		typeLogin: string;
		creationDate: string;
	};
}
