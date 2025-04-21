import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private baseUrl = 'http://127.0.0.1:8000/api/expenses/';

  constructor(private http: HttpClient) {}

  createExpense(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  getExpenses(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
}
