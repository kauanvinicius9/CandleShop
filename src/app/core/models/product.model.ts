export type ProductCategory = "vela" | "homespray" | "difusor" | "kit";
export type ProductCollection = "entretampos" | "sugarberry" | "gourmet" | "fe" | "lembrancas" | "especiais" | "natal";

export interface BulkPricing {
  minQuantity: number;
  unitPrice: number;
}

export interface Product {
  id: number;
  name: string;
  category: ProductCategory;
  collection?: ProductCollection;
  fragrance: string;
  description: string;
  price: number;
  imagePlaceholder: string;
  weightG?: number;
  volumML?: number;
  bulkPricing?: BulkPricing;
}