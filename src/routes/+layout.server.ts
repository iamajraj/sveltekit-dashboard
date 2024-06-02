import { getUsers } from '$lib/api/users';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	return {
		users: await getUsers()
	};
};
