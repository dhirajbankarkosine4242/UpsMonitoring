import { Component, HostListener, Inject, PLATFORM_ID, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from "./admin/side-menu/side-menu.component";
import { AdminLayoutComponent } from "./admin/admin-layout/admin-layout.component";
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'UpsMonitoring';

//   public spinkit = Spinkit;

//   isConnected: boolean = true;
//   loading = true;
//   constructor(private router: Router) {


//     this.router.events.subscribe((event: Event) => {
//       switch (true) {
//         case event instanceof NavigationStart: {
//           this.loading = true;
//           break;
//         }
//         case event instanceof NavigationEnd:
//         case event instanceof NavigationCancel:
//         case event instanceof NavigationError: {
//           this.loading = false;
//           break;
//         }
//         default: {
//           break;
//         }
//       }
//     });

//   }

//   ngOnInit(): void {
//     window.addEventListener("load", () => {
//       this.isConnected = navigator.onLine

//       window.addEventListener("online", () => {
//         this.isConnected = true
//       });

//       window.addEventListener("offline", () => {
//         this.isConnected = false
//       });
//     });
//   }

//   ngAfterViewInit() {
//     const loader = document.getElementById('main_loader');
//     if (loader) {
//       loader.style.display = 'none'
// }
// }

}
