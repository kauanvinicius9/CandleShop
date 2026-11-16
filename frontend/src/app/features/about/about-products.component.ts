import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-about-products",
  standalone: true,
  imports: [RouterLink],
  templateUrl: "./about-products.component.html",
  styleUrl: "./about-products.component.scss"
})
export class AboutProductsComponent {}