import { Category, Product, Variant } from './models';

export const CATEGORIES: Category[] = [
  { id: 'nuts', name: 'Nuts', emoji: '🥜' },
  { id: 'dried-fruits', name: 'Dried Fruits', emoji: '🍇' },
  { id: 'dates', name: 'Dates', emoji: '🌴' },
  { id: 'berries', name: 'Berries', emoji: '🫐' },
  { id: 'seeds', name: 'Seeds', emoji: '🌻' },
  { id: 'gift-packs', name: 'Gift Packs', emoji: '🎁' },
];

/** Builds 250g / 500g / 1kg variants from a per-kg selling price and MRP (in rupees). */
function variants(slug: string, perKg: number, mrpPerKg: number): Variant[] {
  return [250, 500, 1000].map((grams) => ({
    id: `${slug}-${grams}`,
    label: grams === 1000 ? '1 kg' : `${grams} g`,
    weightGrams: grams,
    price: Math.round((perKg * grams) / 1000) * 100,
    mrp: Math.round((mrpPerKg * grams) / 1000) * 100,
  }));
}

function product(p: Omit<Product, 'id' | 'variants'> & { perKg: number; mrpPerKg: number }): Product {
  const { perKg, mrpPerKg, ...rest } = p;
  return { ...rest, id: p.slug, variants: variants(p.slug, perKg, mrpPerKg) };
}

// SAMPLE DATA: prices, origins and descriptions are placeholders. Replace with your real catalogue.
export const PRODUCTS: Product[] = [
  product({
    slug: 'california-almonds', name: 'California Almonds', category: 'nuts', emoji: '🌰', hue: 28,
    description: 'Crunchy, naturally sweet almonds. Great for snacking, soaking overnight or adding to sweets.',
    origin: 'California, USA', shelfLifeDays: 180, tags: ['bestseller'], perKg: 1150, mrpPerKg: 1400,
  }),
  product({
    slug: 'whole-cashews', name: 'Whole Cashews (W320)', category: 'nuts', emoji: '🥜', hue: 40,
    description: 'Creamy, whole white cashews with a mild buttery taste.',
    origin: 'Kerala, India', shelfLifeDays: 150, tags: ['bestseller'], perKg: 950, mrpPerKg: 1150,
  }),
  product({
    slug: 'walnut-kernels', name: 'Walnut Kernels', category: 'nuts', emoji: '🧠', hue: 32,
    description: 'Light-coloured walnut halves, rich in omega-3. Perfect for breakfast bowls.',
    origin: 'Kashmir, India', shelfLifeDays: 120, tags: [], perKg: 1250, mrpPerKg: 1500,
  }),
  product({
    slug: 'roasted-pistachios', name: 'Roasted Pistachios', category: 'nuts', emoji: '🟢', hue: 95,
    description: 'Lightly salted, roasted in-shell pistachios with a satisfying crack.',
    origin: 'Iran', shelfLifeDays: 150, tags: ['premium'], perKg: 1750, mrpPerKg: 2100,
  }),
  product({
    slug: 'black-raisins', name: 'Black Raisins', category: 'dried-fruits', emoji: '🍇', hue: 280,
    description: 'Seedless, plump and juicy raisins. Ideal for kheer, cakes and trail mix.',
    origin: 'Nashik, India', shelfLifeDays: 270, tags: [], perKg: 480, mrpPerKg: 600,
  }),
  product({
    slug: 'medjool-dates', name: 'Medjool Dates', category: 'dates', emoji: '🌴', hue: 22,
    description: 'Soft, caramel-like dates. Nature’s sweet, with natural energy.',
    origin: 'Jordan', shelfLifeDays: 240, tags: ['bestseller', 'premium'], perKg: 1100, mrpPerKg: 1350,
  }),
  product({
    slug: 'anjeer-figs', name: 'Dried Anjeer (Figs)', category: 'dried-fruits', emoji: '🟣', hue: 320,
    description: 'Naturally sweet dried figs with a chewy texture and tiny crunchy seeds.',
    origin: 'Afghanistan', shelfLifeDays: 210, tags: [], perKg: 1350, mrpPerKg: 1600,
  }),
  product({
    slug: 'dried-apricots', name: 'Dried Apricots', category: 'dried-fruits', emoji: '🍑', hue: 30,
    description: 'Tangy-sweet apricots, soft and unsulphured.',
    origin: 'Turkey', shelfLifeDays: 210, tags: [], perKg: 850, mrpPerKg: 1050,
  }),
  product({
    slug: 'ajwa-dates', name: 'Ajwa Dates', category: 'dates', emoji: '🌴', hue: 18,
    description: 'Soft, dark and mildly sweet dates from Madinah, loved as a gift and for fasting seasons.',
    origin: 'Saudi Arabia', shelfLifeDays: 240, tags: ['premium'], perKg: 1900, mrpPerKg: 2300,
  }),
  product({
    slug: 'dried-cranberries', name: 'Dried Cranberries', category: 'berries', emoji: '🫐', hue: 350,
    description: 'Tart and chewy cranberries for salads, oats, baking and trail mix.',
    origin: 'USA', shelfLifeDays: 240, tags: [], perKg: 900, mrpPerKg: 1100,
  }),
  product({
    slug: 'dried-blueberries', name: 'Dried Blueberries', category: 'berries', emoji: '🫐', hue: 235,
    description: 'Naturally sweet blueberries with a soft bite. A colourful addition to breakfast bowls.',
    origin: 'Canada', shelfLifeDays: 240, tags: ['premium'], perKg: 1600, mrpPerKg: 1900,
  }),
  product({
    slug: 'pumpkin-seeds', name: 'Pumpkin Seeds', category: 'seeds', emoji: '🎃', hue: 110,
    description: 'Green, crunchy pumpkin seeds. Sprinkle on salads, oats or eat as they are.',
    origin: 'China', shelfLifeDays: 180, tags: [], perKg: 750, mrpPerKg: 900,
  }),
  product({
    slug: 'sunflower-seeds', name: 'Sunflower Seeds', category: 'seeds', emoji: '🌻', hue: 50,
    description: 'Hulled sunflower seeds with a gentle nutty flavour.',
    origin: 'India', shelfLifeDays: 180, tags: [], perKg: 420, mrpPerKg: 520,
  }),
  product({
    slug: 'royal-mix', name: 'Royal Mix (Nuts and Fruits)', category: 'gift-packs', emoji: '🎁', hue: 15,
    description: 'Almonds, cashews, pistachios, raisins and dried cranberries in one festive mix.',
    origin: 'Blended in India', shelfLifeDays: 150, tags: ['bestseller', 'premium'], perKg: 1300, mrpPerKg: 1600,
  }),
  product({
    slug: 'festive-gift-box', name: 'Festive Gift Box', category: 'gift-packs', emoji: '🎀', hue: 345,
    description: 'A beautifully packed assortment, perfect for Diwali, weddings and corporate gifting.',
    origin: 'Packed in India', shelfLifeDays: 120, tags: ['premium'], perKg: 1500, mrpPerKg: 1800,
  }),
];
