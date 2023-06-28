import express, { Request, Response } from 'express';
import { Status } from '../types/enums/status';

export const pingRouter = express.Router();

pingRouter.get('', (req: Request, res: Response) => {
	res.status(Status.Ok).send('Doghouseservise.Version1.0.1');
});
