# Dry Fruits Storefront (Angular 21, frontend only)

Customer website with mock data. No backend yet: the catalogue is local, the cart and orders live in the browser's localStorage, and the order is confirmed by WhatsApp.

## Run

```bash
npm install
npm start          # http://localhost:4200
npm run build      # production build in dist/
```

## What is included

- Home, Shop (category chips + search), Product page (250 g / 500 g / 1 kg packs), Cart, Checkout (validated form, cash on delivery), Order success (WhatsApp confirm link)
- Standalone components, signals, lazy-loaded routes, route params as component inputs
- Prices stored in paise, same field names as the planned MongoDB schema

## Pages

Home (search, 6 categories, gift boxes, service highlights, newsletter, featured and premium collections, about teaser), Shop, Product, Cart, Checkout, About Us, Bulk Order (sends the enquiry to WhatsApp), Contact Us, Privacy / Return / Terms.

## Change these first

- `src/app/core/brand.ts`: brand name, WhatsApp number, phone, email, address, social links, delivery charge and free-delivery limit
- `src/app/core/content.ts`: add real customer testimonials (the section stays hidden while the list is empty)
- `src/app/pages/policy.ts` and `about.ts`: generic draft text, replace and have the policies reviewed before going live
- `src/app/core/mock-products.ts`: your real products and prices (current values are samples)

## Connecting the backend later

Only three services need to change: `ProductService`, `CartService` (optional server cart) and `OrderService`. Keep the method names and swap the bodies for `HttpClient` calls. Pages stay as they are.

## Not done yet

Product photos (cards use emoji placeholders), PWA/service worker, SEO meta per page, user accounts, online payments, admin dashboard.
