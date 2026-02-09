interface ProductFormProps {
  title: string;
  price: number | "";
  quantity: number | "";
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setPrice: React.Dispatch<React.SetStateAction<number | "">>;
  setQuantity: React.Dispatch<React.SetStateAction<number | "">>;
  onSubmit: () => void;
  onCancel: () => void;
  buttonLabel: string;
}

const ProductForm = ({
  title,
  price,
  quantity,
  setTitle,
  setPrice,
  setQuantity,
  onSubmit,
  onCancel,
  buttonLabel,
}: ProductFormProps) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div className="input-group">
        <label htmlFor="product-name">Product Name:</label>
        <input
          type="text"
          id="product-name"
          name="product-name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="product-price">Price:</label>
        <input
          type="number"
          id="product-price"
          name="product-price"
          min="0"
          step="0.01"
          value={price}
          onChange={(e) => {
            const n = e.currentTarget.valueAsNumber;
            setPrice(Number.isNaN(n) ? "" : n);
          }}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="product-quantity">Quantity:</label>
        <input
          type="number"
          id="product-quantity"
          name="product-quantity"
          min="0"
          value={quantity}
          onChange={(e) => {
            const n = e.target.valueAsNumber;
            setQuantity(Number.isNaN(n) ? "" : n);
          }}
          required
        />
      </div>
      <div className="actions form-actions">
        <button type="submit">{buttonLabel}</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
