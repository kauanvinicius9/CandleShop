import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Product } from "../models/product.model";
import productsData from "../../../assets/data/products.json";

// Chamada dos dados em JSON
@Injectable({ providedIn: "root" })
export class ProductService {
  private readonly products: Product[] = productsData as Product[]

  getAll(): Observable<Product[]> { 
    return of(this.products); 
  }
  
  getById(id: number): Observable<Product | undefined> { 
    return of(this.products.find((product) => product.id === id)); 
  }
}
