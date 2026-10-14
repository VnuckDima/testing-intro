const products = require('../../src/data/products');
const { searchProducts } = require('../../src/catalog');

describe('searchProducts', () => {
  test("находит товар по точному совпадению 'Наушники'", () => {
    expect(searchProducts(products, 'Наушники').map((p) => p.id)).toEqual([1]);
  });

  test("находит товар по точному совпадению 'Чистый код'", () => {
    expect(searchProducts(products, 'Чистый код').map((p) => p.id)).toEqual([6]);
  });

  test("находит товар по точному совпадению 'Настольная лампа'", () => {
    expect(searchProducts(products, 'Настольная лампа').map((p) => p.id)).toEqual([4]);
  });

  test("ищет без учёта регистра, запрос 'javascript'", () => {
    expect(searchProducts(products, 'javascript').map((p) => p.id)).toEqual([3]);
  });

  test("ищет без учёта регистра, запрос 'ЧЕХОЛ'", () => {
    expect(searchProducts(products, 'ЧЕХОЛ').map((p) => p.id)).toEqual([5]);
  });

  test("ищет без учёта регистра, запрос 'наушники'", () => {
    expect(searchProducts(products, 'наушники').map((p) => p.id)).toEqual([1]);
  });

  test("возвращает все товары для пустого запроса ''", () => {
    expect(searchProducts(products, '').map((p) => p.id)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test("возвращает все товары для запроса из пробелов '   '", () => {
    expect(searchProducts(products, '   ').map((p) => p.id)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test("возвращает все товары для запроса '\\t\\n'", () => {
    expect(searchProducts(products, '\t\n').map((p) => p.id)).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
