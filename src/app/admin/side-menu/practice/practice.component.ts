import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
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
  currentTab = 'viewTab';
  data:any;
  selectedDeviceId:any;
  // @ViewChild('viewTab') viewTab!: ViewComponent;
  // @ViewChild('analyticsTab') analyticsTab!: AnalyticsComponent;
  // @ViewChild('historyTab') historyTab!: HistoryComponent;

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
    // this.invokeTabMethod(tab);
  }

  // invokeTabMethod(tab: string) {
  //   switch (tab) {
  //     case 'viewTab':
  //       this.viewTab?.ngOnInit();
  //       break;
  //     case 'analyticsTab':
  //       this.analyticsTab?.ngOnInit();
  //       break;
  //     // case 'historyTab':
  //     //   this.historyTab?.ngOnChanges();
  //     //   break;
  //     case 'historyTab':
  //       if (this.historyTab) {
  //         const changes = {
  //           deviceId: {
  //             previousValue: null,
  //             currentValue: this.selectedDeviceId,
  //             firstChange: true,
  //             isFirstChange: () => true,
  //           },
  //         };
  //         this.historyTab.ngOnChanges(changes);
  //       }
  //       break;
  //   }
  // }

}
