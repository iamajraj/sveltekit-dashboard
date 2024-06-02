import { getProductCategories, getProducts } from '../../lib/api/products';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	try {
		const products = await getProducts();
		const categories = await getProductCategories();

		return {
			products,
			categories
		};
	} catch (error) {
		return {
			products: [],
			categories: []
		};
	}
};
