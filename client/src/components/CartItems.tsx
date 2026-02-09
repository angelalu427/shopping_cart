import CartItemRow from "./CartItemRow";
import type { CartItem } from "../types";
import { calculateTotal } from "../helpers/helpers";

interface CartItemsProps {
  cartItems: CartItem[];
}
const CartItems = ({ cartItems }: CartItemsProps) => {
  const total = calculateTotal(cartItems);

  return (
    <table className="cart-items">
      <thead>
        <tr>
          <th scope="col">Item</th>
          <th scope="col">Quantity</th>
          <th scope="col">Price</th>
        </tr>
      </thead>
      <tbody>
        {cartItems.map((item) => (
          <CartItemRow item={item} key={item._id} />
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={3} className="total">
            Total: ${total}
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default CartItems;
