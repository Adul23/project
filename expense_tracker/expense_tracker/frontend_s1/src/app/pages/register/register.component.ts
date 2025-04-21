import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: false,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    if (!this.username || !this.email || !this.password) {
      this.error = 'All fields are required.';
      return;
    }

    if (!this.email.includes('@')) {
      this.error = 'Invalid email format.';
      return;
    }

    const data = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.authService.register(data).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => {
        if (err.error?.email) {
          this.error = err.error.email[0];
        } else if (err.error?.username) {
          this.error = err.error.username[0];
        } else if (err.error?.password) {
          this.error = err.error.password[0];
        } else if (err.error?.detail) {
          this.error = err.error.detail;
        } else {
          this.error = 'Registration failed.';
        }
        console.error('Full error:', err);
      }
    });
  }
}
