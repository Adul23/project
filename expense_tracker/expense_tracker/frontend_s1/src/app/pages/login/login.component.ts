import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: false,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
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

  const data = { username: this.username, password: this.password };

  this.authService.login(data).subscribe({
    next: (res: any) => {
      this.authService.setUsername(this.username);
      this.authService.saveToken(res.access);
      this.router.navigate(['/dashboard']);
    },
    error: (err: any) => {
      this.error = err?.error?.detail || 'Invalid credentials.';
      console.error('Login error:', err);
    }
  });
}
}
