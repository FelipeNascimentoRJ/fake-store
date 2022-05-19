import Container from './container';

afterEach(() => {
  jest.clearAllMocks();
  Container.clear();
});

describe('Container', () => {
  it('should return false when resource arrives and is not available', () => {
    const has = Container.has(Symbol.for('any_key'));

    expect(has).toBeFalsy();
  });

  it('should return true when resource arrives and is available', () => {
    const key = Symbol.for('any_key');

    const value = function () {
      return 'any_value';
    };

    Container.register(key, value);

    const has = Container.has(Symbol.for('any_key'));

    expect(has).toBeTruthy();
  });

  it('should return undefined when resource arrives and is not available', () => {
    const has = Container.resolve(Symbol.for('any_key'));

    expect(has).toBeFalsy();
  });
});
