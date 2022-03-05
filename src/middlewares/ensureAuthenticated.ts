import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

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
    throw new Error('JWT is missing authorization header.');
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
    throw new Error('Invalid JWT token.');
  }
};

export { ensuredAuthenticated };
