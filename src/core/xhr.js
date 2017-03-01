import reqwest from 'reqwest';

/**
 * Сформировать URL — подставляет в url, поля из объекта с данными.
 * Попутно удаляет из объекта поля, которые были добавлены в url.
 * @param {string} url Адрес запроса
 * @param {object} [data] Hashmap данных запроса, если не задано,
 *                        то url останется без изменений
 * @param {boolean} [formatArrays=false] преобразовать ли массивы в query string
 * @return {object} {url: сформированный url, data: обновленный набор данных}
 */
const formatUrl = (url, data, formatArrays = false) => {
  var replacedFields = {};

  var newUrl = url.replace(/{([a-z_]+)}/ig, function(match, field) {
    if (data[field]) {
      replacedFields[field] = true;
      return data[field];
    } else {
      return field;
    }
  });

  let newData = {_queryString: '?'};
  for (let field in data) {
    if (!replacedFields[field]) {
      if (formatArrays && Array.isArray(data[field]) && data[field].length) {
        let oldArray = data[field].reduce((a, b, i) =>`${a}${i ? '&' : ''}${field}=${escape(b)}`, '');
        newData._queryString += oldArray;
      } else {
        newData[field] = data[field];
      }
    }
  }

  return {url: newUrl, data: newData};
};


/**
 * Метод для формирования запроса
 * @param {string} url Адрес запроса
 * @param {string} [method=get] Метод (get, post, etc.)
 * @param {object} [data] Hashmap данных запроса
 * @param {boolean} [asJSON=true] Отправить данные в формате json
 * @return {Promise}
 */
export default (url, method = 'get', data = null, asJSON = true) => {
  let request = formatUrl(url, data, (method === 'get'));

  let queryString = request.data._queryString;
  delete request.data._queryString;

  return new Promise((resolve, reject) => {
    reqwest({
      url: request.url += queryString.length > 1 ? queryString : '',
      method: method,
      type: 'json',
      crossOrigin: true,
      contentType: asJSON ? 'application/json' : 'application/x-www-form-urlencoded',
      withCredentials: true,

      success: (res) => {
        resolve(res);
      },

      error: ({response}) => {
        try {
          let {error: {code, description}} = JSON.parse(response);
          let errorCode = isNaN(parseInt(code)) ? code : parseInt(code);
          reject({
            code: errorCode,
            message: description
          });
        } catch (e) {
          reject({
            code: 500,
            message: 'Server 500 ERROR'
          });
        }
      }
    });
  })
  .catch(error => {
    // TODO: add error handling
    console.warn('request failed ', error);

    return Promise.reject(error);
  });
};
