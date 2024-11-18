export function sortById(products: Product[]) {
  return products.sort((a, b) => a.id - b.id);
}
