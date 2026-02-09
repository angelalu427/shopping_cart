import type { Product } from "../types";
import type { SortState } from "../types/sorting";

export type ProductsAction =
  | { type: "loaded"; products: Product[] }
  | { type: "added"; product: Product }
  | { type: "updated"; product: Product }
  | { type: "deleted"; id: string }
  | { type: "sortChanged"; sort: SortState };

export interface ProductsState {
  products: Product[];
  sort: SortState;
}

export function productsReducer(
  state: ProductsState,
  action: ProductsAction
): ProductsState {
  switch (action.type) {
    case "loaded": {
      return { ...state, products: action.products };
    }
    case "added": {
      return { ...state, products: [...state.products, action.product] };
    }
    case "updated": {
      return {
        ...state,
        products: state.products.map((p) =>
          p._id === action.product._id ? action.product : p
        ),
      };
    }
    case "deleted": {
      return {
        ...state,
        products: state.products.filter((p) => p._id !== action.id),
      };
    }
    case "sortChanged": {
      return {
        ...state,
        sort: action.sort,
      };
    }
    default:
      return state;
  }
}
