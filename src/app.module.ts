import { Module } from '@nestjs/common';
import { CustomConfigsModule } from './modules/config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmDBConfig } from './config/typeorm.config';
import { UserModule } from './modules/user/user.module';
import { UserEntity } from './modules/user/entities/user.entity';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    CustomConfigsModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmDBConfig,
      inject: [TypeOrmDBConfig],
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [TypeOrmDBConfig],
})
export class AppModule {}
