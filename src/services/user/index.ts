import api from "@/lib/axiosInstance";

export async function userLogged() {
  const { data } = await api.get("/user/profile");

  return data;
}
