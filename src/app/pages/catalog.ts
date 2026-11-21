import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../core/product.service';
import { ProductCard } from '../shared/product-card';

@Component({
  selector: 'app-catalog',
  imports: [RouterLink, ProductCard],
  template: `
    <h1>{{ heading() }}</h1>

    <div class="chips">
      <a class="chip" routerLink="/shop" [class.active]="!category()">All</a>
      @for (c of svc.categories; track c.id) {
        <a class="chip" routerLink="/shop" [queryParams]="{ category: c.id }" [class.active]="category() === c.id">
          {{ c.emoji }} {{ c.name }}
        </a>
      }
    </div>

    @if (items().length) {
      <div class="grid">
        @for (p of items(); track p.id) {
          <app-product-card [product]="p" />
        }
      </div>
    } @else {
      <p class="empty">No products found. <a routerLink="/shop">Clear filters</a></p>
    }
  `,
})
export class Catalog {
  protected readonly svc = inject(ProductService);

  // Bound automatically from ?category=...&q=... by withComponentInputBinding()
  readonly category = input<string>();
  readonly q = input<string>();

  protected readonly items = computed(() => this.svc.search(this.category(), this.q()));
  protected readonly heading = computed(() => {
    if (this.q()) return `Results for "${this.q()}"`;
    return this.svc.categoryName(this.category()) ?? 'All products';
  });
}
