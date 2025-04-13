export interface DiscogsSearchResponse {
  pagination: {
    items: number;
    pages: number;
    per_page: number;
    page: number;
  };
  results: Array<{
    title: string;
    year: number;
    format: string[];
    country: string;
  }>;
}
