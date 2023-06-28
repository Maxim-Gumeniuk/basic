import { Model } from '../../db/connection';

export const createDog = async (
	name: string,
	color: string,
	tailLength: number,
	weight: number
) => {
	try {
		const newDog = {
			name,
			color,
			tailLength,
			weight,
		};

		await Model.create(newDog);
		return newDog;
	} catch (error) {
		console.log(JSON.stringify(error, null, 2));
	}
};
