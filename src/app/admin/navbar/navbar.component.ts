import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { StorageService } from '../../service/storage.service';
import { SideMenuComponent } from "../side-menu/side-menu.component";

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(
    private storage: StorageService,
    private router: Router) {
  }

  // ngOnInit(){
  // this.permissionService.addPermission(this.storage.getItem('tenant'))
  // }

  signOut() {
    this.storage.clear().then(() => {
      // this.permissionService.flushPermissions();
      this.router.navigate([''])
    });
  }

  onProfile() {
    this.router.navigate(['/admin/profile'])
  }

}
