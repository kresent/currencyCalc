import xhr from '../core/xhr';

export default class PrivatePageActions {

  static getCurrencyData() {
    return Promise.resolve()
    .then(() => xhr('http://api.fixer.io/latest'))
    .then((data) => data)
    .catch(error => {
      // TODO: add error handler
      console.warn('xhr failed ', error);
      return error;
    });
  }

}
