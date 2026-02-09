import React from "react";
import Cart from "./components/Cart";
import ProductListing from "./components/ProductListing";
import ToggleableAddForm from "./components/ToggleableAddForm";
import type { Product, NewProduct } from "./types";
import { productsReducer } from "./reducers/productsReducer";
import cartReducer from "./reducers/cartReducer";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "./services/products";
import { checkoutCart, getCartItems, addItemToCart } from "./services/cart";
import { ThemeContext } from "./providers/ThemeContext";
import { ThemeToggle } from "./components/ThemeToggle";
import { CurrencyToggle } from "./components/CurrencyToggle";
import { ZodError } from "zod";

const App = () => {
  // const [products, setProducts] = React.useState<Product[]>([]);
  // const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
  const [productsState, productsDispatch] = React.useReducer(
    productsReducer, 
    { products: [], sort: { key: "title", order: "asc" } }
  );
  const [cartItems, cartDispatch] = React.useReducer(cartReducer, []);
  const { theme } = React.useContext(ThemeContext);

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        // setProducts(data);
        productsDispatch({
          type: "loaded",
          products: data,
        });
      } catch (e: unknown) {
        if (e instanceof ZodError) {
          console.log(e);
        }
        console.log(e);
      }
    };
    fetchProducts();
  }, []);

  React.useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const data = await getCartItems();
        // setCartItems(data);
        cartDispatch({
          type: "loaded",
          items: data,
        });
      } catch (e: unknown) {
        if (e instanceof ZodError) {
          console.log(e);
        }
        console.log(e);
      }
    };
    fetchCartItems();
  }, []);

  const handleAddFormSubmit = async (
    newProduct: NewProduct,
    callback?: () => void
  ) => {
    try {
      const data = await addProduct(newProduct);
      // setProducts((prevProducts) => prevProducts.concat(data));
      productsDispatch({
        type: "added",
        product: data,
      });
      if (callback) {
        callback();
      }
    } catch (e: unknown) {
      console.log(e);
    }
  };

  const handleEditFormSubmit = async (updatedProduct: Product) => {
    try {
      const data = await updateProduct(updatedProduct);
      // setProducts(prevProducts => {
      //   return prevProducts.map(p => (p._id === data._id ? data : p));
      // });
      productsDispatch({
        type: "updated",
        product: data,
      });
    } catch (e: unknown) {
      if (e instanceof ZodError) {
        console.log(e);
      }
      console.log(e);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await deleteProduct(productId);
      // setProducts((prevProducts) => prevProducts.filter(p => p._id !== productId));
      productsDispatch({
        type: "deleted",
        id: productId,
      });
    } catch (e: unknown) {
      console.log(e);
    }
  };

  const handleCheckoutCart = async () => {
    try {
      await checkoutCart();
      // setCartItems([]);
      cartDispatch({
        type: "checkedout",
      });
    } catch (e: unknown) {
      console.log(e);
    }
  };

  const handleAddItemToCart = async (productId: string) => {
    try {
      const { product, item } = await addItemToCart(productId);
      // setProducts(prevProducts => {
      //   return prevProducts.map(p => (p._id === product._id ? product : p));
      // });
      productsDispatch({
        type: "updated",
        product: product,
      });
      // setCartItems(prevItems => {
      //   if (!item) return prevItems;
      //   const itemIdx = prevItems.findIndex(i => i._id === item._id);
      //   if (itemIdx === -1) return [item, ...prevItems];
      //   const newCart = prevItems.slice();
      //   newCart[itemIdx] = item;
      //   return newCart;
      // });
      if (item) {
        cartDispatch({
          type: "addedToCart",
          item: item,
        });
      }
    } catch (e: unknown) {
      console.log(e);
    }
  };

  const sortedProducts = React.useMemo(() => {
    const { products, sort } = productsState;
    const copy = products.slice();
    copy.sort((a, b) => {
      const { key, order } = sort;
      const dir = order === "asc" ? 1 : -1;

      const valueA = key === "title" ? a.title.toLowerCase() : a[key];
      const valueB = key === "title" ? b.title.toLowerCase() : b[key];

      if (valueA < valueB) return -1 * dir;
      if (valueA > valueB) return 1 * dir;
      return 0;
    });
    return copy;
  }, [productsState]);

  return (
    <div id="app" className={theme === "dark" ? "theme-dark" : ""}>
      <header>
        <h1>The Shop!</h1>
        <ThemeToggle />
        <CurrencyToggle />
        <Cart cartItems={cartItems} onCheckoutCart={handleCheckoutCart} />
      </header>
      <main>
        <ProductListing
          sort={productsState.sort}
          onSortChange={(sort) => productsDispatch({ type: "sortChanged", sort })}
          products={sortedProducts}
          onAddItemToCart={handleAddItemToCart}
          onEditFormSubmit={handleEditFormSubmit}
          onDeleteProduct={handleDeleteProduct}
        />
        <ToggleableAddForm onAddFormSubmit={handleAddFormSubmit} />
      </main>
    </div>
  );
};

export default App;
