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