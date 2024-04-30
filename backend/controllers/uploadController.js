const uploadFilesToS3 = require("../utils/uploadFileToS3");

exports.uploadImage = async function (req, res) {
  const files = req.files;
  if (files.length > 0) {
    const response = await uploadFilesToS3(files);
    if (response.status) {
      return res.status(200).json({ status: true, message: "ok", data: response.results });
    }
  }
  return res.status(400).json({ message: "Image upload failed" });
};
