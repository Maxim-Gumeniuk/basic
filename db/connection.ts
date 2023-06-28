import mongoose, { Schema } from 'mongoose';

export const Model = mongoose.model(
	'Test',
	new Schema({
		name: String,
		color: String,
		tail_length: Number,
		weight: Number,
	})
);

const connection = async () => {
	await Model.findOne();
	console.log('model was created');
};

connection();
