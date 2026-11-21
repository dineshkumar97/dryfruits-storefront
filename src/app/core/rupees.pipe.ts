import { Pipe, PipeTransform } from '@angular/core';

const formatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

/** Formats an amount in paise as Indian rupees, e.g. 27500 -> ₹275 */
@Pipe({ name: 'rupees' })
export class RupeesPipe implements PipeTransform {
  transform(paise: number | null | undefined): string {
    return formatter.format((paise ?? 0) / 100);
  }
}
