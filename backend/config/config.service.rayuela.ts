import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';

config();

class ConfigServiceRayuela {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }
    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public isProduction() {
    const mode = this.getValue('IZ_ENV', false);
    return mode === 'production';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.getValue('IZ_DB_HOST'),
      port: parseInt(this.getValue('IZ_DB_PORT')),
      username: this.getValue('IZ_DB_USER'),
      password: this.getValue('IZ_DB_PASS'),
      database: this.getValue('IZ_DB_NAME'),

      entities: ['dist/api/**/*.entity{.ts,.js}'],

      synchronize: !this.isProduction(),
      logging: this.isProduction() ? ['error'] : 'all',

      migrationsTableName: 'migration',
      migrations: ['backend/migration/*.ts'],
      cli: {
        migrationsDir: 'backend/migration',
      },
    };
  }
}

const configService = new ConfigServiceRayuela(process.env).ensureValues([
  'IZ_ENV',
  'IZ_DB_HOST',
  'IZ_DB_PORT',
  'IZ_DB_USER',
  'IZ_DB_PASS',
  'IZ_DB_NAME',
]);

export { configService };
