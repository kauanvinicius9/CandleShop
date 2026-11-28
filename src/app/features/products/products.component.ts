import { Component, OnInit, computed, signal, OnDestroy } from "@angular/core";
import { Product, ProductCategory, ProductCollection } from "../../core/models/product.model";
import { ProductService } from "../../core/services/product.service";
import { ProductCardComponent } from "../product-card/product-card.component";
import { ProductSearchComponent } from "../../shared/product-search/product-search.component";
import { SkeletonLoadingComponent } from "../loadings/skeleton/skeleton-loading.component";
import { finalize } from "rxjs";

type FilterType = ProductCategory | ProductCollection | "todos";

@Component({
  selector: "app-products",
  standalone: true,
  imports: [ProductCardComponent, ProductSearchComponent, SkeletonLoadingComponent],
  templateUrl: "./products.component.html",
  styleUrl: "./products.component.scss"
})
export class ProductsComponent implements OnInit, OnDestroy {
  readonly isLoading = signal(true);
  readonly isSearching = signal(false);
  readonly isFiltering = signal(false);
  readonly skeletonItems = [1, 2, 3, 4, 5];

  readonly showLoading = computed(() => this.isLoading() || this.isSearching() || this.isFiltering());
  private searchTimeout: ReturnType<typeof setTimeout> | null = null; 
  private filterTimeout: ReturnType<typeof setTimeout> | null = null;

  readonly allProducts = signal<Product[]>([]);
  readonly activeFilter = signal<FilterType>("todos");
  readonly searchQuery = signal<string>("");

  readonly filteredProducts = computed(() => {
    const query = this.normalizeText(this.searchQuery().trim());
    const products = this.allProducts();

    // Procura em todos os produtos por nome, SKU ou aroma quando há busca ativa
    if (query) {
      return products.filter((p) => {
        const searchableText = this.normalizeText(
          `${p.name} ${p.fragrance ?? ""} ${p.sku}`
        );
        return searchableText.includes(query);
      });
    }

    const filter = this.activeFilter();

    // Filtragem de produtos, velas, homesprays, difusores e kits
    if (filter === "todos") return this.allProducts();
    if (filter === "vela" || filter === "homespray" || filter === "difusor" || filter === "kit") {
      return products.filter((p) => p.category === filter);
    }
    return products.filter((p) => p.collection === filter)
  });

  // Produtos separados por coleções e categorias
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
    { value: "difusor", label: "Difusores" },
    { value: "queima-de-estoque", label: "Queima de Estoque" }
  ];

  constructor(private readonly productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  setFilter(filter: FilterType): void { 
    this.clearSearchTimeout();
    this.clearFilterTimeout();

    this.isSearching.set(false);
    this.searchQuery.set("");
    this.activeFilter.set(filter);
    
    // Ativa o skeleton quando clica em uma coleção ou categoria
    this.isFiltering.set(true);

    // Desativa 250ms depois que selecionar a categoria ou coleção
    this.filterTimeout = setTimeout(() => {
      this.isFiltering.set(false);
    }, 250);
  }

  onSearchChange(value: string): void {
    this.searchQuery.set(value);
    this.clearSearchTimeout();
    this.clearFilterTimeout();
    this.isFiltering.set(false);

    if (!value.trim()) {
      this.isSearching.set(false);
      return;
    }

    // Ativa o skeleton enquanto estiver digitando
    this.isSearching.set(true);
    
    // Desativa 300ms depois que parar de digitar
    this.searchTimeout = setTimeout(() => {
      this.isSearching.set(false);
    }, 300);
  }

  clearSearch(): void {
    this.clearSearchTimeout();
    this.clearFilterTimeout();
    this.isSearching.set(false);
    this.isFiltering.set(false);
    this.searchQuery.set("");
  }

  ngOnDestroy(): void {
    this.clearSearchTimeout();
    this.clearFilterTimeout();
  }

  // Carregamento de produtos
  loadProducts(): void {
    this.isLoading.set(true);
    this.productService
      .getAll()
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (products) => this.allProducts.set(products),
        error: (err) => console.error("Erro ao carregar produtos:", err)
    });
  }

  private normalizeText(text: string): string {
    return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  private clearSearchTimeout(): void {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
      this.searchTimeout = null;
    }
  }

  private clearFilterTimeout(): void {
    if (this.filterTimeout) {
      clearTimeout(this.filterTimeout);
      this.filterTimeout = null
    }
  }
}