export interface Product {
	id: number;
	title: string;
	price: number;
	image: string;
	category: string;
}

export async function getProducts() {
	try {
		const response = await fetch('https://fakestoreapi.com/products');
		const data: Product[] = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching product data:', error);
		return [];
	}
}

export async function getProductCategories() {
	try {
		const response = await fetch('https://fakestoreapi.com/products/categories');
		const data: string[] = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching product categories:', error);
		return [];
	}
}
