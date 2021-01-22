// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { name, version } from '../../../../package.json';

export const environment = {
  production: false,
  NAME: name,
  VERSION: version,
  REST_USER: 'http://localhost:3000/v1',
  REST_CORE: 'http://localhost:3000/v1',
  REST_CUSTOMER_SUPPORT: 'http://localhost:3000/v1',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
