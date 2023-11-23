import { NextFunction, Request} from 'express';
import { ResponseDefault } from './Response.type';

export type AsyncRouteHandler = (req: Request, res: ResponseDefault, next: NextFunction) => Promise<void>;
