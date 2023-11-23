import { requestHandler } from '../../src/middlewares/requestWrapper.adapter'; 
import { Request, Response } from 'express';

const mockNext = jest.fn();

const asyncRouteHandler = async (req: Request, res: Response, next) => {
    try {
  
        const data = { message: 'Test data' };
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

describe('requestHandler', () => {
    it('should handle a successful response', async () => {
        const req = {} as Request; 
        const res = {
            status: jest.fn(() => res),
            json: jest.fn(),
        } as unknown as Response; 

        const handler = requestHandler(asyncRouteHandler);
        await handler(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Test data' });
        expect(mockNext).not.toHaveBeenCalled();
    });

    it('should handle an error and call next', async () => {
        const req = {} as Request;
        const res = {
            status: jest.fn(() => res),
            json: jest.fn(),
        } as unknown as Response; 


        const asyncRouteHandlerWithError = async () => {
            throw new Error('Test error');
        };

        const handler = requestHandler(asyncRouteHandlerWithError);
        await handler(req, res, mockNext);

        expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });
});