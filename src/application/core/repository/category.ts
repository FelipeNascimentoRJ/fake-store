import Symbols from '../../symbols';
import Container from '../../container';
import {ClientHttpAdapter} from '../protocols/adapter/client-http';
import {CategoryRepository} from '../../domain/repository/category';

export class CategoryRepositoryImplementation implements CategoryRepository {
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

  public async getAllCategories(): Promise<string[]> {
    const url: string = `${this.baseUrl}/products/categories`;
    const response = await this.clientHttp.get<string[]>(url);

    return response.body;
  }
}
