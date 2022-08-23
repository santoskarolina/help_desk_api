import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SectorModule } from './sector/sector.module';
import { SolicitationModule } from './solicitation/solicitation.module';
import { SolutionModule } from './solution/solution.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { configService } from './config/config.service';

@Module({
  imports: [
    UserModule,
    SectorModule,
    SolicitationModule,
    SolutionModule,
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
