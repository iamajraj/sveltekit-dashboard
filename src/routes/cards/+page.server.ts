import { getProductCategories, getProducts } from '../../lib/api/products';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const products = await getProducts();
	const categories = await getProductCategories();

	return {
		products,
		categories
	};
};
