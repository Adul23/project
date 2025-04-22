import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { CurrencyService } from '../../services/currency.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType, ChartData } from 'chart.js';
import { ViewChild } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

@Component({
  standalone: false,
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.css'
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
  expenses: any[] = [];
  chartOptions: any;
  selectedCategory: number = 0;
  constructor(
    private expenseService: ExpenseService,
    private categoryService: CategoryService,
    private currencyService: CurrencyService,
    private router: Router,
    private route: ActivatedRoute, 
     
  ) {}

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      if (params['categoryId']) {
        this.selectedCategory = params['categoryId'];
      } else {
        console.error('Category ID is missing');
      }
    });
    this.categoryService.getCategories().subscribe({
      next: (res) => {
        this.categories = res;
      }
        ,
      error: (err) => console.error('Failed to load categories:', err)
    });

    this.currencyService.getCurrencies().subscribe({
      next: (res) => this.currencies = res, 
      error: (err) => console.error('Failed to load currencies:', err)
    });
    if (this.selectedCategory) {
      this.expenseService.getExpenses(this.selectedCategory).subscribe({
        next: (res) => {
          this.expenses = res;
          console.log(this.expenses);
          this.generateChartData();
        },
        error: (err) => console.error('Failed to load expenses:', err)
      });
    }
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
  
  
	generateChartData() {
    const totalAmount = this.expenses.reduce((sum: number, expense: any) => {
      return sum + parseFloat(expense.amount);
    }, 0);
    const dps = this.expenses.map((expense: any) => ({
      x: new Date(expense.date),
      y: parseFloat(expense.amount)
      
    }));
    this.chartOptions = {
      zoomEnabled: true,
      exportEnabled: true,
      theme: "light2",
      title: {
        text: "Expenses Over Time"
      },
      axisX: {
        title: "Date",
        valueFormatString: "DD MMM YYYY"
      },
      axisY: {
        title: "Amount " + totalAmount
      },
      data: [{
        type: "line",
        dataPoints: dps
      }]
    };
  }
  removeExpense(index: number): void {
  
    this.expenseService.deleteExpense(index, this.selectedCategory).subscribe(() => {
      this.expenses = this.expenses.filter(exp => exp.id !== index);
      console.log(this.expenses);
    });
      this.expenseService.getExpenses(this.selectedCategory).subscribe({
        next: (res) => {
          this.expenses = res;
          console.log(this.expenses);
          this.generateChartData();
        },
        error: (err) => console.error('Failed to load expenses:', err)
      });
    this.generateChartData();
  }
}
