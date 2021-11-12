import { Request, Response } from 'restify';

import { CreateProduct } from './CreateProduct';

class CreateProductController {
  async handle(request: Request, response: Response) {
    const { name, description, price } = request.body;

    const createProduct = new CreateProduct();

    const product = await createProduct.execute({
      name,
      description,
      price,
    });

    return response.json(product);
  }
}

export { CreateProductController };
