export interface LoadCategoriesUseCase {
  execute(): Promise<string[]>;
}
