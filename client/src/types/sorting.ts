export const SORT_KEYS = ["title", "price", "quantity"] as const;

export type SortKey = typeof SORT_KEYS[number];

export type SortOrder = "asc" | "desc";

export interface SortState {
  key: SortKey;
  order: SortOrder;
};