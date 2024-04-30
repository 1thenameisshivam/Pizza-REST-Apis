import createError from "http-errors";
import productSchema from "../model/productSchema.js";
import cloudinaryUpload from "../../services/cloudinaryUpload.js";
import path from "node:path";
import fs from "node:fs";
const updateController = async (req, res, next) => {
  const { name, price, size } = req.body;
  const { id } = req.params;

  // finding product
  const product = await productSchema.findById(id);

  if (!product) {
    return next(createError(404, "Product not found"));
  }

  // uploading to cloudinary
  let result;
  const file = req.file;
  if (file) {
    try {
      const fileName = file.filename;
      const filePath = path.resolve(
        "__dirname/../public/uploads/images/" + fileName
      );
      const format = req.file.mimetype.split("/")[1];
      result = await cloudinaryUpload(
        filePath,
        fileName,
        "pizza-image",
        format
      );
      //deleting from local
      await fs.promises.unlink(filePath);
    } catch (err) {
      return next(createError(500, "Error uploading image" + err));
    }
  }

  const newImg = result?.secure_url;

  // updating product
  let updatedProduct = {};
  try {
    updatedProduct = await productSchema.findOneAndUpdate(
      { _id: id },
      {
        name,
        price,
        size,
        image: newImg ? newImg : product.image,
      },
      { new: true }
    );
  } catch (err) {
    return next(createError(500, "Error updating product" + err));
  }

  res
    .status(200)
    .json({ message: "Product updated successfully", updatedProduct });
};

export default updateController;
