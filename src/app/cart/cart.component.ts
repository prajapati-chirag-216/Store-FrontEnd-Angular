import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CartService } from '../cart.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  isOpen: boolean = false;
  @Output() cartOpened = new EventEmitter<void>();

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
    });
  }

  openCart() {
    this.isOpen = true;
    this.cartOpened.emit();
  }

  closeCart() {
    this.isOpen = false;
  }

  increaseQty(id: any) {
    this.cartService.increaseQty(id);
  }

  decreaseQty(id: any) {
    this.cartService.decreaseQty(id);
  }

  removeItem(id: any) {
    this.cartService.removeItem(id);
  }

  checkout() {
    // Implement checkout logic here
  }
}
