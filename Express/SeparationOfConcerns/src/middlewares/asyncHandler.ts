import { Request, Response, NextFunction } from "express";


//asynchHandler
type AsyncFunction = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
  
  export const asyncHandler =
    (fn: AsyncFunction) => (req: Request, res: Response, next: NextFunction) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };

//catch routes that don't exist
const notFound = (req:Request, res:Response, next:NextFunction) => {
    const error = new Error(`Not found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}
export {notFound}