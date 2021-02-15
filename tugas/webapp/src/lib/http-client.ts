/** @module http-client */

import { WorkerData, TaskData} from '../../typing'

export interface RequestOption {
  method: 'GET' | 'POST' | 'PUT' | 'OPTION' | 'DELETE';
  body?: any;
  customConf?: any;
  json?: any;
}


/**
 * basic client untuk request ke server
 * @param {string} endpoint target / url endpoint
 * @param {Object} json isi request
 * @param {RequestInit} options tambahan opsi request
 * @return {Promise<any>} hasil request
 */
export async function client(endpoint : string, options : RequestOption) {
  let headers;
  if (options?.json) {
    headers = { 'Content-Type': 'application/json' };
  }

  const config = {
    method : options?.method || 'GET',
    ...options?.customConf,
    headers: {
      ...headers,
      ...options.customConf?.headers,
    },
  };

  if (options?.body) {
    if (options?.json) {
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
      throw new Error(data.statusText);
    }

    return data;
  } catch (err) {
    return Promise.reject(err.message || data);
  }
}

/**
 * request dengan method GET
 * @param {string} endpoint target / url endpoint
 * @param {RequestInit} option tambahan opsi request
 */
client.get = (endpoint:string, customConf : any= {}) => {
  const config: RequestOption = {
    method: 'GET',
    ...customConf
  };
  return client(endpoint, config);
};

/**
 * request dengan method POST
 * @param {string} endpoint target / url endpoint
 * @param {Object} body isi dari body request
 * @param {Object} json isi request
 * @param {RequestInit} option tambahan opsi request
 */
client.post = (endpoint : string, body : TaskData, customConf: any= {}) => {
  const config :RequestOption = {
    method: 'POST',
    body : body, 
    ...customConf 
  }
  return client(endpoint, config );
};

/**
 * request dengan method PUT
 * @param {string} endpoint target / url endpoint
 * @param {Object} body isi dari body request
 * @param {Object} json isi request
 * @param {RequestInit} option tambahan opsi request
 */
client.put = (endpoint :string , body? : TaskData, json? :JSON, customConf = {}) => {
  const config : RequestOption = {
    method: 'PUT',    
    ...customConf 
  }
  return client(endpoint, config);
};

/**
 * request dengan method DEL
 * @param {string} endpoint target / url endpoint
 * @param {Object} body isi dari body request
 * @param {Object} json isi request
 * @param {RequestInit} option tambahan opsi request
 */
client.del = (endpoint: string, body? : TaskData, json? :JSON , customConf = {}) => {
  const config :RequestOption = {
    json, 
    method: 'DELETE',
    body : body,
    ...customConf 
  }
  return client(endpoint, config);
};

