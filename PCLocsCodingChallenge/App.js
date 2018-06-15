import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './Reducer';
import Products from './Components/Products';


const store = createStore(reducer);


export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Products onProductPress={this.onProductPress} />
      </Provider>
    );
  }
}
