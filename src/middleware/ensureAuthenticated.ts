import { Request, Response, NextFunction, response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string,
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction){
    const authToken = req.headers.authorization;

    if(!authToken) {
        return res.status(401).json({
            errorCode: "token.invalid"
        });
    }

    const JWT_SECRET = process.env.JWT_SECRET;

    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }

    const [, token ] = authToken.split(" ");

    try {
        const { sub } = verify(token, JWT_SECRET) as IPayload
        req.user_id = sub;
        return next();
    } catch (error) {
        return res.status(401).json({ errorCode: "token.expired"})        
    }
}