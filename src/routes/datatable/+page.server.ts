import { getDatatableUsers } from '$lib/api/datatable';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	try {
		const users = await getDatatableUsers();
		return {
			users
		};
	} catch (error) {
		console.error('Error fetching data:', error);
		return {
			users: []
		};
	}
};
