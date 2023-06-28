import express, { Application, json } from 'express';
import mongoose from 'mongoose';
import { ApiError } from './api/error';
const app: Application = express();
import * as dotenv from 'dotenv';
import { pingRouter } from './routes/ping';
import { Endpoints } from './types/enums/endpoints';
import cors from 'cors';
import { dogsRouter } from './routes/dogs';

dotenv.config();
const { PORT, MG_CONNECTION } = process.env;
const port = PORT || 7000;
app.use(json());
app.use(cors());

(async () => {
	try {
		if (MG_CONNECTION) {
			mongoose.connect(MG_CONNECTION);
		}
		app.listen(port, () => {
			console.log(
				`server is running on ${port} port and mongoose was connected`
			);
		});
	} catch (error) {
		if (error instanceof ApiError) {
			throw new ApiError(error.message);
		} else {
			console.error('An unexpected error occurred:', error);
		}
	}
})();

app.use(Endpoints.Ping, pingRouter);
app.use(Endpoints.Dogs, dogsRouter);
