import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const decoded = this.jwtService.verify(token);
        req['user'] = decoded; // Attach decoded user information to the request
        next();
      } catch (error) {
        // Handle token verification failure
        res.status(401).json({ message: 'Unauthorized' });
      }
    } else {
      // No token provided or invalid format
      res.status(401).json({ message: 'Unauthorized' });
    }
  }
}
