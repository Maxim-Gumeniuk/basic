import { ApiError } from '../api/error';

export const errorCatch = (error: any) => {
	if (error instanceof ApiError) {
		return new ApiError(error.message);
	} else {
		console.error('An unexpected error occurred:', error);
	}
};
