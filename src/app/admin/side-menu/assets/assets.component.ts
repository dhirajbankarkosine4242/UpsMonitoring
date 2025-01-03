import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../../service/http.service';
import { AnalyticsComponent } from "./analytics/analytics.component";
import { HistoryComponent } from "./history/history.component";
import { ViewComponent } from "./view/view.component";

@Component({
  selector: 'app-assets',
  imports: [FormsModule, CommonModule, HistoryComponent, AnalyticsComponent, ViewComponent],
  templateUrl: './assets.component.html',
  styleUrl: './assets.component.css'
})
export class AssetsComponent {

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
