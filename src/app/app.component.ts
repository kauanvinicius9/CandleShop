import { Component, OnInit, OnDestroy, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "./shared/header/header.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { SpinnerLoadingComponent } from "./features/loadings/spinner/spinner-loading.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, SpinnerLoadingComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss"
})
export class AppComponent implements OnInit, OnDestroy {
  readonly isAppLoading = signal(true);
  private fallbackTimer?: ReturnType<typeof setTimeout>;
  private readonly onWindowLoad = (): void => {
    clearTimeout(this.fallbackTimer);
    this.isAppLoading.set(false);
  };

  ngOnInit(): void {
    this.isAppLoading.set(true);

    if (document.readyState === "complete") {
      // Intervalo para o overlay não piscar de forma seca
      this.fallbackTimer = setTimeout(() => this.isAppLoading.set(false), 250);
    } else {
      window.addEventListener("load", this.onWindowLoad, { once: true });
      // Se algum recurso de fora demorar ou falhar
      this.fallbackTimer = setTimeout(() => this.isAppLoading.set(false), 2500);
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener("load", this.onWindowLoad);
    clearTimeout(this.fallbackTimer);
  }
}
