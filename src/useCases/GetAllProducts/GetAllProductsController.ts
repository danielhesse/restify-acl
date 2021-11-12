import { Request, Response } from 'restify';

import { GetAllProducts } from './GetAllProducts';

class GetAllProductsController {
  async handle(_: Request, response: Response) {
    const getAllProducts = new GetAllProducts();

    const products = await getAllProducts.execute();

    return response.json(products);
  }
}

export { GetAllProductsController };
