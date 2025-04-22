import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  
  standalone: false,
})
export class SidebarComponent {

  isSidebarCollapsed = input.required<boolean>();
  changeIsSidebarCollapsed = output<boolean>();
  // toggleSidebar() {
  //   this.sidebarToggle.emit();
  // }
  items = [
    {
      routerLink: "/dashboard",
      icon: 'fal fa-home',
      label: 'Dashboard'
    },
    {
      routerLink: "/graphs",
      icon: 'fal fa-box-open',
      label: 'Graphs'
    },
  ];
  toggleCollapse(): void {
    this.changeIsSidebarCollapsed.emit(!this.isSidebarCollapsed());
  }

  closeSidenav(): void {
    this.changeIsSidebarCollapsed.emit(true);
  }
}
