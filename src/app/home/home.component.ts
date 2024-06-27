import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { GridComponent } from '../grid/grid.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [GridComponent, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userName: string = '';
  isLoggedIn: boolean = false;
  products = [];

  router = inject(Router);
  private cartService = inject(CartService);

  constructor(private productService: ProductService) {}

  async ngOnInit() {
    try {
      const result = await this.productService.getAllProducts();
      this.products = result;
    } catch (error) {}
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }

  navigateHandler(productId: string) {
    console.log('ran');
    this.router.navigate(['/productDetails', productId]);
  }
}
