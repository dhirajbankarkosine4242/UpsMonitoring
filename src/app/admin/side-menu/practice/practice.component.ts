import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpService } from '../../../service/http.service';
import { AnalyticsComponent } from "../assets/analytics/analytics.component";
import { HistoryComponent } from "../assets/history/history.component";
import { ViewComponent } from "../assets/view/view.component";

@Component({
  selector: 'app-practice',
  imports: [CommonModule,  ViewComponent, AnalyticsComponent, HistoryComponent],
  templateUrl: './practice.component.html',
  styleUrl: './practice.component.css'
})
export class PracticeComponent {

  isExpanded = false;
  currentTab = 'tab1';
  data:any;
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

  expandRow(devId:any): void {
    this.isExpanded = !this.isExpanded;
    this.selectedDeviceId = devId;
  }

  switchTab(tab: string): void {
    this.currentTab = tab;
  }

  getLiveData(id: any) {
    this.service.get('live', id).subscribe((response) => {
      console.log('Live data fetched:', response);
    });
  }

  // handleViewLoaded(event: any) {
  //   console.log('View data loaded:', event);
  // }

  // handleAnalyticsLoaded(event: any) {
  //   console.log('Analytics data loaded:', event);
  // }

  // handleHistoryLoaded(event: any) {
  //   console.log('History data loaded:', event);
  // }

}
