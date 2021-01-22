import { name, version } from '../../../../package.json';

export const environment = {
  production: true,
  NAME: name,
  VERSION: version,
  REST_USER: 'http://localhost:3000',
  REST_CORE: 'http://localhost:3000',
  REST_CUSTOMER_SUPPORT: 'http://localhost:3000',
};
