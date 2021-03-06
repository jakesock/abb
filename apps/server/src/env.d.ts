declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      DB_HOST: string;
      DB_PORT: string;
      DB_USERNAME: string;
      DB_PASSWORD: string;
      DEV_DB: string;
      TEST_DB_USER: string;
      TEST_DB_PASSWORD: string;
      TEST_DB: string;
      PROD_DB: string;
      EMAIL_HOST: string;
      EMAIL_PORT: string;
      EMAIL_USER: string;
      EMAIL_PASSWORD: string;
      CLOUDINARY_CLOUD_NAME: string;
      CLOUDINARY_API_KEY: string;
      CLOUDINARY_API_SECRET: string;
      SESSION_SECRET: string;
      FRONTEND_URL: string;
    }
  }
}

export {};
