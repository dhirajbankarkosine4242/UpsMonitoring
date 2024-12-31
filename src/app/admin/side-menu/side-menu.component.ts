import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { StorageService } from '../../service/storage.service';

@Component({
  selector: 'app-side-menu',
  imports: [RouterModule, CommonModule],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {

  constructor(private storage:StorageService, private router:Router){}

  isSideMenuCollapsed: boolean = false;

  toggleSideMenu() {
    this.isSideMenuCollapsed = !this.isSideMenuCollapsed;
  }

  signOut() {
    this.storage.clear().then(() => {
      // this.permissionService.flushPermissions();
      this.router.navigate([''])
    });
  }

}
