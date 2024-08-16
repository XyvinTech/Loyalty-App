import { COUPON_INSTANCE } from "./serviceInstance";

// add Coupon
export async function addCoupon(data) {
  try {
    const response = await COUPON_INSTANCE.post(``, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

//get all Coupons
export async function getCoupons() {
  try {
    const response = await COUPON_INSTANCE.get(``);
    return response.data;
  } catch (error) {
    throw error;
  }
}

//get Coupon by id
// export async function getCouponById(id) {
//   try {
//     const response = await COUPON_INSTANCE.get(`/${id}`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// }

// update Coupon
export async function updateCoupon(id, data) {
  try {
    const response = await COUPON_INSTANCE.put(`/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// delete Coupon
export async function deleteCoupon(id) {
  try {
    const response = await COUPON_INSTANCE.delete(`/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
