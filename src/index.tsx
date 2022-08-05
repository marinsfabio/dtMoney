import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import { createServer, Model } from 'miragejs';
import { App } from './App';

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'freelancer de website',
          type: 'deposit',
          category: 'Dev',
          amount: 6000,
          createAt: new Date('2022-02-12 09:00:00'),
        },
        {
          id: 2,
          title: 'aluguel',
          type: 'withdraw',
          category: 'casa',
          amount: 1100,
          createAt: new Date('2022-02-14 11:00:00'),
        },
      ],
    })
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
     return this.schema.all('transaction')
    })

    this.post('./transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)

      return schema.create('transaction', data)
    })
  }
})



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);