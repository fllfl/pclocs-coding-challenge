import React from 'react';
import { ListView, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { selectProduct } from '../Actions/ProductActions';


class ProductList extends React.Component {

  renderRow = (product) => {
    return (
      <TouchableOpacity style={styles.row} onPress={() => this.props.onProductPress(product)}>
        <Text>{product.id}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <ListView
        style={styles.listView}
        dataSource={this.props.dataSource}
        renderRow={this.renderRow}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
      />
    );
  }
}


const styles = StyleSheet.create({
  row: {
    height: 50,
    padding: 10,
    alignSelf: 'stretch',
  },
  listView: {
    marginTop: 60,
    alignSelf: 'stretch',
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.id !== r2.id });

const mapStateToProps = state => ({
  dataSource: ds.cloneWithRows(state.products),
});

export default connect(mapStateToProps)(ProductList);
