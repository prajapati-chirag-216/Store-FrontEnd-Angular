import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  images: string[];
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private initialState = {
    qtyStatus: { status: false, id: null },
    cartItems: [],
  };

  private cartItemsSubject = new BehaviorSubject<CartItem[]>(
    this.initialState.cartItems
  );
  cartItems$ = this.cartItemsSubject.asObservable();

  private qtyStatusSubject = new BehaviorSubject(this.initialState.qtyStatus);
  qtyStatus$ = this.qtyStatusSubject.asObservable();

  setQtyStatus(status: boolean, id: any) {
    const newStatus = { status, id };
    this.qtyStatusSubject.next(newStatus);
  }

  addToCart(product: any) {
    const cartItems = this.cartItemsSubject.getValue();
    const index = cartItems.findIndex((item) => item._id === product._id);

    if (index !== -1) {
      cartItems[index].quantity += 1;
    } else {
      cartItems.push({
        ...product,
        quantity: 1,
      });
    }

    this.updateCartItems(cartItems);
  }

  increaseQty(productId: string) {
    const cartItems = this.cartItemsSubject.getValue();
    const updatedCartItems = cartItems.map((item) => {
      if (item._id === productId) {
        item.quantity += 1;
      }
      return item;
    });

    this.updateCartItems(updatedCartItems);
  }

  decreaseQty(productId: string) {
    const cartItems = this.cartItemsSubject.getValue();
    const updatedCartItems = cartItems.filter((item) => {
      if (item._id === productId) {
        if (item.quantity > 1) {
          return (item.quantity -= 1);
        }
        return;
      }
      return item;
    });

    this.updateCartItems(updatedCartItems);
  }

  removeItem(productId: string) {
    const cartItems = this.cartItemsSubject.getValue();
    const updatedCartItems = cartItems.filter((item) => item._id !== productId);

    this.updateCartItems(updatedCartItems);
  }

  clearCart() {
    this.updateCartItems([]);
  }

  // loadItemsToCart(products: any[]) {
  //   let cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
  //   let updatedCartItems = cartItems;

  //   if (products.length !== 0) {
  //     products.forEach((product) => {
  //       const index = cartItems.findIndex(
  //         (item: any) => item._id === product.product._id
  //       );
  //       if (index !== -1) {
  //         cartItems[index].quantity += product.quantity;
  //       } else {
  //         updatedCartItems.push({
  //           ...product.product,
  //           quantity: product.quantity,
  //         });
  //       }
  //     });
  //   }

  //   this.updateCartItems(updatedCartItems);
  // }

  private updateCartItems(cartItems: CartItem[]) {
    this.cartItemsSubject.next(cartItems);
  }
}
