import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExpenseService } from '../../services/expense.service';

@Component({
  standalone: false,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  expenses: any[] = [];

  constructor(
    private expenseService: ExpenseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.expenseService.getExpenses().subscribe({
      next: (data: any) => {
        this.expenses = data;
      },
      error: (err: any) => {
        console.error('Error fetching expenses:', err);
      }
    });
  }
  onLogout() {
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
  this.router.navigate(['/login']);
}
}
