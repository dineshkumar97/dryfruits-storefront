import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <div class="empty">
      <h1>Page not found</h1>
      <p><a routerLink="/">Go to home</a> or <a routerLink="/shop">browse the shop</a>.</p>
    </div>
  `,
})
export class NotFound {}
