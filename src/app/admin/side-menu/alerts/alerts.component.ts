import { Component } from '@angular/core';
import { HttpService } from '../../../service/http.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-alerts',
  imports: [CommonModule, TableModule],
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.css'
})
export class AlertsComponent {

    data: any;
    expandedRow: any = null;
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

    toggleRowExpansion(rowData: any): void {
      if (this.expandedRow && this.expandedRow !== rowData) {
         this.expandedRow.expanded = false;
     }
     rowData.expanded = !rowData.expanded;
     this.expandedRow = rowData.expanded ? rowData : null;
    }
    onAlertClick(alert: any) {
      this.selectedAlert = alert;
    }

}
