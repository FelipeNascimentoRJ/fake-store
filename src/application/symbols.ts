const Symbols = {
  repositories: {
    product: Symbol.for('product.repository'),
    category: Symbol.for('category.repository'),
  },
  adapters: {
    clientHttp: Symbol.for('adapters.clientHttp'),
    clientStorage: Symbol.for('adapters.clientStorage'),
  },
};

export default Symbols;
