import { Component, OnInit, signal } from "@angular/core";
import { Title, Meta } from "@angular/platform-browser";
import { RouterLink } from "@angular/router";
import { Product } from "../../core/models/product.model";
import { ProductService } from "../../core/services/product.service";
import { ProductCardComponent } from "../product-card/product-card.component";
import { SkeletonLoadingComponent } from "../loadings/skeleton/skeleton-loading.component";
import { finalize } from "rxjs";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [RouterLink, ProductCardComponent, SkeletonLoadingComponent],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss"
})

export class HomeComponent implements OnInit {
  readonly featuredProducts = signal<Product[]>([]);
  readonly isLoading = signal(true);
  readonly skeletonItems = [1, 2, 3, 4];

  constructor(
    private readonly productService: ProductService,
    private readonly titleService: Title,
    private readonly metaService: Meta
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle("Reviva Ateliê | Velas & Aromas");
    this.metaService.updateTag({
      name: "description",
      content: "Transforme seu ambiente com a Reviva Velas. Velas aromáticas 100% artesanais, feitas com cera vegetal e essências premium. Compre online e receba em casa"
    });

    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading.set(true);
    this.productService
      .getAll()
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (products) => this.featuredProducts.set(products.slice(0,4)),
        error: (err) => console.error("Erro ao carregar produtos em destaque:", err)
      })
  }
}