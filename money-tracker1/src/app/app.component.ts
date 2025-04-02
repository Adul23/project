import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ExpenseService} from './services/expense.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'money-tracker';
  constructor(private expenseService: ExpenseService) { }
  a = ""
  somefunc() :string{
    this.expenseService.setExpenseDetails('Office Supplies', 'John Doe', 1);
    return this.expenseService.getExpenseDesc();
  }
  submit(): void {
    
  }

}
