import { Routes } from '@angular/router';
import { ProductList } from './components/product-list/product-list';
import { Contacts } from './components/contacts/contacts';
import { ProductDetail } from './components/product-detail/product-detail';
import { roleGuard } from './guards/role.guard';
import { Login } from './components/login/login';
import { Register } from './components/register/register';


export const routes: Routes = [
  { path: '', component: ProductList },
  { path: 'register', component: Register },
  { path: 'login', component: Login },
  { path: 'contacts', component: Contacts },
  { path: 'product/:id', component: ProductDetail },
  {
    path: 'add-product', loadComponent: () => import('./components/add-product/add-product').then(m => m.AddProduct),
    canActivate: [roleGuard(['admin'])]
   },
  {
    path: 'edit-product/:id', loadComponent: () => import('./components/edit-product/edit-product').then(m => m.EditProduct),
    canActivate: [roleGuard(['admin', 'owner'])]
  },
  {
    path: 'order', loadComponent: () => import('./components/order/order').then(m => m.Order),
    canActivate: [roleGuard(['client', 'admin', 'owner'])]
   },
  { path: 'thanks', component: Contacts },
  { path: '**', redirectTo: ''}
];

