import productSchema from "../model/productSchema.js";
import createError from "http-errors";
import cloudinary from "../../config/cloudinary.js";
const deleteController = async (req, res, next) => {
  const { id } = req.params;

  //checking if id is present
  if (!id) {
    return next(new Error("Id is required"));
  }

  // finding the product by id

  const product = await productSchema.findById(id);

  if (!product) {
    return next(createError("Product not found"));
  }
  try {
    const pizzaImage = product.image.split("/");
    const pizzaImagePublicId =
      pizzaImage.at(-2) + "/" + pizzaImage.at(-1)?.split(".").at(-2);
    await cloudinary.uploader.destroy(pizzaImagePublicId);
  } catch (err) {
    return next(createError("Error deleting product from cloudinary" + err));
  }

  await productSchema.deleteOne({ _id: id });

  res.json({ message: "Product deleted successfully" });
};

export default deleteController;
