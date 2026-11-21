import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BRAND } from '../core/brand';
import { OrderService } from '../core/order.service';
import { RupeesPipe } from '../core/rupees.pipe';

@Component({
  selector: 'app-order-success',
  imports: [RouterLink, RupeesPipe],
  template: `
    @if (order(); as o) {
      <div class="success-box">
        <h1>Thank you, {{ o.customer.name }}! 🎉</h1>
        <p>Your order <strong>{{ o.id }}</strong> has been placed.</p>
        <p class="muted">Pay on delivery · Total {{ o.total | rupees }}</p>

        <div class="summary">
          @for (l of o.lines; track $index) {
            <p class="row"><span>{{ l.name }} ({{ l.label }}) × {{ l.qty }}</span><span>{{ l.lineTotal | rupees }}</span></p>
          }
          <p class="row"><span>Delivery</span><span>{{ o.deliveryCharge === 0 ? 'Free' : (o.deliveryCharge | rupees) }}</span></p>
          <p class="row total"><span>Total</span><span>{{ o.total | rupees }}</span></p>
        </div>

        <p>
          <a class="btn btn-primary" [href]="whatsappLink()" target="_blank" rel="noopener">Confirm on WhatsApp</a>
          <a class="btn btn-ghost" routerLink="/shop">Continue shopping</a>
        </p>
        <p class="muted small">Until the backend is ready, orders are saved only in this browser and confirmed by WhatsApp.</p>
      </div>
    } @else {
      <p class="empty">We couldn't find that order. <a routerLink="/shop">Continue shopping</a></p>
    }
  `,
})
export class OrderSuccess {
  private readonly orders = inject(OrderService);

  readonly id = input.required<string>();

  protected readonly order = computed(() => this.orders.byId(this.id()));
  protected readonly whatsappLink = computed(() => {
    const o = this.order();
    if (!o) return '';
    const items = o.lines.map((l) => `- ${l.name} (${l.label}) x ${l.qty}`).join('\n');
    const text =
      `New order ${o.id}\n${items}\nTotal: ₹${o.total / 100}\n\n` +
      `${o.customer.name}, ${o.customer.phone}\n` +
      `${o.customer.address}, ${o.customer.city}, ${o.customer.state} - ${o.customer.pincode}`;
    return `https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent(text)}`;
  });
}
