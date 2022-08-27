/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

require('dotenv').config();

class ConfigService {
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

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      // url: this.getValue('DATABASE_URL'),
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'help_ceuma',
      entities: ['dist/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      // ssl: {
      //   rejectUnauthorized: false,
      // },
      synchronize: false,
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'TYPEORM_HOST',
  'TYPEORM_PORT',
  'TYPEORM_USERNAME',
  'TYPEORM_PASSWORD',
  'TYPEORM_DATABASE',
  'DATABASE_URL'
]);

export { configService };
