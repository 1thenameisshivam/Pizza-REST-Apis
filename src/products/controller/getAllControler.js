import createError from "http-errors";
import productSchema from "../model/productSchema.js";
const getAllController = async (req, res, next) => {
  let products;
  try {
    // we can implement pagination here to limit the number of products from mongoose-pagination
    products = await productSchema.find({}).select("-__v -updatedAt ");
  } catch (err) {
    return next(createError(500, "Something went wrong in the database"));
  }
  res.json({ message: "All products", products, count: products.length });
};
export default getAllController;
