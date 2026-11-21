import { Injectable } from '@angular/core';
import { CATEGORIES, PRODUCTS } from './mock-products';
import { Category, CategoryId, Product } from './models';

/**
 * Serves the catalogue from local mock data.
 * When the backend exists, swap the bodies of these methods for HttpClient calls
 * and keep the same method names so pages don't change.
 */
@Injectable({ providedIn: 'root' })
export class ProductService {
  readonly categories: Category[] = CATEGORIES;

  all(): Product[] {
    return PRODUCTS;
  }

  byId(id: string): Product | undefined {
    return PRODUCTS.find((p) => p.id === id);
  }

  bySlug(slug: string): Product | undefined {
    return PRODUCTS.find((p) => p.slug === slug);
  }

  byCategory(id: CategoryId, limit = 6): Product[] {
    return PRODUCTS.filter((p) => p.category === id).slice(0, limit);
  }

  premium(limit = 6): Product[] {
    return PRODUCTS.filter((p) => p.tags.includes('premium')).slice(0, limit);
  }

  featured(limit = 4): Product[] {
    return PRODUCTS.filter((p) => p.tags.includes('bestseller')).slice(0, limit);
  }

  search(category?: string, query?: string): Product[] {
    const q = (query ?? '').trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      const inCategory = !category || p.category === (category as CategoryId);
      const matches =
        !q || p.name.toLowerCase().includes(q) || p.tags.some((t) => t.includes(q)) || p.description.toLowerCase().includes(q);
      return inCategory && matches;
    });
  }

  categoryName(id: string | undefined): string | undefined {
    return CATEGORIES.find((c) => c.id === id)?.name;
  }
}
