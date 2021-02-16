/** @module http-client */

export interface RequestOption {
  method: 'GET' | 'POST' | 'PUT' | 'OPTION';
  body?: any;
  customConf?: any;
}

/**
 * basic client untuk request ke server
 * @param {string} endpoint target / url endpoint
 * @param {Object} json isi request
 * @param {RequestInit} options tambahan opsi request
 * @return {Promise<any>} hasil request
 */
export async function client(endpoint: string, json?: any, options?: RequestOption): Promise<any> {
  let headers;
  if (json) {
    headers = { 'Content-Type': 'application/json' };
  }

  const config = {
    method: options?.method ?? 'GET',
    ...options?.customConf,
    headers: {
      ...headers,
      ...options?.customConf?.headers,
    },
  };

  if (options?.body) {
    if (json) {
      config.body = JSON.stringify(options?.body);
    } else {
      const formData = new FormData();
      for (const name in options?.body) {
        formData.append(name, options?.body[name]);
      }
      config.body = formData;
    }
  }

  let data;
  try {
    const response = await window.fetch(endpoint, config);
    data = await response.json();
    if (!response.ok) {
      throw new Error(data?.statusText ?? 'Gagal request ke api');
    }

    return data;
  } catch (err) {
    return Promise.reject(err?.message || data);
  }
}

/**
 * request dengan method GET
 * @param {string} endpoint target / url endpoint
 * @param {RequestInit} option tambahan opsi request
 */
client.get = (endpoint:string, customConf:any = {}): Promise<any> => {
  return client(endpoint, true, { method: 'GET', ...customConf });
};

/**
 * request dengan method POST
 * @param {string} endpoint target / url endpoint
 * @param {Object} body isi dari body request
 * @param {Object} json isi request
 * @param {RequestInit} option tambahan opsi request
 */
client.post = (endpoint: string, body: any, json: any, customConf: any = {}): Promise<any> => {
  return client(endpoint, json, { method: 'POST', body, ...customConf });
};

/**
 * request dengan method PUT
 * @param {string} endpoint target / url endpoint
 * @param {Object} body isi dari body request
 * @param {Object} json isi request
 * @param {RequestInit} option tambahan opsi request
 */
client.put = (endpoint: string, body: any, json: any, customConf: any = {}): Promise<any> => {
  return client(endpoint, json, { method: 'PUT', body, ...customConf });
};

/**
 * request dengan method DEL
 * @param {string} endpoint target / url endpoint
 * @param {Object} body isi dari body request
 * @param {Object} json isi request
 * @param {RequestInit} option tambahan opsi request
 */
client.del = (endpoint: string, body: any, json: any, customConf: any = {}): Promise<any> => {
  return client(endpoint, json, { method: 'DELETE', body, ...customConf });
};
