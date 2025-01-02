import { Component } from '@angular/core';
import { HttpService } from '../../../service/http.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alerts',
  imports: [CommonModule],
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.css'
})
export class AlertsComponent {

    data: any;
    selectedAlert: any = null; // Holds the selected alert details
  
    constructor(private service: HttpService) { };
  
    ngOnInit() {
      this.getAlertsList()
    }
  
    getAlertsList() {
      this.service.get('alerts').subscribe((response: any[]) => {
        this.data = response;
      });
    }
    onAlertClick(alert: any) {
      this.selectedAlert = alert;
    }

}
