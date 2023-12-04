import { NextFunction, Request} from 'express';

export type AsyncRouteHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;
