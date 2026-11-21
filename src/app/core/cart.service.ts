import { Injectable, computed, inject, signal } from '@angular/core';
import { SHOP } from './brand';
import { CartItem, CartLine } from './models';
import { ProductService } from './product.service';

const STORAGE_KEY = 'df_cart_v1';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly products = inject(ProductService);
  private readonly items = signal<CartItem[]>(this.load());

  readonly lines = computed<CartLine[]>(() =>
    this.items().flatMap((item) => {
      const product = this.products.byId(item.productId);
      const variant = product?.variants.find((v) => v.id === item.variantId);
      if (!product || !variant) return [];
      return [{ product, variant, qty: item.qty, lineTotal: variant.price * item.qty }];
    }),
  );

  readonly count = computed(() => this.lines().reduce((sum, l) => sum + l.qty, 0));
  readonly subtotal = computed(() => this.lines().reduce((sum, l) => sum + l.lineTotal, 0));
  readonly deliveryCharge = computed(() =>
    this.subtotal() === 0 || this.subtotal() >= SHOP.freeDeliveryAbovePaise ? 0 : SHOP.deliveryChargePaise,
  );
  readonly total = computed(() => this.subtotal() + this.deliveryCharge());
  readonly amountToFreeDelivery = computed(() => Math.max(0, SHOP.freeDeliveryAbovePaise - this.subtotal()));

  add(productId: string, variantId: string, qty = 1): void {
    this.items.update((items) => {
      const existing = items.find((i) => i.productId === productId && i.variantId === variantId);
      if (existing) {
        return items.map((i) => (i === existing ? { ...i, qty: Math.min(i.qty + qty, 20) } : i));
      }
      return [...items, { productId, variantId, qty: Math.min(qty, 20) }];
    });
    this.save();
  }

  setQty(productId: string, variantId: string, qty: number): void {
    if (qty <= 0) {
      this.remove(productId, variantId);
      return;
    }
    this.items.update((items) =>
      items.map((i) => (i.productId === productId && i.variantId === variantId ? { ...i, qty: Math.min(qty, 20) } : i)),
    );
    this.save();
  }

  remove(productId: string, variantId: string): void {
    this.items.update((items) => items.filter((i) => !(i.productId === productId && i.variantId === variantId)));
    this.save();
  }

  clear(): void {
    this.items.set([]);
    this.save();
  }

  private load(): CartItem[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  }

  private save(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items()));
    } catch {
      // storage unavailable (private mode); cart still works for this session
    }
  }
}
