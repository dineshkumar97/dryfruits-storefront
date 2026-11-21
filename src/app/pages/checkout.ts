import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../core/cart.service';
import { CustomerDetails } from '../core/models';
import { OrderService } from '../core/order.service';
import { RupeesPipe } from '../core/rupees.pipe';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, RouterLink, RupeesPipe],
  template: `
    <h1>Checkout</h1>

    @if (cart.lines().length === 0) {
      <p class="empty">Your cart is empty. <a routerLink="/shop">Go to shop</a></p>
    } @else {
      <div class="cart-layout">
        <form [formGroup]="form" (ngSubmit)="submit()" class="form" novalidate>
          <h3>Delivery details</h3>

          <label>Full name
            <input formControlName="name" autocomplete="name" />
            @if (show('name')) { <small class="error">Please enter your name</small> }
          </label>

          <label>Mobile number
            <input formControlName="phone" inputmode="numeric" maxlength="10" autocomplete="tel" />
            @if (show('phone')) { <small class="error">Enter a valid 10-digit mobile number</small> }
          </label>

          <label>Address
            <textarea formControlName="address" rows="3" autocomplete="street-address"></textarea>
            @if (show('address')) { <small class="error">Please enter your full address</small> }
          </label>

          <div class="two-col">
            <label>City
              <input formControlName="city" />
              @if (show('city')) { <small class="error">Required</small> }
            </label>
            <label>State
              <input formControlName="state" />
              @if (show('state')) { <small class="error">Required</small> }
            </label>
          </div>

          <label>Pincode
            <input formControlName="pincode" inputmode="numeric" maxlength="6" autocomplete="postal-code" />
            @if (show('pincode')) { <small class="error">Enter a valid 6-digit pincode</small> }
          </label>

          <h3>Payment</h3>
          <label class="radio">
            <input type="radio" checked disabled /> Cash on delivery
          </label>
          <p class="muted small">Online payment (UPI and cards) will be added with the backend.</p>

          <button type="submit" class="btn btn-primary block">Place order · {{ cart.total() | rupees }}</button>
        </form>

        <aside class="summary">
          <h3>Your items</h3>
          @for (l of cart.lines(); track l.variant.id) {
            <p class="row">
              <span>{{ l.product.name }} ({{ l.variant.label }}) × {{ l.qty }}</span>
              <span>{{ l.lineTotal | rupees }}</span>
            </p>
          }
          <p class="row"><span>Delivery</span><span>{{ cart.deliveryCharge() === 0 ? 'Free' : (cart.deliveryCharge() | rupees) }}</span></p>
          <p class="row total"><span>Total</span><span>{{ cart.total() | rupees }}</span></p>
        </aside>
      </div>
    }
  `,
})
export class Checkout {
  protected readonly cart = inject(CartService);
  private readonly orders = inject(OrderService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder).nonNullable;

  protected readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    phone: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
    address: ['', [Validators.required, Validators.minLength(10)]],
    city: ['', Validators.required],
    state: ['', Validators.required],
    pincode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
  });

  protected show(name: keyof CustomerDetails): boolean {
    const c = this.form.controls[name];
    return c.invalid && (c.touched || c.dirty);
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const order = this.orders.place(this.form.getRawValue());
    this.router.navigate(['/order-success', order.id]);
  }
}
