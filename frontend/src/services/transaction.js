import { TRANSACTION_INSTANCE } from "./serviceInstance";

export async function getTransactions() {
    try {
        const response = await TRANSACTION_INSTANCE.get();
        return response.data;
    } catch (error) {
        throw error;
    }
}