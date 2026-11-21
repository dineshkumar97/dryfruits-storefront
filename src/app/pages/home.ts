import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BRAND } from '../core/brand';
import { TESTIMONIALS } from '../core/content';
import { ProductService } from '../core/product.service';
import { ProductCard } from '../shared/product-card';

const SUBSCRIBERS_KEY = 'df_subscribers_v1';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ProductCard],
  template: `
    <section class="hero">
      <div>
        <h1>{{ brand.tagline }}</h1>
        <p>Hand-picked almonds, cashews, dates and more. Packed fresh in small batches and delivered across India.</p>
        <p>
          <a routerLink="/shop" class="btn btn-primary">Shop now</a>
          <a routerLink="/shop" [queryParams]="{ category: 'gift-packs' }" class="btn btn-ghost">Gift boxes</a>
        </p>
      </div>
      <div class="hero-art" aria-hidden="true">🌰 🥜 🍇 🌴</div>
    </section>

    <!-- 1. Search -->
    <section class="search-section">
      <h2>Search products</h2>
      <form class="search big" (submit)="search($event, box.value)" role="search">
        <input #box type="search" placeholder="Search almonds, cashews, dates, gift boxes..." aria-label="Search products" />
        <button type="submit" class="btn btn-primary">Search</button>
      </form>
    </section>

    <!-- 2. Categories -->
    <section>
      <h2>Our categories</h2>
      <div class="category-grid">
        @for (c of products.categories; track c.id) {
          <a class="category-tile" routerLink="/shop" [queryParams]="{ category: c.id }">
            <span class="emoji">{{ c.emoji }}</span>
            <span>{{ c.name }}</span>
          </a>
        }
      </div>
    </section>

    <!-- 3. Latest gift boxes -->
    <section>
      <div class="section-head">
        <h2>Latest gift boxes collection</h2>
        <a routerLink="/shop" [queryParams]="{ category: 'gift-packs' }">View more →</a>
      </div>
      <p class="muted">Beautifully packed boxes for festivals, weddings and corporate gifting.</p>
      <div class="grid">
        @for (p of products.byCategory('gift-packs', 6); track p.id) {
          <app-product-card [product]="p" />
        }
      </div>
    </section>

    <!-- 4. Service highlights -->
    <section class="highlights">
      <div><span class="emoji">🎧</span><strong>Customer support</strong><p>Chat or call us during shop hours.</p></div>
      <div><span class="emoji">🔒</span><strong>Secure shopping</strong><p>Your details are used only to deliver your order.</p></div>
      <div><span class="emoji">🚚</span><strong>Swift shipping</strong><p>Orders packed and dispatched quickly.</p></div>
      <div><span class="emoji">↩️</span><strong>Easy returns</strong><p>Damaged or wrong item? We will make it right.</p></div>
    </section>

    <!-- 5. Testimonials (hidden until you add real reviews in core/content.ts) -->
    @if (testimonials.length) {
      <section>
        <h2>What our customers say</h2>
        <div class="grid">
          @for (t of testimonials; track t.name) {
            <blockquote class="testimonial">
              <p>{{ t.text }}</p>
              <footer>
                <strong>{{ t.name }}</strong>
                @if (t.city) { <span class="muted"> · {{ t.city }}</span> }
              </footer>
            </blockquote>
          }
        </div>
      </section>
    }

    <!-- 6. Newsletter -->
    <section class="newsletter">
      <div>
        <h2>Get offers and new arrivals</h2>
        <p>Join our list for festival offers and fresh stock updates.</p>
      </div>
      @if (subscribed()) {
        <p class="success" role="status">Thank you! You are on the list ✓</p>
      } @else {
        <form class="search big" (submit)="subscribe($event, mail.value)">
          <input #mail type="email" placeholder="Your email address" aria-label="Email address" required />
          <button type="submit" class="btn btn-primary">Subscribe</button>
        </form>
      }
    </section>

    <!-- 7. Featured collection -->
    <section>
      <div class="section-head">
        <h2>Dry fruits featured collection</h2>
        <a routerLink="/shop">View all →</a>
      </div>
      <div class="grid">
        @for (p of products.featured(6); track p.id) {
          <app-product-card [product]="p" />
        }
      </div>
    </section>

    <!-- 8. Signature collection -->
    <section>
      <div class="section-head">
        <h2>Premium signature collection</h2>
        <a routerLink="/shop">View all →</a>
      </div>
      <div class="grid">
        @for (p of products.premium(6); track p.id) {
          <app-product-card [product]="p" />
        }
      </div>
    </section>

    <!-- 9. Feature strip -->
    <section class="highlights strip">
      <div><strong>⭐ Premium quality</strong></div>
      <div><strong>📦 Hygienic packing</strong></div>
      <div><strong>🔁 Easy return</strong></div>
      <div><strong>🏢 Bulk and gifting orders</strong></div>
    </section>

    <!-- 10. About teaser -->
    <section class="about-teaser">
      <h2>About us</h2>
      <p>
        We source quality nuts, dates and dried fruits, pack them fresh in small batches and deliver them
        to homes, offices and gifting customers across India.
      </p>
      <a routerLink="/about" class="btn btn-ghost">Read our story</a>
    </section>
  `,
})
export class Home {
  protected readonly brand = BRAND;
  protected readonly products = inject(ProductService);
  protected readonly testimonials = TESTIMONIALS;
  protected readonly subscribed = signal(false);
  private readonly router = inject(Router);

  protected search(event: Event, value: string): void {
    event.preventDefault();
    this.router.navigate(['/shop'], { queryParams: { q: value.trim() || null } });
  }

  // Frontend-only: stores the email in this browser. Replace with an API call (or a mailing-list service) later.
  protected subscribe(event: Event, email: string): void {
    event.preventDefault();
    const value = email.trim();
    if (!value) return;
    try {
      const list = JSON.parse(localStorage.getItem(SUBSCRIBERS_KEY) ?? '[]') as string[];
      localStorage.setItem(SUBSCRIBERS_KEY, JSON.stringify([...list, value]));
    } catch {
      // ignore storage errors
    }
    this.subscribed.set(true);
  }
}
