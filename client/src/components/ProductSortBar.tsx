import { SORT_KEYS, type SortKey, type SortState } from "../types/sorting";

interface ProductSortBarProps {
  value: SortState;
  onChange: (newState: SortState) => void;
}

const LABELS = {
  title: "Name",
  price: "Price",
  quantity: "Quantity",
} satisfies Record<SortKey, string>;

const ProductSortBar = ({ value, onChange }: ProductSortBarProps) => {
  const handleClick = (key: SortKey) => {
    if (key === value.key) {
      onChange({
        key,
        order: value.order === "asc" ? "desc" : "asc",
      });
    } else {
      onChange({
        key,
        order: "asc",
      });
    }
  };

  const arrowFor = (key: SortKey) => {
    if (key === value.key) {
      if (value.order === "asc") {
        return "↑";
      } else {
        return "↓";
      }
    } else {
      return " ";
    }
  };

  return (
    <div className="sort-bar" aria-label="Sort products">
      <span>Sort by: </span>
      {SORT_KEYS.map((key) => {
        const active = key === value.key;
        return (
          <button
            key={key}
            type="button"
            className={`sort-btn ${active ? "active" : ""}`}
            onClick={() => handleClick(key)}
          >
            <span className="label">{LABELS[key]}</span>
            <span className="arrow" aria-hidden="true">
              {arrowFor(key)}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default ProductSortBar;
