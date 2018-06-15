
const reduce = (state = {}, action) => {

  switch (action.type) {
    case 'SELECT_PRODUCT':
      const selectedProduct = action.payload;
      return Object.assign({}, state, { selectedProduct });
    case 'SET_PRODUCTS':
      const products = action.payload;
      return Object.assign({}, state, { products });
    default:
      return state;
  }

}

export default reduce
