import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private baseUrl = 'http://127.0.0.1:8000/api/expenses/';
  private baseUrlget = 'http://127.0.0.1:8000/api/categories/';
  constructor(private http: HttpClient) {}

  createExpense(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  getExpenses(selected_id: any): Observable<any> {
    return this.http.get(this.baseUrlget + selected_id + "/expenses/");
  }
  deleteExpense(selected_id: number, category_id:number): Observable<any> {
    return this.http.delete(this.baseUrlget + category_id + "/expenses/" + selected_id);
  }
  
}
