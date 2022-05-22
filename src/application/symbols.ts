const Symbols = {
  repositories: {
    cart: Symbol.for('cart.repository'),
    product: Symbol.for('product.repository'),
    category: Symbol.for('category.repository'),
  },
  useCases: {
    loadCart: Symbol.for('load-cart.usecase'),
    loadProducts: Symbol.for('load-products.usecase'),
    loadProductsByCategory: Symbol.for('load-products-by-category.usecase'),
    loadCategories: Symbol.for('load-categories.usecase'),
    addCartProduct: Symbol.for('add-cart-product.usecase'),
    reduceCartProduct: Symbol.for('reduce-cart-product.usecase'),
    clearCart: Symbol.for('clear-cart.usecase'),
  },
  adapters: {
    clientHttp: Symbol.for('adapters.clientHttp'),
    clientStorage: Symbol.for('adapters.clientStorage'),
  },
};

export default Symbols;
