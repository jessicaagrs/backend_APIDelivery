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

    async getProductById(id: string) {
		const product = await repository.getProductById(id);

        if(!product) {
			throw new Error("Produto não encontrado.");
		}
  
		return product;
	}

	async createProduct(description: string, price: number, type: string, urlImage: string) {
		if (description === "" || price === 0 || type === "" || urlImage === "") {
			throw new Error("Para criar um produto, a descrição, o preço, o tipo e a url da imagem devem ser informados.");
		}

		await repository.createProduct(description, price, type, urlImage);
	}

	async updateProduct(description: string, price: number, type: string, urlImage: string, id: string) {
		if (description === "" || price === 0 || type === "" || urlImage === "" || id === "") {
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

	async deleteProduct(id: string) {
		if (id === "") {
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
