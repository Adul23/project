import { Component, input, output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],

  standalone: false,
})
export class SidebarComponent {

  isSidebarCollapsed = input.required<boolean>();
  changeIsSidebarCollapsed = output<boolean>();

  constructor(private authService: AuthService, private router: Router) {}
  items = [
    { label: 'Dashboard', icon: 'bx bx-bar-chart-alt-2', routerLink: '/dashboard' },
    { label: 'Graphs', icon: 'bx bx-line-chart', routerLink: '/graphs' },
  ];
  toggleCollapse(): void {
    this.changeIsSidebarCollapsed.emit(!this.isSidebarCollapsed());
  }
  logout() {
  this.authService.logout();
  this.router.navigate(['/login']);
}

  closeSidenav(): void {
    this.changeIsSidebarCollapsed.emit(true);
  }
}
