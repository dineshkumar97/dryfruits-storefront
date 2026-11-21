import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BRAND } from '../core/brand';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  template: `
    <footer class="site-footer">
      <div class="container footer-grid">
        <div>
          <strong>🌰 {{ brand.name }}</strong>
          <p>{{ brand.tagline }}</p>
          <p>
            @for (s of socials; track s.label) {
              <a [href]="s.url" target="_blank" rel="noopener">{{ s.label }}</a>{{ ' ' }}
            }
          </p>
        </div>
        <div>
          <strong>Quick Links</strong>
          <p><a routerLink="/about">About Us</a></p>
          <p><a routerLink="/contact">Contact Us</a></p>
          <p><a routerLink="/bulk-order">Bulk Ordering</a></p>
          <p><a routerLink="/shop">Shopping</a></p>
        </div>
        <div>
          <strong>Policies</strong>
          <p><a routerLink="/privacy-policy">Privacy Policy</a></p>
          <p><a routerLink="/return-policy">Return Policy</a></p>
          <p><a routerLink="/terms">Terms &amp; Conditions</a></p>
        </div>
        <div>
          <strong>Contact Details</strong>
          <p>{{ brand.address }}</p>
          <p>{{ brand.email }}</p>
          <p>{{ brand.phone }}</p>
          <p><a [href]="'https://wa.me/' + brand.whatsappNumber" target="_blank" rel="noopener">Chat on WhatsApp</a></p>
        </div>
      </div>
      <div class="container copyright">© {{ year }} {{ brand.name }}. All rights reserved.</div>
    </footer>
  `,
})
export class Footer {
  protected readonly brand = BRAND;
  protected readonly socials = BRAND.socials.filter((s) => s.url);
  protected readonly year = new Date().getFullYear();
}
