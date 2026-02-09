import type { Product as ProductType } from "../types";
import type { SortState } from "../types/sorting";
import EditableProduct from "./EditableProduct";
import ProductSortBar from "./ProductSortBar";

type ProductListingProps = {
  sort: SortState;
  onSortChange: (newState: SortState) => void;
  products: ProductType[];
  onAddItemToCart: (productId: string) => void;
  onEditFormSubmit: (updatedProduct: ProductType) => void;
  onDeleteProduct: (productId: string) => void;
};

const ProductListing = ({
  products, 
  sort,
  onSortChange,
  onAddItemToCart, 
  onEditFormSubmit, 
  onDeleteProduct 
}: ProductListingProps) => {
  return (
    <div className="product-listing">
      <div className="listing-header">
        <h2>Products</h2>
        <ProductSortBar value={sort} onChange={onSortChange} />
      </div>

      <ul className="product-list">
        {products.map(p => (
          <EditableProduct
            key={p._id}
            product={p}
            onAddItemToCart={onAddItemToCart} 
            onEditFormSubmit={onEditFormSubmit} 
            onDeleteProduct={onDeleteProduct}
          />
        ))}
      </ul>
    </div>
  );
};

export default ProductListing;