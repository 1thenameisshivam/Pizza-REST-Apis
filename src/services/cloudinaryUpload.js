import cloudinary from "../config/cloudinary.js";
const cloudinaryUpload = async (filePath, filename, folder, format) => {
  const result = await cloudinary.uploader.upload(filePath, {
    filename_override: filename,
    folder: folder,
    format: format,
  });
  return result;
};

export default cloudinaryUpload;
