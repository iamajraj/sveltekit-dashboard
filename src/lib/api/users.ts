import type { User } from './datatable';

export const getUsers = async () => {
	try {
		const res = await fetch(`https://fakestoreapi.com/users`);
		const data = await res.json();
		return data as User[];
	} catch (_) {
		return [];
	}
};
