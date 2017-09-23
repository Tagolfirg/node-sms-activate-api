/* @flow */

const requestp: Function = require('request-promise');

class SmsActivate {
  static DEBUG = false;
  static defaults = {
    url: 'http://sms-activate.ru/stubs/handler_api.php'
  }

  _apikey: string;
  _url: string = SmsActivate.defaults.url;

  constructor(apikey: string, url?: string) {
    if (typeof apikey !== 'string')
      throw new TypeError('API Key must be a string');

    this._apikey = apikey;
    if (url) this._url = url;
  }

  async getBalance(): Promise<number> {
    const res = await this._method('getBalance');

    const match = res.match(/ACCESS_BALANCE:(.+)/);

    if (!match) throw new Error(res);

    return parseFloat(match[1]);
  }

  async getNumber(
    service: string,
    options?: {
      forward?: 0 | 1,
      operator?: string,
      ref?: string,
      country?: number
    } = {}
  ): Promise<{ id: string, number: string }> {

    const res = await this._method('getNumber', { service, ...options });

    const match = res.match(/ACCESS_NUMBER:(.+?):(.+)/);

    if (!match) throw new Error(res);

    return { id: match[1], number: match[2] };
  }

  /**
   * @async
   * @private
   * @arg {string} method Method name
   * @arg {object} [opts] Options
   * @return {Promise<string>} Response
   */
  async _method(method: string, opts?: Object = {}): Promise<string> {
    const req = {
      ...opts,
      api_key: this._apikey,
      action: method
    };

    if (SmsActivate.DEBUG) console.log('SmsActivate Request:', req);

    const res: string = await requestp({
      uri: this._url,
      qs: req
    });

    if (SmsActivate.DEBUG) console.log('SmsActivate Response:', res);

    return res;
  }
}

module.exports = SmsActivate;
