import productSchema from "../model/productSchema.js";
import createError from "http-errors";
const getSingleController = async (req, res, next) => {
  let product;
  try {
    const { id } = req.params;
    product = await productSchema
      .findById({ _id: id })
      .select("-__v -updatedAt");
  } catch (err) {
    return next(createError(500, "Something went wrong in the database"));
  }
  res.json({ message: " product found", product });
};

export default getSingleController;
