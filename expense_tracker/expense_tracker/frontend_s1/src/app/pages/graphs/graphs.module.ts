
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphsComponent } from './graphs.component';
import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [GraphsComponent],
  imports: [
    CommonModule,
    ChartModule 
  ]
})
export class GraphsModule { }
