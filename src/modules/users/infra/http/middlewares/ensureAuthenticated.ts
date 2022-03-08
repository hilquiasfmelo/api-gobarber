import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '@shared/errors/AppError';

interface ITokenPayload {
  sub: string;
}

const ensuredAuthenticated = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT is missing authorization header.', 401);
  }

  // Separa o token da palavra Bearer
  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, String(process.env.JWT_SECRET));

    const { sub } = decoded as ITokenPayload;

    request.user = {
      user_id: sub,
    };

    return next();
  } catch (err) {
    throw new AppError('Invalid JWT token.', 401);
  }
};

export { ensuredAuthenticated };
