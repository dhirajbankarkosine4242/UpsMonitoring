import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  imports: [RouterModule, CommonModule],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {

  @Input() isLeftSidebarCollapsed!: boolean;
  @Output() changeIsLeftSidebarCollapsed = new EventEmitter<boolean>();

  items = [
    { routeLink: 'dashboard', icon: 'fal fa-home', label: 'Dashboard' },
    { routeLink: 'alert', icon: 'fal fa-box-open', label: 'alerts' },
  ];

  toggleCollapse(): void {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed);
  }

  closeSidenav(): void {
    this.changeIsLeftSidebarCollapsed.emit(true);
  }
  
}
