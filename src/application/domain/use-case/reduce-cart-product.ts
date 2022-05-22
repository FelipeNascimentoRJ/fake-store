export interface ReduceCartProductUseCase {
  execute(productId: number): Promise<void>;
}
