import React from 'react';
import type { NewProduct } from "../types";
import ProductForm from "./ProductForm";

interface AddProductFormProps {
  onAddFormSubmit: (newProduct: NewProduct, callback?: () => void) => void;
  onCancel: () => void;
};

const AddProductForm = ({ onAddFormSubmit, onCancel }: AddProductFormProps) => {
  const [title, setTitle] = React.useState<string>("");
  const [price, setPrice] = React.useState<number | "">("");
  const [quantity, setQuantity] = React.useState<number | "">("");
  const resetForm = () => {
    setTitle("");
    setPrice("");
    setQuantity("");
  };

  const handleSubmit = () => {
    onAddFormSubmit({ 
      title, 
      price: Number(price), 
      quantity: Number(quantity),
    }, resetForm);
  };

  return (
    <div className="add-form">
      <ProductForm 
        title={title}
        price={price}
        quantity={quantity}
        setTitle={setTitle}
        setPrice={setPrice}
        setQuantity={setQuantity}
        onSubmit={handleSubmit}
        onCancel={onCancel}
        buttonLabel="Add"
      />
    </div>
  )
};

export default AddProductForm;