import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private desc: string = '';
  private category: string = '';
  private cost: number = 0;
  constructor() { 

  }
  setExpenseDetails(description: string, category:string, cost: number){
    this.desc = description;
    this.category = category;
    this.cost = cost;
  }

  getExpenseDesc() : string{
    return this.desc;
  }
  getCategory() : string{
    return this.category;
  }
  getCost() : number{
    return this.cost;
  }
}
