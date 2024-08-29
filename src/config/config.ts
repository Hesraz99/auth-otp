import { registerAs } from '@nestjs/config';

export enum configKeys {
  App = 'App',
  DB = 'DB',
}

const appConfig = registerAs(configKeys.App, () => {
  return {
    port: '3000',
  };
});

const dbConfig = registerAs(configKeys.DB, () => {
  return {
    port: '5432',
    host: 'localhost',
    username: 'postgres',
    password: 'root',
    database: 'auth-otp',
  };
});

export const configuration = [appConfig, dbConfig];
