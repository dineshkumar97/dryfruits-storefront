import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BRAND } from '../core/brand';

// Generic copy: replace with your real story, founder note and sourcing details.
@Component({
  selector: 'app-about',
  imports: [RouterLink],
  template: `
    <article class="prose">
      <h1>About {{ brand.name }}</h1>
      <p>
        We started with a simple idea: dry fruits should taste fresh, look good and arrive the way you expect.
        We source almonds, cashews, walnuts, dates, berries and seeds from trusted growers and suppliers, and
        pack them in small batches so you always receive fresh stock.
      </p>

      <h2>What we care about</h2>
      <p><strong>Quality.</strong> Every batch is checked for taste, size and freshness before it is packed.</p>
      <p><strong>Packing.</strong> Food-grade pouches in 250 g, 500 g and 1 kg packs, sealed to stay fresh.</p>
      <p><strong>Honest pricing.</strong> Fair prices, with better value on larger packs and bulk orders.</p>
      <p><strong>Gifting.</strong> Ready-made gift boxes and custom hampers for festivals, weddings and offices.</p>

      <p>
        <a routerLink="/shop" class="btn btn-primary">Shop now</a>
        <a routerLink="/bulk-order" class="btn btn-ghost">Bulk and gifting orders</a>
      </p>
    </article>
  `,
})
export class About {
  protected readonly brand = BRAND;
}
