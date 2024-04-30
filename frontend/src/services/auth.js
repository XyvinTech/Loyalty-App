import { AUTH_INSTANCE } from "./serviceInstance";

export async function login(data) {
  try {
    const response = await AUTH_INSTANCE.post("/login", data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
