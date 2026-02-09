import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddProductForm from "./AddProductForm";

it("changes the input text when the product title changes", async () => {
  render(<AddProductForm onAddFormSubmit={vi.fn()} onCancel={vi.fn()}/>);
  const user = userEvent.setup();
  const inputTitle = screen.getByRole("textbox", { name: "Product Name:"});
  await user.type(inputTitle, "Milk");
  expect(inputTitle).toHaveValue("Milk");
});

it("changes the input text when the product price changes", async () => {
  render(<AddProductForm onAddFormSubmit={vi.fn()} onCancel={vi.fn()}/>);
  const user = userEvent.setup();
  const inputPrice = screen.getByRole("spinbutton", { name: "Price:"});
  await user.type(inputPrice, "500");
  expect(inputPrice).toHaveValue(500);
});

it("changes the input text when the product quantity changes", async () => {
  render(<AddProductForm onAddFormSubmit={vi.fn()} onCancel={vi.fn()}/>);
  const user = userEvent.setup();
  const inputQuantity = screen.getByRole("spinbutton", { name: "Quantity:"});
  await user.type(inputQuantity, "5");
  expect(inputQuantity).toHaveValue(5);
});