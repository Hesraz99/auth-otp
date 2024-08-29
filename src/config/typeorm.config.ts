import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/user/entities/user.entity';

@Injectable()
export class TypeOrmDBConfig implements TypeOrmOptionsFactory {
  constructor(private readonly configservice: ConfigService) {}
  createTypeOrmOptions(
    connectionName?: string,
  ): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      type: 'postgres',
      port: this.configservice.get('DB.port'),
      host: this.configservice.get('DB.host'),
      username: this.configservice.get('DB.username'),
      password: this.configservice.get('DB.password'),
      database: this.configservice.get('DB.database'),
      synchronize: true,
      autoLoadEntities: true,
      // entities: [
      //   '/dist/**/**/**/*.entity.{ts,.js}',
      //   '/dist/**/**/**/*.entity.{ts,.js}',
      //   '/dist/**/**/*.entity.{ts,.js}',
      // ],
    };
  }
}
