import { CARD_INSTANCE } from "./serviceInstance";


export async function addLoyalityCard(data) {
    try {
        const response = await CARD_INSTANCE.post(
            ``,
            data
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function updateLoyalityCard(id,data) {
    try {
        const response = await CARD_INSTANCE.put(
            `/${id}`,
            data
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function getLoyalityCard() {
    try {
        const response = await CARD_INSTANCE.get(`admin`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
