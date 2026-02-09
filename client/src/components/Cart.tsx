import React from "react";
import type { CartItem } from "../types";
import CartItems from "./CartItems";
import { CurrencyContext } from "../providers/CurrencyContext";
import { formatPrice } from "../helpers/helpers";

interface CartProps {
  cartItems: CartItem[];
  onCheckoutCart: () => void;
}

const Cart = ({ cartItems, onCheckoutCart }: CartProps) => {
  const hasItems = cartItems.length > 0;
  const { currency } = React.useContext(CurrencyContext);

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      
      {hasItems ? (
        <CartItems cartItems={cartItems} />
      ) : (
        <>
          <p>Your cart is empty</p>
          <p>Total: {formatPrice(0, currency)}</p>
        </>
      )}

      <button
        className="checkout"
        onClick={onCheckoutCart}
        disabled={!hasItems}
      >
        Checkout
      </button>
    </div>
  );
};

export default Cart;
