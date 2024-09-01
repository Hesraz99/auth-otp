import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration } from 'src/config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: configuration,
      isGlobal: true,
      // validate(config) {},:
    }),
  ],
  providers: [],
  controllers: [],
})
export class CustomConfigsModule {}
