import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productDetails: any;
  displayImage: string = '';
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private productService: ProductService
  ) {}

  async ngOnInit() {
    this.isLoading = true;
    const productId = this.route.snapshot.paramMap.get('id');
    await this.loadProductDetails(productId || '');
    this.isLoading = false;
  }

  // loading details when user visit this page
  async loadProductDetails(id: string) {
    this.productDetails = await this.productService.getProductDetails(id);
    this.displayImage = this.productDetails.images[0];
  }

  displayChangeHandler(img: string): void {
    this.displayImage = img;
  }

  addItemHandler(): void {
    const productData = {
      _id: this.productDetails._id,
      name: this.productDetails.name,
      description: this.productDetails.description,
      status: this.productDetails.status,
      images: this.productDetails.images,
      quantity: this.productDetails.quantity,
      price: this.productDetails.price,
    };
    this.cartService.addToCart(productData);
  }
}
