import request from 'request-promise';

const getOpts = (method, uri, qs = {}, body = {}) => {
  return {
    method,
    uri,
    qs,
    headers: {
      'Content-Type': 'application/json',
    },
    body,
    json: true,
  };
};

const makeRequest = (method, uri, query = {}, data = {}) => {
  return request(getOpts(method, uri, query, data))
    .then((response) => {
      return response;
    })
    .catch((err) => {
      throw err;
    });
};

export function get (uri, query = {}) {
  return makeRequest('get', uri, query);
}

export function post (uri, data = {}, query = {}) {
  return makeRequest('post', uri, query, data);
}

export function put (uri, data = {}, query = {}) {
  return makeRequest('put', uri, query, data);
}

export function patch (uri, data = {}, query = {}) {
  return makeRequest('patch', uri, query, data);
}

export function del (uri, query = {}) {
  return makeRequest('delete', uri, query);
}
