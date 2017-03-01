import React, {PropTypes} from 'react';

import './CurrencyCalc.styl';

export default class CurrencyCalc extends React.PureComponent {
  constructor() {
    super();

    this._handleInput = this._handleInput.bind(this);
    this._changeCurrency = this._changeCurrency.bind(this);

    this.state = {
      currency: 'RUB',
      inputData: 0
    };
  }

  _changeCurrency(event) {
    this.setState({
      currency: event.target.value
    });
  }

  _handleInput(event) {
    this.setState({
      inputData: event.target.value
    });
  }

  _calculateResult(input, rate) {
    return parseFloat(input * rate).toFixed(2);
  }

  render() {
    const {
      currency,
      inputData
    } = this.state;

    const {rates} = this.props.currencyData;

    const calculated = this._calculateResult(inputData, rates[currency]);

    const currencyTypes = !!rates ? Object.keys(rates).map(r => (
        <option key={`currency-${r}`} value={r}>
          {r}
        </option>
      )
    ) : '';

    return (
      <div className="calc">
        <div>
          <span>Валюта для конвертации</span>
          <select value={currency} className="calc__currency-select" onChange={this._changeCurrency}>
            {currencyTypes}
          </select>
        </div>
        <div className="calc__input-wrapper">
          <span>€</span>
          <input
            type="text"
            value={inputData}
            onChange={this._handleInput}
            className="calc__value-input"/>
        </div>
        <div className="calc__output-wrapper">
          <span>{currency}</span>
          <span>{calculated}</span>
        </div>
      </div>
    );
  }
}

CurrencyCalc.propTypes = {
  currencyData: PropTypes.object
};
