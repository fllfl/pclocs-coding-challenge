import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { connect } from 'react-redux';
import { selectProduct } from '../Actions/ProductActions';


let counter = 1;


class Product extends React.Component {

  renderAttribute(key, value) {
    const k = key.replace('_', ' ');
    return (
      <View key={k} style={styles.detail}>
        <Text>{`${k} - ${value}`}</Text>
      </View>
    )
  }

  renderTrade = ({ time, trade_id, size, side }) => {

    return (
      <View style={styles.trade} key={trade_id}>
        {this.renderAttribute('time', moment(time).format("MMM Do h:mm:ss"))}
        {this.renderAttribute('id', trade_id) }
        {this.renderAttribute('size', size) }
        {this.renderAttribute('side', side) }
      </View>
    );

  }

  render() {
    const { selectedProduct, selectedTrades } = this.props;
    const pairs = Object.keys(selectedProduct).map((k) => this.renderAttribute(k, selectedProduct[k]));
    const trades = selectedTrades.map(this.renderTrade);
    return (
      <View style={styles.container}>
        <View style={styles.topOfScreen}>
          <TouchableOpacity onPress={this.props.onBackPress}>
            <Text style={styles.backButton}>{"Back"}</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.content}>
          <View style={styles.content}>
            <View style={styles.details}>
              <Text style={styles.heading}>{ 'Details'}</Text>
              { pairs }
            </View>
            <View>
              <Text style={styles.heading}>{ 'Latest Trades '}</Text>
            </View>
            { trades }
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  content: {
    flex: 0.9,
  },
  detail: {
    height: 22,
    paddingTop: 3,
  },
  details: {
    marginTop: 20,
    flex: 1,
  },
  heading: {
    marginTop: 10,
    fontSize: 20,
  },
  trade: {
    marginTop: 15,
    flex: 1,
  },
  topOfScreen: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  backButton: {
    color: '#0000FF',
  }
});

const mapStateToProps = state => ({
  selectedProduct: state.selectedProduct,
  selectedTrades: state.selectedTrades,
});

export default connect(mapStateToProps)(Product);
