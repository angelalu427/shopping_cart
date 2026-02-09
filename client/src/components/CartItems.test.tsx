import { render, screen } from "@testing-library/react";
import CartItems from "./CartItems";
import type { CartItem } from "../types";

const mockCart: CartItem[] = [
  {
    _id: "a1",
    productId: "1",
    title: "Amazon Kindle E-reader",
    quantity: 1,
    price: 79.99,
  },
  {
    _id: "a2",
    productId: "2",
    title: "Apple 10.5-Inch iPad Pro",
    quantity: 3,
    price: 649.99,
  },
];

it("displays the cart items correctly", async () => {
  render(
    <CartItems cartItems={mockCart}/>
  );

  expect(screen.getByRole("columnheader", { name: /item/i })).toBeInTheDocument();
  expect(screen.getByRole("columnheader", { name: /quantity/i })).toBeInTheDocument();
  expect(screen.getByRole("columnheader", { name: /price/i })).toBeInTheDocument();
  
  expect(screen.getByText(/kindle/i)).toBeInTheDocument();
  expect(screen.getByText(/ipad/i)).toBeInTheDocument();
  expect(screen.getByText(/ipad/i)).toBeInTheDocument();
});
