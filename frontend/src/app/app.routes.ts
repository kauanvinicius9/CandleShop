import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ProductsComponent } from './features/products/products.component';
import { ContactComponent } from './features/contact/contact.component';
import { AboutProductsComponent } from './features/about/about.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { MainLayoutComponent } from './main-layout.component';

export const routes: Routes = [
  // Grupo de rotas
  { 
    path: '', 
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent, title: 'Reviva | Velas & Aromas' },
      { path: 'produtos', component: ProductsComponent, title: 'Produtos | Reviva' },
      { path: 'contato', component: ContactComponent, title: 'Contato | Reviva' },
      { path: 'sobre', component: AboutProductsComponent, title: 'Sobre | Reviva' },
    ]
  },

  // Página 404 isolada
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Página Não Encontrada'
  }
]