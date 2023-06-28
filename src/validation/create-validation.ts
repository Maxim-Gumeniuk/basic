import { checkSchema } from 'express-validator';

export const createDogSchema = checkSchema({
	name: {
		errorMessage: 'Invalid username',
		notEmpty: true,
	},
	color: {
		isLength: {
			options: { min: 2 },
			errorMessage: 'color should be at least 2 chars',
		},
	},
	tailLength: {
		isInt: true,
		errorMessage: 'should be a number',
	},
	weight: {
		isInt: true,
		errorMessage: 'should be a number',
	},
});
