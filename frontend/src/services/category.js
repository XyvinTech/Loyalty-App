import { CATEGORY_INSTANCE } from "./serviceInstance";


export async function addCategory(data) {
    try {
        const response = await CATEGORY_INSTANCE.post(
            ``,
            data
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function updateCategory(id,data) {
    try {
        const response = await CATEGORY_INSTANCE.put(
            `/${id}`,
            data
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function getCategory() {
    try {
        const response = await CATEGORY_INSTANCE.get(``);
        return response.data;
    } catch (error) {
        throw error;
    }
}
