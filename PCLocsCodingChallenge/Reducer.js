import Types from './Actions/Types';

const initialState = {
  products: [],
  selectedProduct: null,
  selectedTrades: [],
  error: false,
};

const reduce = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case Types.select_product:
      const { selectedTrades, selectedProduct } = payload;
      console.log(selectedProduct, selectedTrades, '********');
      return Object.assign({}, state, { selectedProduct, selectedTrades });
    case Types.set_products:
      return Object.assign({}, state, { products: payload });
    case Types.set_error:
      return Object.assign({}, state, { error: payload });
    case Types.update_product:
      const products = [...state.products];
      var foundIndex = products.findIndex(x => x.id == payload.product_id);
      products[foundIndex] = Object.assign({}, products[foundIndex], payload);
      return Object.assign({}, state, { products });
    default:
      return state;
  }
};

export default reduce;
