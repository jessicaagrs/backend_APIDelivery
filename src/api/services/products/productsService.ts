import ProductsRepository from "../../repositories/products/productsRepository";

const repository = new ProductsRepository();

class ProductsService {
	async getAllProducts() {
		const products = await repository.getAllProducts();

		if (products.length === 0) {
			await repository.createProductsDefault();
			return await repository.getAllProducts();
		}

		return products;
	}

	async getProductById(id: string | undefined) {
		if (id === undefined) throw new Error("ID do produto não informado.");

		const product = await repository.getProductById(id);

		if (!product) {
			throw new Error("Produto não encontrado.");
		}

		return product;
	}

	async createProduct(
		description: string | undefined,
		price: number | undefined,
		type: string | undefined,
		urlImage: string | undefined
	) {
		if (description === undefined || price === undefined || type === undefined || urlImage === undefined) {
			throw new Error("Para criar um produto, a descrição, o preço, o tipo e a url da imagem devem ser informados.");
		}

		await repository.createProduct(description, price, type, urlImage);
	}

	async updateProduct(
		description: string | undefined,
		price: number | undefined,
		type: string | undefined,
		urlImage: string | undefined,
		id: string | undefined
	) {
		if (
			description === undefined ||
			price === undefined ||
			type === undefined ||
			urlImage === undefined ||
			id === undefined
		) {
			throw new Error(
				"Para atualizar um produto, o id, a descrição, o preço, o tipo e a url da imagem devem ser informados."
			);
		}

		const product = await repository.getProductById(id);

		if (!product) {
			throw new Error("Produto não encontrado.");
		}

		await repository.updateProduct(id, description, price, type, urlImage);
	}

	async deleteProduct(id: string | undefined) {
		if (id === undefined) {
			throw new Error("ID do produto não informado.");
		}

		const product = await repository.getProductById(id);

		if (!product) {
			throw new Error("Produto não encontrado.");
		}

		await repository.deleteProduct(id);
	}
}

export default ProductsService;
