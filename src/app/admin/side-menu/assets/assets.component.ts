import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../../service/http.service';
import { AnalyticsComponent } from "./analytics/analytics.component";
import { HistoryComponent } from "./history/history.component";
import { ViewComponent } from "./view/view.component";
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

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

  constructor(private service:HttpService){};

  ngOnInit(): void {
    this.getAssetsList()
  }
  
  getAssetsList() {
    this.service.get('assets').subscribe((response: any[]) => {
      this.data = response;
    });
  }

  // expandRow(devId:any): void {
  //   this.isExpanded = !this.isExpanded;
  //   this.selectedDeviceId = devId;
  // }

  toggleRowExpansion(rowData: any): void {
    // Collapse previously expanded row if it's not the same row
         if (this.expandedRow && this.expandedRow !== rowData) {
            this.expandedRow.expanded = false;
        }

  // Toggle the expanded state for the clicked row
  rowData.expanded = !rowData.expanded;
  this.expandedRow = rowData.expanded ? rowData : null;
  }

  switchTab(tab: string): void {
    this.currentTab = tab;
  }

}
