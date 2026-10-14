const products = require('../../src/data/products');
const { sortProductsByPrice } = require('../../src/catalog');

describe('sortProductsByPrice', () => {
  test("сортирует по возрастанию, направление 'asc'", () => {
    expect(sortProductsByPrice(products, 'asc').map((p) => p.id)).toEqual([3, 6, 5, 4, 2, 1]);
  });

  test('сортирует по возрастанию, направление не передано', () => {
    expect(sortProductsByPrice(products).map((p) => p.id)).toEqual([3, 6, 5, 4, 2, 1]);
  });

  test("сортирует по возрастанию товары с ID [1, 3, 4], направление 'asc'", () => {
    const subset = products.filter(({ id }) => [1, 3, 4].includes(id));
    expect(sortProductsByPrice(subset, 'asc').map((p) => p.id)).toEqual([3, 4, 1]);
  });

  test("сортирует по убыванию, направление 'desc'", () => {
    expect(sortProductsByPrice(products, 'desc').map((p) => p.id)).toEqual([1, 2, 4, 5, 6, 3]);
  });

  test("сортирует по убыванию товары с ID [3, 1, 4], направление 'desc'", () => {
    const subset = products.filter(({ id }) => [3, 1, 4].includes(id));
    expect(sortProductsByPrice(subset, 'desc').map((p) => p.id)).toEqual([1, 4, 3]);
  });

  test("сортирует по убыванию товары с ID [5, 2, 6], направление 'desc'", () => {
    const subset = products.filter(({ id }) => [5, 2, 6].includes(id));
    expect(sortProductsByPrice(subset, 'desc').map((p) => p.id)).toEqual([2, 5, 6]);
  });

  test("не меняет исходный массив для товаров с ID [1, 3, 4], вызов с 'asc'", () => {
    const subset = products.filter(({ id }) => [1, 3, 4].includes(id));
    sortProductsByPrice(subset, 'asc');
    expect(subset.map((p) => p.id)).toEqual([1, 3, 4]);
  });

  test("не меняет исходный массив для товаров с ID [1, 3, 4], вызов с 'desc'", () => {
    const subset = products.filter(({ id }) => [1, 3, 4].includes(id));
    sortProductsByPrice(subset, 'desc');
    expect(subset.map((p) => p.id)).toEqual([1, 3, 4]);
  });

  test('не меняет исходный массив для всех products, направление не передано', () => {
    const snapshot = [...products];
    sortProductsByPrice(snapshot);
    expect(snapshot.map((p) => p.id)).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
