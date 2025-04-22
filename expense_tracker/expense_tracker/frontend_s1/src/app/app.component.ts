import { Component, HostListener, OnInit, signal } from '@angular/core';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit{
  constructor(public router: Router) {}
  title = 'frontend_s';
  screenWidth = signal<number>(window.innerWidth);
  isSidebarCollapsed = signal<boolean>(false);
  shouldShowSidebar(): boolean {
    const hiddenRoutes = ['/login', '/register'];
    return !hiddenRoutes.includes(this.router.url);
  }
  @HostListener('window:resize')
  onResize() {
    this.screenWidth.set(window.innerWidth);
    if (this.screenWidth() < 768) {
      this.isSidebarCollapsed.set(true);
    }
  }
  ngOnInit(): void {
    this.isSidebarCollapsed.set(this.screenWidth() < 768);
  }
  changeIsSidebarCollapsed(isLeftSidebarCollapsed: boolean): void {
    this.isSidebarCollapsed.set(isLeftSidebarCollapsed);
  }
}
