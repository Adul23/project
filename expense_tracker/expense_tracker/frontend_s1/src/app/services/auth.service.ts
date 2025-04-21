import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://127.0.0.1:8000/api';
  private username:string = '';
  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
  return this.http.post(`${this.baseUrl}/login/`, data).pipe(
    tap((res: any) => {
      localStorage.setItem('access_token', res.access);
      localStorage.setItem('refresh_token', res.refresh);
    })
  );
}
  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register/`, data).pipe(
      tap((res: any) => {
        localStorage.setItem('access_token', res.access);
        localStorage.setItem('refresh_token', res.refresh);
      })
    );
  }

  logout() {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
  }

  saveToken(token: string) {
    localStorage.setItem('access', token);
  }

  getToken(): string | null {
    return localStorage.getItem('access');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  setUsername(username: string) {
    this.username = username;
  }

  getUsername(): string {
    return this.username;
  }
}
