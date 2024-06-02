interface Address {
	geolocation: {
		lat: string;
		long: string;
	};
	city: string;
	street: string;
	number: number;
	zipcode: string;
}

interface Name {
	firstname: string;
	lastname: string;
}

export interface User {
	address: Address;
	id: number;
	email: string;
	username: string;
	password: string;
	name: Name;
	phone: string;
	__v: number;
}

export const getDatatableUsers = async () => {
	try {
		const response = await fetch('https://fakestoreapi.com/users');
		const data = (await response.json()) as User[];
		return data;
	} catch (error) {
		console.error('Error fetching data:', error);
		return [];
	}
};
