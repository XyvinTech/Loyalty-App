import { USER_INSTANCE } from "./serviceInstance";

// add user
export async function addUser(data) {
  try {
    const response = await USER_INSTANCE.post(``, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

//get all users
export async function getUsers() {
  try {
    const response = await USER_INSTANCE.get(``);
    return response.data;
  } catch (error) {
    throw error;
  }
}

//get user by id
export async function getUserById(id) {
  try {
    const response = await USER_INSTANCE.get(`/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// update user
export async function updateUser(id, data) {
  try {
    const response = await USER_INSTANCE.put(`/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// delete user
export async function deleteUser(id) {
  try {
    const response = await USER_INSTANCE.delete(`/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
