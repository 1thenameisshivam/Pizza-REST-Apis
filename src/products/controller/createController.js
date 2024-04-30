import productSchema from "../model/productSchema.js";
import path from "node:path";
import fs from "node:fs";
import Joi from "joi";
import createError from "http-errors";
import cloudinaryUpload from "../../services/cloudinaryUpload.js";

const createController = async (req, res, next) => {
  // getting data from body
  const { name, price, size } = req.body;
  const fileName = req.file.filename;
  const filePath = path.resolve(
    "__dirname/../public/uploads/images/" + fileName
  );
  const format = req.file.mimetype.split("/")[1];

  // validating data
  const validationSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    size: Joi.string().required(),
  });

  const { error } = validationSchema.validate({ name, price, size });

  if (error) {
    return next(createError(400, error));
  }

  //uploadig image to cloudinary
  let result;
  try {
    result = await cloudinaryUpload(filePath, fileName, "pizza-image", format);
  } catch (err) {
    console.log(err);
    return next(createError(500, "Error uploading image" + err));
  }

  // creating product
  let pizza;
  try {
    pizza = await productSchema.create({
      name,
      price,
      size,
      image: result.secure_url,
    });
  } catch (err) {
    console.log(err);
    return next(createError(500, "Error uploading image" + err));
  }

  // unlinking file
  try {
    await fs.promises.unlink(filePath);
  } catch (err) {
    return next(createError(500, "error while deleting files." + err));
  }

  res.status(201).json({
    message: "Product created successfully",
    pizzaID: pizza._id,
  });
};

export default createController;
