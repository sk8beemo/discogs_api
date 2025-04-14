export interface DiscogsSearchResponse<T> {
  pagination: {
    items: number;
    pages: number;
    per_page: number;
    page: number;
  };
  results: Array<T>;
}
