import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { selectProduct } from '../Actions/ProductActions';


let counter = 1;


class Product extends React.Component {

  componentDidMount() {
    setInterval(() => {
      counter = counter + 1;
      this.props.dispatch(selectProduct(counter));
    }, 1000);
  }

  render() {
    return (
        <View style={styles.container}>
          <Text>{ this.props.product }</Text>
        </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    product: state.selectedProduct,
  };
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default connect(mapStateToProps)(Product);
