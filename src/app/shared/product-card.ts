import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../core/models';
import { RupeesPipe } from '../core/rupees.pipe';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, RupeesPipe],
  template: `
    <a class="card product-card" [routerLink]="['/product', product().slug]">
      <div class="card-visual" [style.background]="background()">
        <span class="emoji">{{ product().emoji }}</span>
        @if (product().tags.includes('premium')) {
          <span class="tag">Premium</span>
        }
      </div>
      <div class="card-body">
        <h3>{{ product().name }}</h3>
        <p class="muted">{{ product().origin }}</p>
        <p class="price-row">
          <span class="price">{{ first().price | rupees }}</span>
          <span class="mrp">{{ first().mrp | rupees }}</span>
          <span class="muted small">/ {{ first().label }}</span>
        </p>
      </div>
    </a>
  `,
})
export class ProductCard {
  readonly product = input.required<Product>();

  protected readonly first = computed(() => this.product().variants[0]);
  protected readonly background = computed(
    () => `linear-gradient(135deg, hsl(${this.product().hue} 70% 90%), hsl(${this.product().hue} 60% 78%))`,
  );
}
