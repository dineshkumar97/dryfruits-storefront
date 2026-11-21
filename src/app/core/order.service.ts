import { Injectable, inject } from '@angular/core';
import { CartService } from './cart.service';
import { CustomerDetails, Order } from './models';

const STORAGE_KEY = 'df_orders_v1';

/**
 * Frontend-only orders: saved in this browser's localStorage so the checkout flow
 * can be built and tested. Replace with POST /orders once the backend exists.
 */
@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly cart = inject(CartService);

  place(customer: CustomerDetails): Order {
    const order: Order = {
      id: this.newId(),
      placedAt: new Date().toISOString(),
      customer,
      lines: this.cart.lines().map((l) => ({
        name: l.product.name,
        label: l.variant.label,
        qty: l.qty,
        lineTotal: l.lineTotal,
      })),
      subtotal: this.cart.subtotal(),
      deliveryCharge: this.cart.deliveryCharge(),
      total: this.cart.total(),
      paymentMethod: 'cod',
    };
    this.save([order, ...this.all()]);
    this.cart.clear();
    return order;
  }

  byId(id: string): Order | undefined {
    return this.all().find((o) => o.id === id);
  }

  all(): Order[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Order[]) : [];
    } catch {
      return [];
    }
  }

  private save(orders: Order[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // ignore
    }
  }

  private newId(): string {
    const d = new Date();
    const stamp = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
    return `DF-${stamp}-${Math.floor(1000 + Math.random() * 9000)}`;
  }
}
