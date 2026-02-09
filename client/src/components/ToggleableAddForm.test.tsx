import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ToggleableAddForm from "./ToggleableAddForm"; 

it("shows the add form when the \"Add a Product\" button is clicked and hides it on Cancel", async () => {
  const user = userEvent.setup();
  const onAddFormSubmit = vi.fn();

  render(<ToggleableAddForm onAddFormSubmit={onAddFormSubmit} />);

  // expect to see the "Add a Product" button initially
  const addBtn = screen.getByRole("button", { name: /add a product/i });
  expect(addBtn).toBeInTheDocument();
  expect(screen.queryByRole("button", { name: /cancel/i })).not.toBeInTheDocument();

  // expect to show the Add form when the Add button is clicked
  await user.click(addBtn);
  expect(screen.getByRole("textbox", { name: /product name/i })).toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: /cancel/i }));
  expect(screen.getByRole("button", { name: /add a product/i })).toBeInTheDocument();
  expect(screen.queryByRole("button", { name: /cancel/i })).not.toBeInTheDocument();
});
