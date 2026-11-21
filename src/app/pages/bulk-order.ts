import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BRAND, SHOP } from '../core/brand';

@Component({
  selector: 'app-bulk-order',
  imports: [ReactiveFormsModule],
  template: `
    <article class="prose">
      <h1>Bulk and corporate orders</h1>
      <p>
        Planning festival gifting, a wedding, an office hamper or stock for your own shop? Tell us what you need
        (orders from {{ minKg }} kg) and we will send you a quote on WhatsApp.
      </p>
    </article>

    <form [formGroup]="form" (ngSubmit)="submit()" class="form narrow" novalidate>
      <label>Your name
        <input formControlName="name" autocomplete="name" />
        @if (show('name')) { <small class="error">Please enter your name</small> }
      </label>

      <label>Mobile number
        <input formControlName="phone" inputmode="numeric" maxlength="10" autocomplete="tel" />
        @if (show('phone')) { <small class="error">Enter a valid 10-digit mobile number</small> }
      </label>

      <label>Company or occasion (optional)
        <input formControlName="company" />
      </label>

      <label>What do you need?
        <input formControlName="items" placeholder="e.g. Almonds, cashews, 50 gift boxes" />
        @if (show('items')) { <small class="error">Tell us which products you need</small> }
      </label>

      <label>Approximate quantity (kg or boxes)
        <input formControlName="quantity" />
        @if (show('quantity')) { <small class="error">Required</small> }
      </label>

      <label>Delivery city and required date
        <input formControlName="delivery" />
      </label>

      <button type="submit" class="btn btn-primary block">Request quote on WhatsApp</button>
      @if (sent()) {
        <p class="success" role="status">WhatsApp opened with your request. Just press send there ✓</p>
      }
    </form>
  `,
})
export class BulkOrder {
  protected readonly minKg = SHOP.bulkMinKg;
  protected readonly sent = signal(false);
  private readonly fb = inject(FormBuilder).nonNullable;

  protected readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    phone: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
    company: [''],
    items: ['', Validators.required],
    quantity: ['', Validators.required],
    delivery: [''],
  });

  protected show(name: 'name' | 'phone' | 'items' | 'quantity'): boolean {
    const c = this.form.controls[name];
    return c.invalid && (c.touched || c.dirty);
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();
    const text =
      `Bulk order enquiry\n` +
      `Name: ${v.name}\nPhone: ${v.phone}\n` +
      (v.company ? `Company/occasion: ${v.company}\n` : '') +
      `Items: ${v.items}\nQuantity: ${v.quantity}\n` +
      (v.delivery ? `Delivery: ${v.delivery}\n` : '');
    window.open(`https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    this.sent.set(true);
  }
}
