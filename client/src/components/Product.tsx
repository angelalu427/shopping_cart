import React from "react";
import type { Product as ProductType } from "../types";
import { CurrencyContext } from "../providers/CurrencyContext";
import { formatPrice } from "../helpers/helpers";

interface ProductProps {
  product: ProductType;
  onAdd: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const Product = ({ product, onAdd, onEdit, onDelete }: ProductProps) => {
  const { currency, rates } = React.useContext(CurrencyContext);

  return (
    <div className="product-details">
      <h3>{product.title}</h3>
      <p className="price">{formatPrice(product.price, currency, rates)}</p>
      <p className={`quantity ${product.quantity === 0 ? "none-left" : ""}`}>
        {product.quantity === 0 ? "Out of stock" : `${product.quantity} left in stock`} 
      </p>

      <div className="actions product-actions">
        <button 
          data-testid={`add-to-cart-${product._id}`}
          className="add-to-cart" 
          disabled={product.quantity === 0}
          onClick={onAdd}
        >
          Add to Cart
        </button>
        <button 
          data-testid={`edit-${product._id}`}
          className="edit" 
          onClick={onEdit}
        >
          Edit
        </button>
      </div>

      <button 
        data-testid={`delete-${product._id}`}
        className="delete-button" 
        onClick={onDelete}
      >
        <span>X</span>
      </button>
    </div>
  )
};

export default Product;