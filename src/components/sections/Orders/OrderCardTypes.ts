export interface Address {
  id: string;
  cep: string;
  city: string;
  complement: string;
  country: string;
  neighborhood: string;
  number: string;
  reference: string;
  selected: boolean;
  state: string;
  street: string;
  uf: string;
}

export interface Product {
  id: string;
  product_name: string;
  product_quantity: number;
  product_price: number;
  product_code: number;
  product_url_image?: string;
}

export interface Order {
  id: string;
  address: Address;
  createdAt: string;
  delivery_form: string;
  orderStatus: string;
  order_number: string;
  order_number_omie: string;
  order_code_omie: string;
  payment_form: string;
  id_pix_omie: string;
  products: Product[];
  total: number;
}

export interface OrderResponse {
  item: {
    item: Order[];
  };
  success: boolean;
}
