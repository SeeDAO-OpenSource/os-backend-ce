import { Request, Response, NextFunction } from 'express';


/**
 * Get unix time in milliseconds
 * 
 * Example: 2021/11/26 Fri 10:54:09.289 AM GMT -> 1637924049289
 * 
 * @param date
 * 
 * @returns Unix timestamps in milliseconds <br/>
 * 
 */
export function timeStamp(date: Date | undefined): number {
    if (date === undefined) {
        const now = new Date();
        return now.getTime();
    }
    
        return date.getTime();
    
}

/**
 * Ignore request for FavIcon. so there is no error in browser 
 * @param req  
 * @param res 
 * @param next 
 */
export function ignoreFavicon(req: Request, res: Response, next: NextFunction) {
    if (req.originalUrl.includes('favicon.ico')) {
        res.status(204).end();
    }
    next();
}
