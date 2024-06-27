// import { Component, inject } from '@angular/core';
// import { AuthService } from '../auth.service';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [FormsModule],
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.css',
// })
// export class LoginComponent {
//   user = { email: '', password: '' };
//   router = inject(Router);
//   constructor(private authService: AuthService) {}

//   async onLogin() {
//     try {
//       await this.authService.login(this.user);
//       this.router.navigate(['']);
//     } catch (error: any) {
//       alert(error.response.data.message);
//     }
//   }
// }

import { Component, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface User {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  user: User = { email: '', password: '' };
  router = inject(Router);

  constructor(private authService: AuthService) {}

  async onLogin(loginForm: NgForm) {
    if (loginForm.invalid) {
      this.markFormFieldsAsTouched(loginForm);
      return;
    }

    try {
      if (
        !this.user.email ||
        !this.user.password ||
        !this.user.email.includes('gmail.com')
      ) {
        throw new Error('All fields are required');
      }

      if (!this.validateEmail(this.user.email)) {
        throw new Error('Invalid email address');
      }

      if (this.user.password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      await this.authService.login(this.user);
      this.router.navigate(['']);
    } catch (error) {
      console.error('Login error', error);
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
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }
}
