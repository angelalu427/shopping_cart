import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "./services/products";
import { 
  getCartItems, 
  addItemToCart, 
  checkoutCart 
} from "./services/cart";
import type { CartItem } from "./types";
import { mockProducts } from "./lib/mockData/data";

// create typed “mocked modules” for TypeScript
vi.mock("./services/products");
vi.mock("./services/cart");

const mockedGetProducts = vi.mocked(getProducts);
const mockedGetCartItems = vi.mocked(getCartItems);
const mockedAddProduct = vi.mocked(addProduct);
const mockedUpdateProduct = vi.mocked(updateProduct);
const mockedDeleteProduct = vi.mocked(deleteProduct);
const mockedAddItemToCart = vi.mocked(addItemToCart);
const mockedCheckoutCart = vi.mocked(checkoutCart);

beforeEach(() => {
  vi.clearAllMocks();
});

const mockedProducts = [
  {
    _id: "1",
    title: "Amazon Kindle E-reader",
    quantity: 5,
    price: 79.99,
  },
  {
    _id: "2",
    title: "Apple 10.5-Inch iPad Pro",
    quantity: 3,
    price: 649.99,
  },
];

const mockedCartItems = [
  {
    _id: "a1",
    productId: "1",
    title: "Notebook",
    quantity: 1,
    price: 4.99,
  },
  {
    _id: "a2",
    productId: "2",
    title: "Keyboard",
    quantity: 3,
    price: 649.99,
  },
];

const user = userEvent.setup();

it("displays the products and cart items on initial render", async () => {
  mockedGetProducts.mockResolvedValue(mockedProducts);
  mockedGetCartItems.mockResolvedValue(mockedCartItems);
  render(<App />);

  const product1 = await screen.findByRole("heading", { name: /Kindle/ });
  expect(product1).toBeInTheDocument();

  const product2 = await screen.findByRole("heading", { name: /iPad/ });
  expect(product2).toBeInTheDocument();

  const item1 = await screen.findByText(/notebook/i);
  expect(item1).toBeInTheDocument();

  const item2 = await screen.findByText(/keyboard/i);
  expect(item2).toBeInTheDocument();
});

it("shows a message stating that there are no items in the cart if the cart is empty", async () => {
  const mockedEmptyCart: CartItem[] = [];
  mockedGetCartItems.mockResolvedValue(mockedEmptyCart);
  mockedGetProducts.mockResolvedValue(mockedProducts);
  render(<App />);

  const message = await screen.findByText("Your cart is empty");
  expect(message).toBeInTheDocument();
});

it("adds a new product, renders it in the product list, and clears the add form", async () => {
  const newProduct = {
    _id: "3",
    title: "Yamaha Portable Keyboard",
    quantity: 2,
    price: 155.99,
  };

  mockedGetProducts.mockResolvedValue(mockedProducts);
  mockedGetCartItems.mockResolvedValue(mockedCartItems);
  mockedAddProduct.mockResolvedValue(newProduct);
  render(<App />);

  const addBtn = screen.getByRole("button", { name: /add a product/i});
  await user.click(addBtn);

  const titleInput = screen.getByLabelText(/name/i);
  const priceInput = screen.getByLabelText(/price/i);
  const quantityInput = screen.getByLabelText(/quantity/i);

  await user.type(titleInput, "Yamaha Portable Keyboard");
  await user.type(priceInput, "155.99");
  await user.type(quantityInput, "2");

  const submitBtn = screen.getByRole("button", { name: "Add" });
  await user.click(submitBtn);

  expect(await screen.findByText("Yamaha Portable Keyboard")).toBeInTheDocument();
  
  expect(screen.getByRole("button", { name: "Add"})).toBeInTheDocument();
  // after clicking Add, requery the re-rendered input fields
  const titleInputAfter = await screen.findByLabelText(/product name/i);
  const priceInputAfter = await screen.findByRole('spinbutton', { name: /price/i });
  const quantityInputAter   = await screen.findByRole('spinbutton', { name: /quantity/i });

  // In @testing-library/jest-dom, toHaveValue returns null for empty number inputs (role spinbutton).
  // instead of asserting toHaveValue("") for numbers, use this instead:
  expect(titleInputAfter).not.toHaveValue();
  expect(priceInputAfter).not.toHaveValue();
  expect(quantityInputAter).not.toHaveValue();
});

