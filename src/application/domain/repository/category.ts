export interface CategoryRepository {
  getAllCategories: () => Promise<string[]>;
}
