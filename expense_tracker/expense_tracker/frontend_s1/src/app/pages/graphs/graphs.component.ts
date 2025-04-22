import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../services/expense.service'; 
import { CategoryService } from '../../services/category.service'; 
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { ChartModule } from 'primeng/chart';


@Component({
  selector: 'app-graphs',
  standalone: false,
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css'],
})
export class GraphsComponent implements OnInit {
  data: any;  
  data2: any;
  data3: any;
  expenses: any[] = [];  
  categories: any[] = [];  

  chartOptions = {
    responsive: true,
    plugins: {
        legend: {
            labels: {
                color: 'white' 
            }
        },
        title: {
            display: true,
            text: 'Monthly Expenses',
            color: 'white',
            font: {
                size: 16
            }
        }
    },
    scales: {
        x: {
            title: {
                display: true,
                text: 'Month',
                color: 'white' 
            },
            ticks: {
                color: 'white' 
            }
        },
        y: {
            title: {
                display: true,
                text: 'Amount',
                color: 'white' 
            },
            ticks: {
                color: 'white',
                callback: (value: number) => '$' + value
            }
        }
    }
};

  constructor(
    private expenseService: ExpenseService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.categoryService.getCategories().subscribe({
      next: (res) => this.categories = res,
      error: (err) => console.error('Failed to load categories:', err)
    });
    
    this.expenseService.getAllExpenses().subscribe({
      next: (res) => {
        this.expenses = res;
        this.groupExpensesbyDate();
        this.groupExpByCat();
        this.groupExpensesByMonth();
      },
      error: (err) => console.error('Failed to load expenses:', err)
    });
    
  }
  label: string[] = [];
  money: number[] = [];
  groupExpensesbyDate(){
    this.label = this.expenses.map((expense) => `Expense ${expense.description}`);
    this.money = this.expenses.map(expense => parseFloat(expense.amount));

    const grouped: { [key: string]: number } = {};

    this.expenses.forEach(expense => {
      const date = new Date(expense.date).toLocaleDateString(); 
      const amount = parseFloat(expense.amount);
  
      if (!grouped[date]) {
        grouped[date] = 0;
      }
  
      grouped[date] += amount;
    });
    const labels = Object.keys(grouped);
    const dataValues = Object.values(grouped);
    this.data = {
        labels: this.label,
        
        datasets: [{
          label: 'Expenses by Date',
          data: dataValues
    }]
      
    }
    
  }
  groupExpByCat(){
    const grouped: { [key: string]: number } = {};
    
    this.expenses.forEach(expense => {
      const categoryId = expense.category;
      const amount = parseFloat(expense.amount);
  
      if (!grouped[categoryId]) {
        grouped[categoryId] = 0;
      }
  
      grouped[categoryId] += amount;
    });
  
    const labels = Object.keys(grouped).map(id => {
      const category = this.categories.find(c => c.id === +id);
      return category ? category.name : `Category ${id}`;
    });
  
    const dataValues = Object.values(grouped);
  
    this.data2 = {
      labels: labels,
      datasets: [{
        label: 'Expenses by Category',
        data: dataValues,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#66BB6A', '#BA68C8'],
        hoverOffset: 4
      }]
    };
  }
  groupExpensesByMonth() {
    const grouped: { [key: string]: number } = {};
  
    this.expenses.forEach(expense => {
      const date = new Date(expense.date);
      const month = date.toLocaleString('default', { month: 'short' });
      const year = date.getFullYear();
      const label = `${month} ${year}`;
      const amount = parseFloat(expense.amount);
  
      if (!grouped[label]) {
        grouped[label] = 0;
      }
  
      grouped[label] += amount;
    });
  
    const labels = Object.keys(grouped);
    const values = Object.values(grouped);
  
    this.data3 = {
      labels: labels,
      datasets: [{
        label: 'Expenses by Month',
        data: values,
        backgroundColor: '#42A5F5',
        borderColor: '#1E88E5',
        fill: false,
        tension: 0.4
      }]
    };
  }
  

}
