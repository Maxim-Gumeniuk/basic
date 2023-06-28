import { NextFunction, Request, Response } from 'express';
import { createDog } from '../services/dogs';
import { Status } from '../types/enums/status';
import { validationResult } from 'express-validator';
import { Model } from '../../db/connection';
import { ApiError } from '../api/error';
import { errorCatch } from '../helpers/error';

export const createDogs = async (req: Request, res: Response) => {
	try {
		const { name, color, tailLength, weight } = req.body ?? {};

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.status(Status.BadRequest).json({ errors: errors.array() });
			return;
		}

		const newEntity = await createDog(name, color, tailLength, weight);
		if (newEntity) {
			res.status(Status.Created).send(newEntity);
			return;
		}

		res.status(Status.BadRequest).send(newEntity);
	} catch (error) {
		if (error instanceof ApiError) {
			errorCatch(res, error, Status.BadRequest);
		} else {
			console.error('An unexpected error occurred:', error);
		}
	}
};

export const allEntity = async (req: Request, res: Response) => {
	try {
		let pageNumber = 1;
		let pageSize = 20;
		let attributes = null;
		let order = 1;

		if (req.query.pageNumber) {
			pageNumber = parseInt(req.query.pageNumber as string);
		}
		if (req.query.limit) {
			pageSize = parseInt(
				(req.query.limit as string).split('pageSize=').join(' ')
			);
		}
		if (req.query.attributes) {
			attributes = req.query.attributes;
		}
		if (req.query.order && req.query.order === 'desc') {
			order = -1;
		}

		const skip = (pageNumber - 1) * pageSize || 0;

		let totalCount;
		let totalPages;
		let dogs;
		let sortOptions = {};

		if (attributes) {
			totalCount = await Model.countDocuments();
			totalPages = Math.ceil(totalCount / pageSize);

			sortOptions = { [attributes as string]: order };

			dogs = await Model.find().skip(skip).limit(pageSize).sort(sortOptions);
		} else {
			dogs = await Model.find();
		}

		res.status(Status.Ok).json({
			data: dogs,
			currentPage: pageNumber,
			totalPages: totalPages || 1,
		});
	} catch (error) {
		if (error instanceof ApiError) {
			errorCatch(res, error, Status.BadRequest);
		} else {
			console.error('An unexpected error occurred:', error);
		}
	}
};

export const deleteEntity = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const deletedEntity = await Model.deleteOne({ _id: id });
		if (deletedEntity.deletedCount === 0) {
			res.status(Status.NotFound).send('Entity not found');
		} else {
			res.status(Status.Ok).send(deletedEntity);
		}
	} catch (error) {
		if (error instanceof ApiError) {
			errorCatch(res, error, Status.BadRequest);
		} else {
			console.error('An unexpected error occurred:', error);
		}
	}
};
