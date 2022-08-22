import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SectorModule } from './sector/sector.module';
import { SolicitationModule } from './solicitation/solicitation.module';
import { SolutionModule } from './solution/solution.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule,
    SectorModule,
    SolicitationModule,
    SolutionModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      schema: 'help_desk',
      database: 'help_ceuma',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
