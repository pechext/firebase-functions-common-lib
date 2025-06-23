import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

export const createExpressApp = (): express.Express => {
  const corsMiddleware = cors({ origin: true });
  const cookieParserMiddleware = cookieParser();

  const app = express();

  app.use(corsMiddleware);
  app.use(cookieParserMiddleware);

  return app;
};
