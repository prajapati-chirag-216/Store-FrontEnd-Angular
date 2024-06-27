import { Injectable } from '@angular/core';
import AxiosInstance from '../utils/axiosInstance';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000';
  constructor() {}

  // user apis
  async getUserProfile() {
    try {
      const config = {
        url: `${this.apiUrl}/user/profile`,
        withCredentials: true,
      };
      const response = await AxiosInstance(config);

      return response;
    } catch (error) {
      throw error;
    }
  }
  async signup(user: any) {
    try {
      const config = {
        method: 'POST',
        url: `${this.apiUrl}/user/signup`,
        data: user,
        withCredentials: true,
      };
      await AxiosInstance(config);
    } catch (error) {
      throw error;
    }
  }
  async login(credentials: any) {
    try {
      const config = {
        method: 'POST',
        url: `${this.apiUrl}/user/login`,
        data: credentials,
        withCredentials: true,
      };
      await AxiosInstance(config);
    } catch (error) {
      throw error;
    }
  }
  async logout() {
    try {
      const config = {
        method: 'POST',
        url: `${this.apiUrl}/user/logout`,
        withCredentials: true,
      };
      await AxiosInstance(config);
    } catch (error) {
      throw error;
    }
  }
}
