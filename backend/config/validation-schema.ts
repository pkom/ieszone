import * as Joi from '@hapi/joi';

export default Joi.object({
  IZ_APP: Joi.string().default('Ieszone'),
  IZ_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  IZ_PORT: Joi.number().default(3000),
  IZ_VERSION: Joi.string().default('v1'),
  IZ_DB_USER: Joi.string().required(),
  IZ_DB_PASS: Joi.string().required(),
  IZ_DB_NAME: Joi.string().required(),
  IZ_DB_HOST: Joi.string().required(),
  IZ_DB_PORT: Joi.number().default(5432),

  IZ_GOOGLE_API_KEY: Joi.string(),
  IZ_JWT_SECRET: Joi.string().required(),
  IZ_JWT_EXPIRATION: Joi.string().default('60s'),

  IZ_LDAP_HOST: Joi.string().required(),
  IZ_LDAP_USER: Joi.string().required(),
  IZ_LDAP_PASSWORD: Joi.string().required(),
  IZ_LDAP_CERT: Joi.string().required(),
});
