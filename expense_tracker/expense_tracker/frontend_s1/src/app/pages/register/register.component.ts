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
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    this.error = '';

    if (!this.username.trim() && !this.password.trim()) {
      this.error = 'Username is required. Password is required.';
      return;
    }

    if (!this.username.trim()) {
      this.error = 'Username is required.';
      return;
    }

    if (!this.password.trim()) {
      this.error = 'Password is required.';
      return;
    }

    const data = {
      username: this.username,
      password: this.password
    };

    this.authService.setUsername(this.username);
    this.authService.register(data).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => {
        this.error =
          err.error?.username?.[0] ||
          err.error?.password?.[0] ||
          err.error?.detail ||
          'Registration failed.';
        console.error('Registration error:', err);
      }
    });
  }
}
