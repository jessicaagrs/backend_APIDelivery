export interface Products {
    id: string,
	description: string,
	price: number,
	urlImage: string,
	type: string,
	storeId: string,
}



export interface ProductsPaginationModel {
    totalPages: number,
    products: Products[]
}