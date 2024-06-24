import { Component, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  user = { email: '', password: '' };
  router = inject(Router);
  constructor(private authService: AuthService) {}

  async onLogin() {
    try {
      await this.authService.login(this.user);
      this.router.navigate(['']);
    } catch (error: any) {
      alert(error.response.data.message);
      console.log(error);
    }
  }
}
