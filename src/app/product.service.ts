import { Injectable } from '@angular/core';
import AxiosInstance from '../utils/axiosInstance';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:8000';
  constructor() {}

  async getProductDetails(id: string) {
    try {
      const config = {
        url: `${this.apiUrl}/getproduct/${id}`,
      };
      const response = await AxiosInstance(config);
      return response;
    } catch (error) {
      throw error;
    }
  }
  async getAllProducts() {
    try {
      const config = {
        url: `${this.apiUrl}/getAllproducts`,
      };
      const response = await AxiosInstance(config);
      return response;
    } catch (error) {
      throw error;
    }
  }
}
