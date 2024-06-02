import { getDatatableUsers } from '$lib/api/datatable';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const users = await getDatatableUsers();
	return {
		users
	};
};
