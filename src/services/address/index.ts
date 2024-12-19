import { IAddressSelected } from '@/contexts/Cart/DeliveryContext';
import { httpClient } from '@/lib/httpClient';

export interface IAddAddress {
	cep: string;
	country: string;
	street: string;
	number: string;
	neighborhood: string;
	complement: string;
	city: string;
	state: string;
	uf: string;
	reference: string;
	selected: boolean;
	isDefault: boolean;
}

export async function getAddress() {
	const { data } = await httpClient.get('/user/address');

	return data.item.item;
}

export async function addAddress(address: IAddAddress) {
	const { data } = await httpClient.post('/user/address', address);

	return data;
}

export async function selectAddress(id: string) {
	const { data } = await httpClient.post('/user/address/select', {
		addressId: id,
	});

	return data;
}

export async function getAddressSelected() {
	const { data } = await httpClient.get('/user/address/select');

	return data.item;
}

export async function calcFreight(address: IAddressSelected) {
	const body = {
		origin: {
			street: 'BR-010',
			neighborhood: 'Maranhão Novo',
			city: 'Imperatriz',
			state: 'Maranhão',
			country: 'Brasil',
		},
		destination: {
			street: address?.street,
			neighborhood: address?.neighborhood,
			city: address?.city,
			state: address?.state,
			country: address?.country,
		},
	};

	const { data } = await httpClient.post('/user/route', body);

	return data;
}
