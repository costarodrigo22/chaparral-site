import { httpClient } from '@/lib/httpClient';

interface IAddToCart {
	product_name: string;
	product_quantity: number;
	product_price: number;
	product_code: string;
	product_url_image: string;
}

export async function getCart() {
	const { data } = await httpClient.get('/user/cart');

	return data;
}

export async function addToCart(item: IAddToCart) {
	const { data } = await httpClient.post('/user/cart', item);

	return data;
}

export async function deleteItemToCart(code: string) {
	const { data } = await httpClient.delete(`/user/cart/${code}`);

	return data;
}
