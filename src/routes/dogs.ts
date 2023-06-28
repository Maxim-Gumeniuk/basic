import express from 'express';
import { Endpoints } from '../types/enums/endpoints';
import { allEntity, createDogs, deleteEntity } from '../controllers/dogs';
import { createDogSchema } from '../validation/create-validation';

export const dogsRouter = express.Router();
dogsRouter.get('', allEntity);
dogsRouter.post(Endpoints.Create, createDogSchema, createDogs);
dogsRouter.delete(Endpoints.Id, deleteEntity);
