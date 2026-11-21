import { Component, computed, input } from '@angular/core';
import { BRAND } from '../core/brand';

type PolicyKind = 'privacy' | 'returns' | 'terms';

interface PolicyDoc {
  title: string;
  sections: { heading: string; body: string }[];
}

// DRAFT TEXT: generic starting points only. Have your final policies reviewed
// (for example by a CA or lawyer) before you go live.
const POLICIES: Record<PolicyKind, PolicyDoc> = {
  privacy: {
    title: 'Privacy Policy',
    sections: [
      { heading: 'What we collect', body: 'Your name, mobile number, delivery address and email, only when you place an order, send an enquiry or subscribe.' },
      { heading: 'How we use it', body: 'To process and deliver orders, answer your questions and, if you subscribed, send offers. We do not sell your personal details.' },
      { heading: 'Sharing', body: 'We share only what is needed with delivery partners and payment providers to complete your order.' },
      { heading: 'Your choices', body: 'You can ask us to correct or delete your details, or unsubscribe at any time, by contacting us.' },
    ],
  },
  returns: {
    title: 'Return Policy',
    sections: [
      { heading: 'Eligible cases', body: 'You can request a replacement or refund if the item arrives damaged, is not what you ordered, or has a quality problem.' },
      { heading: 'Time limit', body: 'Please contact us within 48 hours of delivery with your order number and a photo of the product and pack.' },
      { heading: 'Food safety', body: 'Opened packs cannot be returned unless there is a quality problem, because food items cannot be resold.' },
      { heading: 'Refunds', body: 'Approved refunds are returned to the original payment method, or replaced, within a few working days.' },
    ],
  },
  terms: {
    title: 'Terms & Conditions',
    sections: [
      { heading: 'Orders', body: 'An order is confirmed once we accept it. We may cancel an order if an item is out of stock or the details are incomplete.' },
      { heading: 'Prices and payment', body: 'Prices are in Indian rupees and include applicable taxes. Prices and offers may change without notice.' },
      { heading: 'Delivery', body: 'Delivery times are estimates and can vary by location and courier. Delivery charges are shown at checkout.' },
      { heading: 'Product images', body: 'Images are for illustration. Natural products can vary slightly in size and colour.' },
    ],
  },
};

@Component({
  selector: 'app-policy',
  template: `
    <article class="prose">
      <h1>{{ doc().title }}</h1>
      @for (s of doc().sections; track s.heading) {
        <h2>{{ s.heading }}</h2>
        <p>{{ s.body }}</p>
      }
      <p class="muted small">Questions? Write to {{ brand.email }}.</p>
    </article>
  `,
})
export class Policy {
  protected readonly brand = BRAND;

  // Provided through the route's `data` (bound to inputs by withComponentInputBinding)
  readonly kind = input.required<PolicyKind>();
  protected readonly doc = computed(() => POLICIES[this.kind()]);
}
