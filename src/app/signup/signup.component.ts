import { Component, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface User {
  name: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  user: User = { name: '', email: '', password: '' };
  router = inject(Router);

  constructor(private authService: AuthService) {}

  async onSignup(signupForm: NgForm) {
    if (signupForm.invalid) {
      this.markFormFieldsAsTouched(signupForm);
      return;
    }

    try {
      if (!this.user.name || !this.user.email || !this.user.password) {
        throw new Error('All fields are required');
      }
      console.log('akjgaiudyguiy');
      if (!this.validateEmail(this.user.email)) {
        throw new Error('Invalid email address');
      }

      if (this.user.password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      await this.authService.signup(this.user);
      this.router.navigate(['']);
    } catch (error) {
      console.error('Signup error', error);
      // You can display the error to the user here
    }
  }

  markFormFieldsAsTouched(form: NgForm) {
    Object.keys(form.controls).forEach((field) => {
      const control = form.control.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }

  validateEmail(email: string): boolean {
    console.log('Came');
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }
}
