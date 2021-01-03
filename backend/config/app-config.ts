export default () => ({
  port: +process.env.IZ_PORT,
  env: process.env.IZ_ENV,
  appName: process.env.IZ_APP,
  version: process.env.IZ_VERSION,
  googleApiKey: process.env.IZ_GOOGLE_API_KEY,
  jwtSecret: process.env.IZ_JWT_SECRET,
  jwtTokenExp: process.env.IZ_JWT_EXPIRATION,
  database: {
    host: process.env.IZ_DB_HOST,
    port: +process.env.IZ_DB_PORT,
    username: process.env.IZ_DB_USER,
    password: process.env.IZ_DB_PASS,
    name: process.env.IZ_DB_NAME,
  },
  ldap: {
    host: process.env.IZ_LDAP_HOST,
    user: process.env.IZ_LDAP_USER,
    password: process.env.IZ_LDAP_PASSWORD,
    certificate: process.env.IZ_LDAP_CERT,
  },
});
