import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
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
