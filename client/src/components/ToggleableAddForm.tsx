import React from "react";
import type { NewProduct } from "../types";
import AddProductForm from "./AddProductForm";

type ToggleableAddFormProps = {
  onAddFormSubmit: (product: NewProduct) => void;
}

const ToggleableAddForm = ({ onAddFormSubmit }: ToggleableAddFormProps) => {
  const [isAddFormShown, setIsAddFormShown] = React.useState<boolean>(false);

  return (
    <div>
      {isAddFormShown ? (
        <AddProductForm 
          onAddFormSubmit={onAddFormSubmit} 
          onCancel={() => setIsAddFormShown(false)} 
        />
      ) : (
        <button 
          className="add-product-button"
          onClick={() => setIsAddFormShown(true)}
        >
          Add A Product</button>
      )}
    </div>
  );
};

export default ToggleableAddForm;
