import { TIER_INSTANCE } from "./serviceInstance";

// add Tier
export async function addTier(data) {
  try {
    const response = await TIER_INSTANCE.post(``, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

//get all Tiers
export async function getTiers() {
  try {
    const response = await TIER_INSTANCE.get(``);
    return response.data;
  } catch (error) {
    throw error;
  }
}

//get Tier by id
export async function getTierById(id) {
  try {
    const response = await TIER_INSTANCE.get(`/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// update Tier
export async function updateTier(id, data) {
  try {
    const response = await TIER_INSTANCE.put(`/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// delete Tier
export async function deleteTier(id) {
  try {
    const response = await TIER_INSTANCE.delete(`/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
