import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { ExpenseFormComponent } from './pages/expense-form/expense-form.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import {ChartModule} from 'primeng/chart';
import {GraphsModule} from './pages/graphs/graphs.module'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent, 
    ExpenseFormComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartModule,
    FormsModule,
    HttpClientModule,
    CanvasJSAngularChartsModule,
    GraphsModule
  ],
  bootstrap: [AppComponent],
  providers: [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
  ],
})
export class AppModule { }

