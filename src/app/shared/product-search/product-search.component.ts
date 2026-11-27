import { Component, input, output } from "@angular/core";

@Component({
    selector: "app-product-search",
    standalone: true,
    templateUrl: "./product-search.component.html",
    styleUrl: "./product-search.component.scss"
})
export class ProductSearchComponent {
    readonly query = input<string>("");
    readonly placeholder = input<string>("Buscar por produto, aroma ou código...");

    readonly queryChange = output<string>();
    readonly clearSearch = output<void>();

    onInput(event: Event): void {
        const inputEl = event.target as HTMLInputElement;
        this.queryChange.emit(inputEl.value);
    }

    onClear(): void {
        this.clearSearch.emit();
    }
}