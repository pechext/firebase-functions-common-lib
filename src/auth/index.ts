import * as express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { getAuth } from 'firebase-admin/auth';
import { App } from 'firebase-admin/app';

declare global {
  export namespace Express {
    interface Request {
      userId: string;
    }
  }
}

type Middleware = (req: express.Request, res: express.Response, next: express.NextFunction) => void;

export const validateTokenMiddleware = (firebaseApp: App): Middleware => {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const isValidAuthTokenHeader =
      'authorization' in req.headers && (req.headers['authorization'] as string).startsWith('Bearer ');
    const isValidAuthCookies = req.cookies && req.cookies.__session;

    let idToken: string;
    if (isValidAuthTokenHeader) {
      const authHeader = req.headers['authorization'] as string;
      idToken = authHeader.split('Bearer ')[1];
    } else if (isValidAuthCookies) {
      idToken = req.cookies.__session as string;
    } else {
      res.status(403).send('Unauthorized');
      return;
    }

    try {
      const decodedIdToken = await getAuth(firebaseApp).verifyIdToken(idToken);
      req.userId = decodedIdToken.uid;
      next();
      return;
    } catch (error) {
      res.status(403).send('Unauthorized');
      return;
    }
  };
};

export const createAuthApp = (firebaseApp: App): express.Application => {
  const corsMiddleware = cors({ origin: true });
  const cookieParserMiddleware = cookieParser();

  const app = express.default();

  app.use(corsMiddleware);
  app.use(cookieParserMiddleware);
  app.use(validateTokenMiddleware(firebaseApp));

  return app;
};
