import ProductsRepository from "../../repositories/products/productsRepository";
import ProductsOrderRepository from "../../repositories/productsOrder/productsOrderRepository";
import StoresRepository from "../../repositories/stores/storesRepository";

const repository = new ProductsRepository();
const storesRepository = new StoresRepository();
const productsOrderRepository = new ProductsOrderRepository();

class ProductsService {
    async getAllProducts(storeId: string | undefined) {
        if (!storeId) throw new Error("Id da loja não informado.");

        const storeExist = await storesRepository.getStoreById(storeId);

        if (!storeExist) throw new Error("Loja não encontrada.");

        const products = await repository.getAllProducts(storeId);

        if (products.length === 0) {
            await repository.createProductsDefault(storeId);
            return await repository.getAllProducts(storeId);
        }

        return products;
    }

    async getProductsByPagination(
        take: number | undefined,
        skip: number | undefined,
        storeId: string | undefined,
        filter?: string
    ) {
        if (take === undefined || skip === undefined || storeId === undefined) {
            throw new Error(
                "Para buscar os produtos, o número de registros, id da loja e a quantidade de itens a serem ignorados devem ser informados."
            );
        }

        const products = await repository.getProductsByPagination(take, skip, storeId, filter);
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
        urlImage: string | undefined,
        storeId: string | undefined
    ) {
        if (
            description === undefined ||
            price === undefined ||
            type === undefined ||
            urlImage === undefined ||
            storeId === undefined
        ) {
            throw new Error(
                "Para criar um produto, a descrição, o preço, o tipo, id da loja e a url da imagem devem ser informados."
            );
        }

        const storeExist = await storesRepository.getStoreById(storeId);

        if (!storeExist) throw new Error("Loja não encontrada.");

        await repository.createProduct(description, price, type, urlImage, storeId);
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

        const productInOrder = await productsOrderRepository.getProductById(product.id);

        if (productInOrder) throw new Error("Produto consta em um ou mais pedidos e não pode ser excluído.");

        await repository.deleteProduct(id);
    }
}

export default ProductsService;
