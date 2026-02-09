import type { CartItem } from "../types"

interface CartItemRowProps {
  item: CartItem
};

const CartItemRow = ({ item }: CartItemRowProps) => {
  return (
    <tr data-testid={`cartItem-${item._id}`}>
      <td>{item.title}</td>
      <td>{item.quantity}</td>
      <td>{item.price}</td>
    </tr>
  );
};

export default CartItemRow;