import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/layout/not-found/not-found.component';
import { LoginComponent } from './shared/layout/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home/adviser' },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((module) => module.HomeModule),
  }, // lazy load
  {
    path: 'shop',
    loadChildren: () =>
      import('./shop/shop.module').then((module) => module.ShopModule),
  }, // lazy load
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
