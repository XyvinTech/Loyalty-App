import { POINTS_CRITERIAS_INSTANCE } from "./serviceInstance";

// add PointsCriteria
export async function addPointsCriteria(data) {
  try {
    const response = await POINTS_CRITERIAS_INSTANCE.post(``, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

//get all PointsCriterias
export async function getPointsCriterias() {
  try {
    const response = await POINTS_CRITERIAS_INSTANCE.get(``);
    return response.data;
  } catch (error) {
    throw error;
  }
}

//get PointsCriteria by id
export async function getPointsCriteriaById(id) {
  try {
    const response = await POINTS_CRITERIAS_INSTANCE.get(`/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// update PointsCriteria
export async function updatePointsCriteria(id, data) {
  try {
    const response = await POINTS_CRITERIAS_INSTANCE.put(`/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// delete PointsCriteria
export async function deletePointsCriteria(id) {
  try {
    const response = await POINTS_CRITERIAS_INSTANCE.delete(`/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
