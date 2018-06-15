import Types from './Types';

export function selectProduct(selectedProduct, selectedTrades) {
  return { type: Types.select_product, payload: { selectedProduct, selectedTrades } };
}

export function setProducts(products) {
  return { type: Types.set_products, payload: products };
}

export function updateProduct(tickerData) {
  return { type: Types.update_product, payload: tickerData };
}
