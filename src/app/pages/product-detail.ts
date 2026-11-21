import { Component, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../core/cart.service';
import { ProductService } from '../core/product.service';
import { RupeesPipe } from '../core/rupees.pipe';

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink, RupeesPipe],
  template: `
    @if (product(); as p) {
      <nav class="crumbs"><a routerLink="/shop">Shop</a> / {{ p.name }}</nav>

      <div class="detail">
        <div
          class="detail-visual"
          [style.background]="'linear-gradient(135deg, hsl(' + p.hue + ' 70% 90%), hsl(' + p.hue + ' 60% 78%))'"
        >
          <span class="emoji big">{{ p.emoji }}</span>
        </div>

        <div class="detail-info">
          <h1>{{ p.name }}</h1>
          <p class="muted">{{ p.origin }}</p>
          <p>{{ p.description }}</p>

          @if (variant(); as v) {
            <p class="price-row large">
              <span class="price">{{ v.price | rupees }}</span>
              <span class="mrp">{{ v.mrp | rupees }}</span>
              <span class="save">Save {{ discountPercent() }}%</span>
            </p>
            <p class="muted small">Inclusive of taxes. Delivery calculated at checkout.</p>
          }

          <h3>Pack size</h3>
          <div class="chips">
            @for (v of p.variants; track v.id) {
              <button type="button" class="chip" [class.active]="variant()?.id === v.id" (click)="selectedId.set(v.id)">
                {{ v.label }}
              </button>
            }
          </div>

          <h3>Quantity</h3>
          <div class="qty">
            <button type="button" (click)="qty.set(Math.max(1, qty() - 1))" aria-label="Decrease quantity">−</button>
            <span>{{ qty() }}</span>
            <button type="button" (click)="qty.set(Math.min(20, qty() + 1))" aria-label="Increase quantity">+</button>
          </div>

          <p>
            <button type="button" class="btn btn-primary" (click)="addToCart()">Add to cart</button>
            <a routerLink="/cart" class="btn btn-ghost">View cart</a>
          </p>
          @if (added()) {
            <p class="success" role="status">Added to your cart ✓</p>
          }

          <ul class="facts">
            <li>Best consumed within {{ p.shelfLifeDays }} days of packing</li>
            <li>Store in a cool, dry place in an airtight container</li>
          </ul>
        </div>
      </div>
    } @else {
      <p class="empty">We couldn't find that product. <a routerLink="/shop">Back to shop</a></p>
    }
  `,
})
export class ProductDetail {
  private readonly products = inject(ProductService);
  private readonly cart = inject(CartService);

  readonly slug = input.required<string>();

  protected readonly Math = Math;
  protected readonly selectedId = signal<string | null>(null);
  protected readonly qty = signal(1);
  protected readonly added = signal(false);

  protected readonly product = computed(() => this.products.bySlug(this.slug()));
  protected readonly variant = computed(() => {
    const p = this.product();
    return p?.variants.find((v) => v.id === this.selectedId()) ?? p?.variants[1] ?? p?.variants[0];
  });
  protected readonly discountPercent = computed(() => {
    const v = this.variant();
    return v && v.mrp > 0 ? Math.round(((v.mrp - v.price) / v.mrp) * 100) : 0;
  });

  protected addToCart(): void {
    const p = this.product();
    const v = this.variant();
    if (!p || !v) return;
    this.cart.add(p.id, v.id, this.qty());
    this.added.set(true);
    setTimeout(() => this.added.set(false), 2500);
  }
}
