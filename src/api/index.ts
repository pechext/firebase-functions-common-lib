import * as express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

export const createExpressApp = (): express.Application => {
  const corsMiddleware = cors({ origin: true });
  const cookieParserMiddleware = cookieParser();

  const app = express.default();

  app.use(corsMiddleware);
  app.use(cookieParserMiddleware);

  return app;
};
