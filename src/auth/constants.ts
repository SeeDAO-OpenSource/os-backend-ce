export const jwtConstants = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN || '14d',
};


export const LOGIN_ACTION = 'login';