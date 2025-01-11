import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../../service/http.service';
import { AnalyticsComponent } from "./analytics/analytics.component";
import { HistoryComponent } from "./history/history.component";
import { ViewComponent } from "./view/view.component";
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-assets',
  imports: [FormsModule, CommonModule, HistoryComponent, AnalyticsComponent, ViewComponent, TableModule, ButtonModule],
  templateUrl: './assets.component.html',
  styleUrl: './assets.component.css'
})
export class AssetsComponent {

  // isExpanded = false;
  currentTab = 'viewTab';
  data:any[]=[];
  expandedRow: any = null;
  selectedDeviceId:any;
  liveDataInterval: any = null;

  constructor(private service:HttpService, private toastr: ToastrService){};

  ngOnInit(): void {
    // this.startPolling();
    this.getAssetsList();
  }

  startPolling() {
    this.stopPolling();
    this.getAssetsListConstantly();
    this.liveDataInterval = setInterval(() => {
      this.getAssetsListConstantly();
    }, 60000);
  }

  stopPolling() {
    if (this.liveDataInterval) {
      clearInterval(this.liveDataInterval);
      this.liveDataInterval = null;
    }
  }
  
  getAssetsListConstantly() {
    this.service.get('assets').subscribe((response: any[]) => {  
      const batVoltage = this.data.filter(asset => asset.batVoltage > 40);  
      if (batVoltage.length > 0) {
        batVoltage.forEach((asset, index) => {
          setTimeout(() => {
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'warning',
              title: `Asset ID: ${asset.devId} has a high battery Voltage!`,
              text: `Battery Voltage: ${asset.batVoltage}`,
              timer: 3000,
              timerProgressBar: true,
              showConfirmButton: false,
            });
          }, index * 3000); // Add a 500ms delay for each toast
        });
      }
    });
  }

  getAssetsList(){
    this.service.get('assets').subscribe((response: any[]) => {
      this.data = response;
      const batVoltage = this.data.filter(asset => asset.batVoltage > 40);  
      if (batVoltage.length > 0) {
        batVoltage.forEach((asset, index) => {
          setTimeout(() => {
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'warning',
              title: `Asset ID: ${asset.devId} has a high battery Voltage!`,
              text: `Battery Voltage: ${asset.batVoltage}`,
              timer: 3000,
              timerProgressBar: true,
              showConfirmButton: false,
            });
          }, index * 3000);
        });
      }
    });
  }
  

  // expandRow(devId:any): void {
  //   this.isExpanded = !this.isExpanded;
  //   this.selectedDeviceId = devId;
  // }

  toggleRowExpansion(rowData: any): void {
         if (this.expandedRow && this.expandedRow !== rowData) {
            this.expandedRow.expanded = false;
        }
        rowData.expanded = !rowData.expanded;
        this.expandedRow = rowData.expanded ? rowData : null;
  }

  switchTab(tab: string): void {
    this.currentTab = tab;
  }

}
