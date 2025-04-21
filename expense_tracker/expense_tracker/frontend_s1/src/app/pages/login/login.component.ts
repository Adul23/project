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
    if (!this.username || !this.password) {
      this.error = 'Please enter both username and password.';
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
        this.error = err?.error?.detail || 'Wrong username or password.';
        console.error(err);
      }
    });
  }
}
