import * as rc from 'rc';

const defaultConfig = {
  database: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'database',
  },
  storage: {
    endPoint: '127.0.0.1',
    port: 9000,
    useSSL: false,
    accessKey: 'admin',
    secretKey: 'password',
  },
  serverWorker: {
    port: 7001,
  },
  serverTask: {
    port: 7002,
  },
  serverPerformance: {
    port: 7003,
  },
};

export const config = rc('tm', defaultConfig);