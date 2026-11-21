import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../core/cart.service';
import { RupeesPipe } from '../core/rupees.pipe';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, RupeesPipe],
  template: `
    <h1>Your cart</h1>

    @if (cart.lines().length === 0) {
      <p class="empty">Your cart is empty. <a routerLink="/shop">Start shopping</a></p>
    } @else {
      <div class="cart-layout">
        <div>
          @for (l of cart.lines(); track l.variant.id) {
            <div class="cart-line">
              <div class="cart-thumb">{{ l.product.emoji }}</div>
              <div class="cart-info">
                <a [routerLink]="['/product', l.product.slug]">{{ l.product.name }}</a>
                <span class="muted small">{{ l.variant.label }} · {{ l.variant.price | rupees }} each</span>
                <button type="button" class="link-btn" (click)="cart.remove(l.product.id, l.variant.id)">Remove</button>
              </div>
              <div class="qty">
                <button type="button" (click)="cart.setQty(l.product.id, l.variant.id, l.qty - 1)" aria-label="Decrease quantity">−</button>
                <span>{{ l.qty }}</span>
                <button type="button" (click)="cart.setQty(l.product.id, l.variant.id, l.qty + 1)" aria-label="Increase quantity">+</button>
              </div>
              <strong class="line-total">{{ l.lineTotal | rupees }}</strong>
            </div>
          }
        </div>

        <aside class="summary">
          <h3>Order summary</h3>
          <p class="row"><span>Subtotal</span><span>{{ cart.subtotal() | rupees }}</span></p>
          <p class="row">
            <span>Delivery</span>
            <span>{{ cart.deliveryCharge() === 0 ? 'Free' : (cart.deliveryCharge() | rupees) }}</span>
          </p>
          @if (cart.amountToFreeDelivery() > 0) {
            <p class="hint">Add {{ cart.amountToFreeDelivery() | rupees }} more for free delivery</p>
          }
          <p class="row total"><span>Total</span><span>{{ cart.total() | rupees }}</span></p>
          <a routerLink="/checkout" class="btn btn-primary block">Proceed to checkout</a>
        </aside>
      </div>
    }
  `,
})
export class Cart {
  protected readonly cart = inject(CartService);
}
