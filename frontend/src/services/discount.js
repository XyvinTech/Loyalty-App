import { DISCOUNT_INSTANCE } from "./serviceInstance";

// add Discount
export async function addDiscount(data) {
  try {
    const response = await DISCOUNT_INSTANCE.post(``, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

//get all Discounts
export async function getDiscounts() {
  try {
    const response = await DISCOUNT_INSTANCE.get(``);
    return response.data;
  } catch (error) {
    throw error;
  }
}

//get Discount by id
// export async function getDiscountById(id) {
//   try {
//     const response = await DISCOUNT_INSTANCE.get(`/${id}`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// }

// update Discount
export async function updateDiscount(id, data) {
  try {
    const response = await DISCOUNT_INSTANCE.put(`/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// delete Discount
export async function deleteDiscount(id) {
  try {
    const response = await DISCOUNT_INSTANCE.delete(`/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
