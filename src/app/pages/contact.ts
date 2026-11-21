import { Component } from '@angular/core';
import { BRAND } from '../core/brand';

@Component({
  selector: 'app-contact',
  template: `
    <article class="prose">
      <h1>Contact us</h1>
      <p>We usually reply within a few hours during shop hours.</p>

      <div class="contact-grid">
        <div class="summary">
          <h3>Call</h3>
          <p><a [href]="'tel:' + phoneDigits">{{ brand.phone }}</a></p>
          <h3>Email</h3>
          <p><a [href]="'mailto:' + brand.email">{{ brand.email }}</a></p>
          <h3>Address</h3>
          <p>{{ brand.address }}</p>
          <h3>Hours</h3>
          <p>{{ brand.hours }}</p>
        </div>
        <div class="summary">
          <h3>Fastest way: WhatsApp</h3>
          <p>Ask about products, delivery to your pincode or gift boxes.</p>
          <a class="btn btn-primary block" [href]="whatsappLink" target="_blank" rel="noopener">Chat on WhatsApp</a>
        </div>
      </div>
    </article>
  `,
})
export class Contact {
  protected readonly brand = BRAND;
  protected readonly phoneDigits = BRAND.phone.replaceAll(' ', '');
  protected readonly whatsappLink = `https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent('Hi, I have a question about your dry fruits.')}`;
}
