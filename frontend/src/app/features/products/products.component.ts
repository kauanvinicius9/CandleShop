import { Component, OnInit, computed, signal } from "@angular/core";
import { Product, ProductCategory, ProductCollection } from "../../core/models/product.model";
import { ProductService } from "../../core/services/product.service";
import { ProductCardComponent } from "../product-card/product-card.component";

type FilterType = ProductCategory | ProductCollection | "todos";

@Component({
  selector: "app-products",
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: "./products.component.html",
  styleUrl: "./products.component.scss"
})
export class ProductsComponent implements OnInit {
  readonly allProducts = signal<Product[]>([]);
  readonly activeFilter = signal<FilterType>("todos");

  readonly filteredProducts = computed(() => {
    const filter = this.activeFilter();
    const products = this.allProducts();

    if (filter === "todos") return this.allProducts();
    if (filter === "vela" || filter === "homespray" || filter === "difusor" || filter === "kit") {
      return products.filter((p) => p.category === filter);
    }

    return products.filter((p) => p.collection === filter)
  });

  readonly filters: { value: FilterType; label: string }[] = [
    { value: "todos", label: "Todos os Produtos" },
    { value: "vela", label: "Todas as Velas" },
    { value: "natal", label: "Coleção Natal 2026" },
    { value: "sugarberry", label: "Coleção Sugar Berry" },
    { value: "gourmet", label: "Coleção Gourmet" },
    { value: "entretampos", label: "Coleção Entretampos" },
    { value: "especiais", label: "Coleção Especiais" },
    { value: "lembrancas", label: "Coleção Lembranças" },
    { value: "fe", label: "Coleção Fé" },
    { value: "homespray", label: "Home Sprays" },
    { value: "kit", label: "Kits" },
    { value: "difusor", label: "Difusores" }
  ];

  constructor(private readonly productService: ProductService) {}

  ngOnInit(): void { 
    this.productService.getAll().subscribe((products) => this.allProducts.set(products)); 
  }

  setFilter(filter: FilterType): void { 
    this.activeFilter.set(filter); 
  }
}