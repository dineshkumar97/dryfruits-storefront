import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', title: 'Fresh Dry Fruits Online', loadComponent: () => import('./pages/home').then((m) => m.Home) },
  { path: 'shop', title: 'Shop', loadComponent: () => import('./pages/catalog').then((m) => m.Catalog) },
  { path: 'product/:slug', title: 'Product', loadComponent: () => import('./pages/product-detail').then((m) => m.ProductDetail) },
  { path: 'cart', title: 'Your Cart', loadComponent: () => import('./pages/cart').then((m) => m.Cart) },
  { path: 'checkout', title: 'Checkout', loadComponent: () => import('./pages/checkout').then((m) => m.Checkout) },
  { path: 'order-success/:id', title: 'Order Placed', loadComponent: () => import('./pages/order-success').then((m) => m.OrderSuccess) },
  { path: 'about', title: 'About Us', loadComponent: () => import('./pages/about').then((m) => m.About) },
  { path: 'contact', title: 'Contact Us', loadComponent: () => import('./pages/contact').then((m) => m.Contact) },
  { path: 'bulk-order', title: 'Bulk Order', loadComponent: () => import('./pages/bulk-order').then((m) => m.BulkOrder) },
  { path: 'privacy-policy', title: 'Privacy Policy', data: { kind: 'privacy' }, loadComponent: () => import('./pages/policy').then((m) => m.Policy) },
  { path: 'return-policy', title: 'Return Policy', data: { kind: 'returns' }, loadComponent: () => import('./pages/policy').then((m) => m.Policy) },
  { path: 'terms', title: 'Terms & Conditions', data: { kind: 'terms' }, loadComponent: () => import('./pages/policy').then((m) => m.Policy) },
  { path: '**', title: 'Page not found', loadComponent: () => import('./pages/not-found').then((m) => m.NotFound) },
];
