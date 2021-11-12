import { ProductsRepository } from '../../repositories';

interface IRequest {
  name: string;
  description: string;
  price: number;
}

class CreateProduct {
  async execute({ name, description, price }: IRequest) {
    const product = ProductsRepository().create({
      name,
      description,
      price,
    });

    await ProductsRepository().save(product);

    return product;
  }
}

export { CreateProduct };
