import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from "../side-menu/side-menu.component";

@Component({
  selector: 'app-admin-layout',
  imports: [SideMenuComponent, RouterOutlet, CommonModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {

  isLeftSidebarCollapsed: boolean = false;
  screenWidth: number = 0;
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  @HostListener('window:resize')
  onResize() {
    if (this.isBrowser) {
      this.screenWidth = window.innerWidth;
      if (this.screenWidth < 768) {
        this.isLeftSidebarCollapsed = true;
      }
    }
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.screenWidth = window.innerWidth;
      this.isLeftSidebarCollapsed = this.screenWidth < 768;
    }
  }

  toggleSidebarCollapse(): void {
    this.isLeftSidebarCollapsed = !this.isLeftSidebarCollapsed;
  } 
  

}