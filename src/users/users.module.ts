import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Epic } from 'src/epic/entities/epic';
import { Story } from 'src/story/entities/story';
import { Task } from 'src/task/entities/task';
import { User } from './entities/user';
import { UserService } from './user.service';
import { UserController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthMiddleware } from './auth.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Epic, Story, Task]),
    JwtModule.register({
      secret: 'saleshandy',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: '/user/signup', method: RequestMethod.POST },
        { path: '/user/login', method: RequestMethod.POST },
      )
      .forRoutes('*');
  }
}
