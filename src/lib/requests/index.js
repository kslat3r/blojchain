const request = require('request-promise');

class Request {
  async get (url, params) {
    return await this.request('GET', url, undefined, params);
  }

  async post (url, data, params) {
    return await this.request('POST', url, data, params);
  }

  async put (url, data, params) {
    return await this.request('PUT', url, data, params);
  }

  async patch (url, data, params) {
    return await this.request('PATCH', url, data, params);
  }

  async delete (url, params) {
    return await this.request('DELETE', url, undefined, params);
  }

  async request (method, url, data = {}, params = {}) {
    return await request({
      method,
      uri: url,
      json: true,
      qs: params.query || {},
      headers: params.headers || {},
      body: data,
    });
  }
}

module.exports = Request;
