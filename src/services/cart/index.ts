import { httpClient } from '@/lib/httpClient';

interface IAddToCart {
	product_name: string;
	product_quantity: number;
	product_price: number;
	product_code: string;
	product_url_image: string;
}

interface IUpdateQuantityItemsCart {
	product_quantity: number;
	product_code: string;
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

export async function updateQuantityItemCart(body: IUpdateQuantityItemsCart) {
	const { data } = await httpClient.put('/user/cart', body);

	return data;
}

export async function clearCart() {
	const { data } = await httpClient.delete('/user/cart/clearCart');

	return data;
}
