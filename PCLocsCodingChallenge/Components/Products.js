import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Alert } from 'react-native';
import ProductList from './ProductList';
import Product from './Product';
import GDax from '../API/GDax';
import { setProducts, selectProduct, updateProduct } from '../Actions/ProductActions';


class Products extends React.Component {

  componentDidMount() {
    this.gdax = new GDax(this.onProductsData, this.onTickerData, this.onError);
    this.populateInitialData();
  }

  populateInitialData = () => {
    this.gdax.populateData();
  }

  onProductsData = (products) => {
    this.props.dispatch(setProducts(products));
  }

  onTickerData = (data) => {
    this.props.dispatch(updateProduct(data));
  }

  onBackPress= () => {
    this.props.dispatch(selectProduct(null, null));
  }

  onError = (err) => {
    Alert.alert(
      'Connection Error',
      err.message,
      [
        { text: 'OK', onPress: this.populateInitialData },
      ],
      { cancelable: false },
    );
  }

  onProductPress = (product) => {
    this.gdax.fetchProductTrades(product.id).then((response) => {
      response.json().then(trades => {
        this.props.dispatch(selectProduct(product, trades));
      });
    }).catch(this.onError);
  }

  render() {
    if (this.props.selectedProduct) {
      return <Product onBackPress={this.onBackPress} />;
    }
    return <ProductList onProductPress={this.onProductPress} />;
  }
}

const mapStateToProps = state => ({
  selectedProduct: state.selectedProduct,
});

export default connect(mapStateToProps)(Products);
