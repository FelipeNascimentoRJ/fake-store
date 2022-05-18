export default class Container {
  private static readonly container: Map<symbol, any> = new Map<symbol, any>();

  public static has(key: symbol): boolean {
    return this.container.has(key);
  }

  public static register<T = any>(key: symbol, value: T): void {
    this.container.set(key, value);
  }

  public static resolve<T>(key: symbol, ...args: any[]): T | undefined {
    if (!this.container.has(key)) {
      return;
    }

    const reference = this.container.get(key);

    return new reference(...args);
  }
}
