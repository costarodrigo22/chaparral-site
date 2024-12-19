import axios from 'axios';

export async function statesBrazilian() {
	const { data } = await axios.get(
		'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
	);

	return data;
}
