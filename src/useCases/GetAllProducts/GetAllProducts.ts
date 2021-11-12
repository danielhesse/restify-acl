import { ProductsRepository } from '../../repositories';

class GetAllProducts {
  async execute() {
    const products = await ProductsRepository().find();

    return products;
  }
}

export { GetAllProducts };
