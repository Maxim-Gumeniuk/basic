import { Response } from 'express';
import { ApiError } from '../api/error';

export const errorCatch = (res: Response, error: unknown, status: number) => {
	if (error instanceof ApiError) {
		const apiError = new ApiError(error.message);
		res.status(status).send(apiError.message);
	} else {
		console.error('An unexpected error occurred:', error);
	}
};
