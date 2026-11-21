import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { BRAND } from '../core/brand';
import { CartService } from '../core/cart.service';
import { ProductService } from '../core/product.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <div class="topbar">
      <div class="container topbar-row">
        <span class="topbar-links">
          <a [href]="'tel:' + brand.phone.replaceAll(' ', '')">📞 {{ brand.phone }}</a>
          <a [href]="'mailto:' + brand.email">✉️ {{ brand.email }}</a>
        </span>
        <span class="topbar-links">
          @for (s of socials; track s.label) {
            <a [href]="s.url" target="_blank" rel="noopener">{{ s.label }}</a>
          }
        </span>
      </div>
    </div>

    <header class="site-header">
      <div class="container header-row">
        <a routerLink="/" class="logo">🌰 {{ brand.name }}</a>

        <nav class="nav" aria-label="Main">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Home</a>
          <a routerLink="/about" routerLinkActive="active">About Us</a>
          <div class="dropdown">
            <a routerLink="/shop" routerLinkActive="active">Shop ▾</a>
            <div class="menu">
              @for (c of products.categories; track c.id) {
                <a routerLink="/shop" [queryParams]="{ category: c.id }">{{ c.emoji }} {{ c.name }}</a>
              }
            </div>
          </div>
          <a routerLink="/bulk-order" routerLinkActive="active">Bulk Order</a>
          <a routerLink="/contact" routerLinkActive="active">Contact Us</a>
        </nav>

        <form class="search" (submit)="search($event, box.value)" role="search">
          <input #box type="search" placeholder="Search almonds, dates..." aria-label="Search products" />
        </form>

        <a routerLink="/cart" class="cart-link" aria-label="Cart">
          🛒 Cart
          @if (cart.count() > 0) {
            <span class="badge">{{ cart.count() }}</span>
          }
        </a>
      </div>
    </header>

    <nav class="bottom-bar" aria-label="Quick navigation">
      <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">🏠<span>Home</span></a>
      <a routerLink="/shop" routerLinkActive="active">🛍️<span>Shop</span></a>
      <a routerLink="/cart" routerLinkActive="active">🛒<span>Cart @if (cart.count() > 0) { ({{ cart.count() }}) }</span></a>
      <a routerLink="/contact" routerLinkActive="active">💬<span>Contact</span></a>
    </nav>
  `,
})
export class Header {
  protected readonly brand = BRAND;
  protected readonly socials = BRAND.socials.filter((s) => s.url);
  protected readonly cart = inject(CartService);
  protected readonly products = inject(ProductService);
  private readonly router = inject(Router);

  protected search(event: Event, value: string): void {
    event.preventDefault();
    this.router.navigate(['/shop'], { queryParams: { q: value.trim() || null } });
  }
}
