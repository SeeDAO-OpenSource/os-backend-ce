import { SetMetadata } from "@nestjs/common";

export const jwtConstants = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN || '14d',
};


export const LOGIN_ACTION = 'login';

export const IS_AUTH_KEY = 'isAuth';
export const Auth = () => SetMetadata(IS_AUTH_KEY, true);