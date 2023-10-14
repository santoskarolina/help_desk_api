import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SectorEntity } from 'src/sector/entities/sector.entity';
import { SolicitationEntity } from 'src/solicitation/entities/solicitation.entity';
import { SolutionEntity } from 'src/solution/entities/solution.entity';
import { UserEntity } from 'src/user/entities/user.entity';
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
      type: 'postgres',
      host: this.getValue('TYPEORM_HOST'),
      port: 5432,
      username: this.getValue('TYPEORM_USERNAME'),
      password: this.getValue('TYPEORM_PASSWORD'),
      database: this.getValue('TYPEORM_DATABASE'),
      entities: [UserEntity, SectorEntity, SolicitationEntity, SolutionEntity],
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
