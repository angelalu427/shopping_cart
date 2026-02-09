import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EditableProduct from "./EditableProduct";
import type { Product } from "../types";

const product: Product = {
  _id: "p1",
  title: "Kindle",
  price: 199.99,
  quantity: 3,
};

it('shows the edit form when "Edit" is clicked, and hides it when "Cancel" is clicked', async () => {
  const user = userEvent.setup();
  const onEditFormSubmit = vi.fn();
  const onDeleteProduct = vi.fn();
  const onAddItemToCart = vi.fn();

  render(
    <EditableProduct
      product={product}
      onEditFormSubmit={onEditFormSubmit}
      onDeleteProduct={onDeleteProduct}
      onAddItemToCart={onAddItemToCart}
    />
  );

  // Initially, no edit form
  expect(screen.queryByRole("heading", { name: /edit product/i })).not.toBeInTheDocument();

  // Click Edit -> form appears
  await user.click(screen.getByRole("button", { name: /edit/i }));
  expect(screen.getByRole("heading", { name: /edit product/i })).toBeInTheDocument();

  // Click Cancel -> form disappears
  await user.click(screen.getByRole("button", { name: /cancel/i }));
  expect(screen.queryByRole("heading", { name: /edit product/i })).not.toBeInTheDocument();
});
