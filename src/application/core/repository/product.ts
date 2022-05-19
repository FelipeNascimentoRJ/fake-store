import Symbols from '../../symbols';
import Container from '../../container';
import {ProductEntity} from '../../domain/entity/product';
import {ProductRepository} from '../../domain/repository/product';
import {ClientHttpAdapter} from '../protocols/adapter/client-http';

export class ProductRepositoryImplementation implements ProductRepository {
  private readonly clientHttp: ClientHttpAdapter;
  private readonly baseUrl: string = 'https://fakestoreapi.com';

  constructor() {
    if (!Container.has(Symbols.adapters.clientHttp)) {
      throw new Error('ClientHttpAdapter not registered');
    }

    this.clientHttp = Container.resolve<ClientHttpAdapter>(
      Symbols.adapters.clientHttp,
    ) as ClientHttpAdapter;
  }

  public async getAllProducts(): Promise<ProductEntity[]> {
    const url: string = `${this.baseUrl}/products`;
    const response = await this.clientHttp.get<ProductEntity[]>(url);

    return response.body;
  }

  public async getProductsByCategory(
    category: string,
  ): Promise<ProductEntity[]> {
    const url: string = `${this.baseUrl}/products/category/${category}`;
    const response = await this.clientHttp.get<ProductEntity[]>(url);

    return response.body;
  }
}
