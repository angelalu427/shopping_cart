import axios from "axios";
import { z } from "zod";
import { 
  productSchema, 
  newProductSchema, 
  type NewProduct,
  type Product,
} from "../types";

const productsSchema = z.array(productSchema);

export const getProducts = async () => {
  const { data } = await axios.get("/api/products");
  return productsSchema.parse(data);
};

export const addProduct = async (newProduct: NewProduct) => {
  const payload = newProductSchema.parse(newProduct);
  const { data } = await axios.post("/api/products", payload);
  return productSchema.parse(data);
};

export const updateProduct = async (updatedProduct: Product) => {
  const payload = productSchema.parse(updatedProduct);
  const { data } = await axios.put(`/api/products/${payload._id}`, payload);
  return productSchema.parse(data);
};

export const deleteProduct = async (productId: string) => {
  await axios.delete(`/api/products/${productId}`);
};
