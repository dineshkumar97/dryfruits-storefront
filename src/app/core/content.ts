export interface Testimonial {
  name: string;
  city?: string;
  text: string;
}

// Add only REAL customer reviews here (with their permission).
// While this list is empty the testimonials section is hidden on the homepage.
export const TESTIMONIALS: Testimonial[] = [];
