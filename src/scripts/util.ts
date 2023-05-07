import { Request, Response, NextFunction } from 'express';

/**
 * Get unix time in milliseconds
 *
 * Example: 2021/11/26 Fri 10:54:09.289 AM GMT -> 1637924049289
 *
 * @param date Optional date to get the timestamp for; defaults to the current date and time
 * @returns Unix timestamps in milliseconds
 */
export function timeStamp(date?: Date): number {
  return (date || new Date()).getTime();
}

/**
 * Ignore request for FavIcon so there is no error in the browser
 * @param req HTTP request
 * @param res HTTP response
 * @param next Function to call the next middleware
 */
export function ignoreFavicon(req: Request, res: Response, next: NextFunction): void {
  if (req.originalUrl.includes('favicon.ico')) {
    res.status(204).end();
  } else {
    next();
  }
}