import { httpClient } from "@/lib/httpClient";

export async function getCart() {
  const { data } = await httpClient.get("/user/cart");

  return data;
}
