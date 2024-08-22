import { APPS_INSTANCE } from "./serviceInstance";


export async function addApp(data) {
    try {
        const response = await APPS_INSTANCE.post(``, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function updateApp(id, data) {
    try {
        const response = await APPS_INSTANCE.put(`/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function getApp() {
    try {
        const response = await APPS_INSTANCE.get(``);
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export async function deleteApp(id) {
    try {
        const response = await APPS_INSTANCE.delete(`/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}