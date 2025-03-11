import {Request, Response, NextFunction} from "express";

const errorHandler = (
    err: Error,
    re: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(err.stack);
    res.status(500).json({error: "Something went wrong"});
};

export default errorHandler;