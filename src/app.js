import React from 'react';
import currencyActions from './actions/currency';

import CurrencyCalc from './components/CurrencyCalc.js';

import './app.styl';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currencyData: null
    };
  }

  componentDidMount() {
    this._getCurrency();

    setInterval(() => {
      this._getCurrency();
    }, 30 * 1000);
  }

  _getCurrency() {
    Promise.resolve()
      .then(() => currencyActions.getCurrencyData())
      .then((data) => {
        if (!!data && !!data.rates) {
          this.setState({
            currencyData: data
          });
        }
      });
  }

  render() {
    const {
      currencyData
    } = this.state;

    return (
      <div className="app-wrapper">
        {
          !!currencyData ? (
            <CurrencyCalc
              currencyData={this.state.currencyData}/>
          ) : 'Подождите, идет загрузка'
        }
      </div>
    );
  }
}
