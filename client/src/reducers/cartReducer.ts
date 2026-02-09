import type { CartItem } from "../types";

type CartAction =
  | { type: "loaded"; items: CartItem[] }
  | { type: "addedToCart"; item: CartItem }
  | { type: "checkedout" };

function cartReducer(cartItems: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "loaded": {
      return action.items;
    }
    case "addedToCart": {
      const itemIdx = cartItems.findIndex((i) => i._id === action.item._id);
      if (itemIdx === -1) return [action.item, ...cartItems];
      const newCart = cartItems.slice();
      newCart[itemIdx] = action.item;
      return newCart;
    }
    case "checkedout":
      return [];
    default:
      return cartItems;
  }
}

export default cartReducer;