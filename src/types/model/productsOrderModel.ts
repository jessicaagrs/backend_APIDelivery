export interface ProductsOrderModel {
	id?: string;
	productId: string;
	quantity: number;
	orderId: string;
}

export interface ProductsOrderResponse {
	productId: string;
	quantity: number;
}

export interface ProductsInOrder {
	id: string;
	quantity: number;
	description: string;
	price: number;
	urlImage: string;
}
