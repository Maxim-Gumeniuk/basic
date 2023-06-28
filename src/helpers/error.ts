import { Response } from 'express';
import { ApiError } from '../api/error';

export const errorCatch = (res: Response, error: any, status: number) => {
	if (error instanceof ApiError) {
		res.status(status).send(error);
	} else {
		console.error('An unexpected error occurred:', error);
	}
};
