import { httpClient } from '@/lib/httpClient';

export async function getOrderById(id: string) {
	const { data } = await httpClient.get(`/user/order/${id}`);

	return data.item.item;
}
