import { name, version } from '../../../../package.json';

export const environment = {
  production: true,
  NAME: name,
  VERSION: version,
  REST_CORE: 'http://localhost:3000/v1',
};
