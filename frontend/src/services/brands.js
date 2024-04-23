import { BRAND_INSTANCE } from "./serviceInstance";


export async function addBrand(data) {
    try {
        const response = await BRAND_INSTANCE.post(``, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function updateBrand(id, data) {
    try {
        const response = await BRAND_INSTANCE.put(`/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function getBrand() {
    try {
        const response = await BRAND_INSTANCE.get(``);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function deleteBrand(id) {
    try {
        const response = await BRAND_INSTANCE.delete(`/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}