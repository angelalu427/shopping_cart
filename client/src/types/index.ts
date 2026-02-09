import { z } from "zod";

export const productSchema = z.object({
  _id: z.string(),
  title: z.string(),
  quantity: z.number(),
  price: z.number(),
});

export const cartItemSchema = z.object({
  _id: z.string(),
  productId: productSchema.shape._id,
  title: z.string(),
  quantity: z.number(),
  price: z.number(),
});

export const newProductSchema = productSchema.omit({
  _id: true,
});

export type Product = z.infer<typeof productSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
export type NewProduct = z.infer<typeof newProductSchema>;
