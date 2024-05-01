import { UPLOAD_INSTANCE } from "./serviceInstance";

export async function uploadFile(data) {
  try {
    const uploadData = {
      attachment: data,
    };
    const response = await UPLOAD_INSTANCE.post("upload", uploadData);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
