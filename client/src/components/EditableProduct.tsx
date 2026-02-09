import React from "react";
import type { Product as ProductType } from "../types";
import Product from "./Product";
import EditProductForm from "./EditProductForm";

interface EditableProductProps {
  product: ProductType;
  onEditFormSubmit: (updatedProduct: ProductType) => void;
  onDeleteProduct: (productId: string) => void;
  onAddItemToCart: (productId: string) => void;
}

const EditableProduct = ({
  product,
  onEditFormSubmit,
  onDeleteProduct,
  onAddItemToCart,
}: EditableProductProps) => {
  const [isEditing, setIsEditing] = React.useState<boolean>(false);

  const handleSubmit = (updatedProduct: ProductType) => {
    onEditFormSubmit(updatedProduct);
    setIsEditing(false);
  };

  return (
    <li className="product">
      <Product
        product={product}
        onAdd={() => onAddItemToCart(product._id)}
        onEdit={() => setIsEditing(true)}
        onDelete={() => onDeleteProduct(product._id)}
      />

      {isEditing && (
        <EditProductForm
          key={product._id}
          product={product}
          onEditFormSubmit={handleSubmit}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </li>
  );
};

export default EditableProduct;
