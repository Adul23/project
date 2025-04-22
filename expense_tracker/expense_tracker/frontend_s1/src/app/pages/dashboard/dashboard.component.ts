import { Component, OnInit,computed, input } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../../services/auth.service';
import { CategoryService } from '../../services/category.service';
import { CanvasJS } from '@canvasjs/angular-charts';
import { ExpenseService } from '../../services/expense.service';


@Component({
  standalone: false,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  expenses: any[] = [];
  username: string = '';
  name: string = "";
  error: string = '';
  success: string = '';
  categories: any[] = [];
  selected_category: any;
  chartOptions: any;
  constructor(
    private categoryService: CategoryService, 
    private router: Router,
    private authService: AuthService,
    private expenseService: ExpenseService
  ) {}

  ngOnInit() {
    this.username = this.authService.getUsername();
    this.generateSampleChart();
    this.categoryService.getCategories().subscribe({
      next: (data: any) => {
        this.categories = data;
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

  onCreate() {
    const data = {
      name: this.name
    };
    this.categoryService.createCategory(data).subscribe({
      next: () => {
        this.success = 'Category created successfully!';
      },
      error: (err) => {
        this.error = 'Failed to create expense.';
        console.error(err);
      }
    });
  }
  selectCategory(categoryID: number){
    this.selected_category = categoryID;
  }
  getSelectedCategory(){
    return this.selected_category;
  }

  generateSampleChart() {
    this.categoryService.getCategories().subscribe({

      next: (data: any) => {
        this.categories = data;
      },
      error: (err: any) => {
        console.error('Error fetching expenses:', err);
      }
      
    });
    this.expenseService.getExpenses(this.selected_category).subscribe({

      next: (data: any) => {
        this.expenses = data;
      },
      error: (err: any) => {
        console.error('Error fetching expenses:', err);
      }
      
    });
    const categorySums: { [key: string]: number } = {};
          this.expenses.forEach(expense => {
            const category = this.categories.find(cat => cat.id === expense.category);
            const categoryName = category ? category.name : 'Unknown';
            if (!categorySums[categoryName]) {
              categorySums[categoryName] = 0;
            }
            categorySums[categoryName] += expense.amount;
          });

          const dataPoints = Object.entries(categorySums).map(([label, y]) => ({
            label,
            y
          }));
    this.chartOptions = {
      animationEnabled: true,
      title: {
        text: "Sample Budget Allocation"
      },
      data: [{
        type: "pie",
        startAngle: 240,
        yValueFormatString: "##0.00\"%\"",
        indexLabel: "{label} {y}",
        dataPoints
      }]
    };
  }
  

  isSidebarCollapsed = input.required<boolean>();
  screenWidth = input.required<number>();
  sizeClass = computed(() => {
    const isSidebarCollapsed = this.isSidebarCollapsed();
    if (isSidebarCollapsed) {
      return '';
    }
    return this.screenWidth() > 768 ? 'body-trimmed' : 'body-md-screen';
  });


}
