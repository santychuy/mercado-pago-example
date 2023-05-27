declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    PORT?: string;
    CORS_ORIGIN: string;
    MP_ACCESS_TOKEN: string;
  }
}
