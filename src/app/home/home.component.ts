import { Component, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  userName: string = '';
  isLoggedIn: boolean = false;
  router = inject(Router);
  constructor(private authService: AuthService) {}
  async ngOnInit() {
    try {
      const result = await this.authService.getUserProfile();
      this.userName = result.name;
      this.isLoggedIn = true;
    } catch (error) {
      this.isLoggedIn = false;
      this.router.navigate(['/login']);
      console.error('error', error);
    }
  }
}