it("updates a product, displays the new product, and closes the edit form", async () => {
  const updatedProduct = {
    _id: "1",
    title: "New Amazon Kindle E-reader",
    quantity: 10,
    price: 105.99,
  };

  mockedGetProducts.mockResolvedValue(mockedProducts);
  mockedGetCartItems.mockResolvedValue(mockedCartItems);
  mockedUpdateProduct.mockResolvedValue(updatedProduct);
  render(<App />);

  const editBtn = await screen.findByTestId(`edit-${updatedProduct._id}`);
  await user.click(editBtn);

  const titleInput = screen.getByLabelText(/name/i);
  const priceInput = screen.getByLabelText(/price/i);
  const quantityInput = screen.getByLabelText(/quantity/i);

  await user.clear(titleInput);
  await user.type(titleInput, "New Amazon Kindle E-reader");
  await user.clear(priceInput);
  await user.type(priceInput, "105.99");
  await user.clear(quantityInput);
  await user.type(quantityInput, "10");

  const updateBtn = screen.getByRole("button", { name: /update/i});
  await user.click(updateBtn);

  expect(await screen.findByText("New Amazon Kindle E-reader")).toBeInTheDocument();
  // the edit form disappears after updating
  expect(screen.queryByRole("button", { name: /update/i})).not.toBeInTheDocument();
});

it("deletes a product", async () => {
  mockedGetProducts.mockResolvedValue(mockedProducts);
  mockedGetCartItems.mockResolvedValue(mockedCartItems);
  mockedDeleteProduct.mockResolvedValueOnce(undefined);
  render(<App />);

  const deletedProductId = mockedProducts[0]._id;

  expect(await screen.findByText(/kindle e-reader/i)).toBeInTheDocument();

  const deleteBtn = await screen.findByTestId(`delete-${deletedProductId}`);
  await user.click(deleteBtn);
  expect(screen.queryByRole("heading", { name: /kindle e-reader/i })).not.toBeInTheDocument();
});

it("adds a product to cart and displays it in the cart", async () => {
  const addedItem = {
    _id: "a3",
    productId: "2",
    title: "Apple 10.5-Inch iPad Pro",
    quantity: 1,
    price: 649.99,
  };

  mockedGetProducts.mockResolvedValue(mockedProducts);
  mockedGetCartItems.mockResolvedValue(mockedCartItems);
  mockedAddItemToCart.mockResolvedValue({
    product: mockProducts[1],
    item: addedItem,
  });
  render(<App />);

  expect(await screen.findByText(/ipad/i));
  expect(screen.queryByTestId(`cartItem-${addedItem._id}`)).not.toBeInTheDocument();

  const addToCartBtn = screen.getByTestId(`add-to-cart-${addedItem.productId}`);
  await user.click(addToCartBtn);
  expect(await screen.findByTestId(`cartItem-${addedItem._id}`)).toBeInTheDocument();
});

it("allows checking out the cart", async() => {
  mockedGetProducts.mockResolvedValue(mockedProducts);
  mockedGetCartItems.mockResolvedValue(mockedCartItems);
  mockedCheckoutCart.mockResolvedValue(undefined);
  render(<App />);

  const cartItemId = mockedCartItems[0]._id;
  expect(await screen.findByTestId(`cartItem-${cartItemId}`)).toBeInTheDocument();

  const checkoutBtn = screen.getByRole("button", { name: /checkout/i });
  await user.click(checkoutBtn);
  expect(await screen.findByText("Your cart is empty")).toBeInTheDocument();
});


/* alternatively, create typed mocked modules instead of mocked individual functions
import * as productsApi from "./services/products";
import * as cartApi from "./services/cart";

// Mock the modules (Vitest hoists these)
vi.mock("./services/products");
vi.mock("./services/cart");

// Get typed mocked modules
const mockedProductsApi = vi.mocked(productsApi); // deep: true by default
const mockedCartApi = vi.mocked(cartApi);

// Usage
mockedProductsApi.getProducts.mockResolvedValue([]);
mockedCartApi.checkoutCart.mockResolvedValueOnce(undefined);
*/