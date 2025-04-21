import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../../services/auth.service';
import { CategoryService } from '../../services/category.service';
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
  constructor(
    private categoryService: CategoryService, 
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.username = this.authService.getUsername();
  
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
    console.log(this.selected_category);
  }
  getSelectedCategory(){
    return this.selected_category;
  }
}
