export interface LoginSchema {
	token: string;
    user: {
        id: string;
        email: string;
        creationDate: string;
    }
}