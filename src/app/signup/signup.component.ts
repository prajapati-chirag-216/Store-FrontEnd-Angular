import { Component, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  user = { name: '', email: '', password: '' };
  router = inject(Router);
  constructor(private authService: AuthService) {}

  async onSignup() {
    try {
      await this.authService.signup(this.user);
      this.router.navigate(['']);
    } catch (error) {
      console.error('Signup error', error);
    }
  }
}
