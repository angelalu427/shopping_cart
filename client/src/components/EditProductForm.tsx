import React from "react";
import ProductForm from "./ProductForm";
import type { Product } from "../types";

interface EditProductFormProps {
  product: Product;
  onEditFormSubmit: (updatedProduct: Product) => void;
  onCancel: () => void;
}

const EditProductForm = ({
  product,
  onEditFormSubmit,
  onCancel,
}: EditProductFormProps) => {
  const [title, setTitle] = React.useState<string>(product.title);
  const [price, setPrice] = React.useState<number | "">(product.price);
  const [quantity, setQuantity] = React.useState<number | "">(product.quantity);

  const handleSubmit = () => {
    onEditFormSubmit({ 
      ...product,
      title: title.trim(),
      price: Number(price),
      quantity: Number(quantity),
    });
  };

  return (
    <div className="edit-form">
      <h3>Edit Product</h3>
      <ProductForm
        title={title}
        price={price}
        quantity={quantity}
        setTitle={setTitle}
        setPrice={setPrice}
        setQuantity={setQuantity}
        onSubmit={handleSubmit}
        onCancel={onCancel}
        buttonLabel="Update"
      />
    </div>
  );
};

export default EditProductForm;
