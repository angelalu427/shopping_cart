import axios from "axios";
import { z } from "zod";
import { 
  productSchema, 
  cartItemSchema,
} from "../types";

const cartItemsSchema = z.array(cartItemSchema);
const addToCartResponseSchema = z.object({
  product: productSchema,
  item: cartItemSchema.nullable(),
});

export type AddToCartResponse = z.infer<typeof addToCartResponseSchema>;

export const getCartItems = async () => {
  const { data } = await axios.get("/api/cart");
  return cartItemsSchema.parse(data);
};

export const addItemToCart = async (productId: string) => {
  const { data } = await axios.post("/api/add-to-cart", { productId });
  return addToCartResponseSchema.parse(data);
};

export const checkoutCart = async () => {
  await axios.post("/api/checkout");
};
