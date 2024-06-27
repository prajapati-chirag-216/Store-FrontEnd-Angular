import { Component, ViewChild, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CartComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @ViewChild(CartComponent) cartComponent!: CartComponent;
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {}
  router = inject(Router);
  async onLogout() {
    try {
      await this.authService.logout();
      this.router.navigate(['/login']);
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  }

  openCart() {
    console.log('am');
    this.cartComponent.openCart();
  }
}
