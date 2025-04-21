import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { CurrencyService } from '../../services/currency.service';

@Component({
  standalone: false,
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
})
export class ExpenseFormComponent implements OnInit {
  amount: number = 0;
  description: string = '';
  category: number = 1;
  currency: number = 1;
  error: string = '';
  success: string = '';
  categories: any[] = [];
  currencies: any[] = [];

  constructor(
    private expenseService: ExpenseService,
    private categoryService: CategoryService,
    private currencyService: CurrencyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.categoryService.getCategories().subscribe({
      next: (res) => this.categories = res,
      error: (err) => console.error('Failed to load categories:', err)
    });

    this.currencyService.getCurrencies().subscribe({
      next: (res) => this.currencies = res,
      error: (err) => console.error('Failed to load currencies:', err)
    });
  }

  onSubmit() {
    const data = {
      amount: this.amount,
      description: this.description,
      category: this.category,
      currency: this.currency
    };

    this.expenseService.createExpense(data).subscribe({
      next: () => {
        this.success = 'Expense created successfully!';
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.error = 'Failed to create expense.';
        console.error(err);
      }
    });
  }
}
