export type ProductCategory = "vela" | "home-spray" | "difusor";
export type ProductCollection = "entretampos" | "sugar-berry" | "gourmet" | "fe" | "lembrancas" | "especiais" | "natal";

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
}
