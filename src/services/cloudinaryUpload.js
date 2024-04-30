import cloudinary from "../config/cloudinary.js";
import createError from "http-errors";
export const cloudinaryUpload = async (filePath, filename, folder, format) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      filename_override: filename,
      folder: folder,
      format: format,
    });
    return result;
  } catch (err) {
    return next(createError(500, "Something went wrong in cloudinary" + err));
  }
};
