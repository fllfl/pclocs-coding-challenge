import Constants from './Constants';


export default class GDax {
  constructor(productsCallback, tickerCallback, errorCallback) {
    this.errorCallback = errorCallback;
    this.productsCallback = productsCallback;
    this.tickerCallback = tickerCallback;
  }

  populateData = () => {
    return fetch(`${Constants.restAPI}${Constants.products}`).then(response => response.json())
      .then((resp) => {
        this.productsCallback(resp);
        this.openSocket(resp.map(product => product.id));
      }).catch((error) => {
        this.errorCallback(error);
      });
  }

  openSocket = (productIds) => {
    const ws = new WebSocket('wss://ws-feed-public.sandbox.gdax.com');
    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: 'subscribe',
        product_ids: productIds,
        channels: [
          'ticker',
        ],
      }));
    };

    ws.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        data.type === 'ticker' && this.tickerCallback(data);
      } catch(e) {
        console.warn(e);
      }
    };

    ws.onerror = (e) => {
      console.log(e.message);
      this.errorCallback(error);
    };

    ws.onclose = (e) => {
      // connection closed
      console.log(e);
      setTimeout(() => this.openSocket(productIds), 1000);
    };
    this.ws = ws;
  }

  fetchProductTrades = (productId) => {
    return fetch(`${Constants.restAPI}${Constants.products}/${productId}/trades`);
  }

}
