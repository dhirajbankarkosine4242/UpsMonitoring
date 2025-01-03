import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpService } from '../../../../service/http.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-analytics',
  imports: [CommonModule],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent {

  data: any;
  liveDataInterval: any = null;
  @Input() selectedDeviceId:any

  constructor(private service: HttpService,) {   }

  ngOnInit() {
    this.startPolling();
  }

  ngOnDestroy() {
    this.stopPolling();
  }

  startPolling() {
    this.stopPolling();
    this.getLiveData(this.selectedDeviceId);
    this.liveDataInterval = setInterval(() => {
      this.getLiveData(this.selectedDeviceId);
    }, 10000);
  }

  stopPolling() {
    if (this.liveDataInterval) {
      clearInterval(this.liveDataInterval);
      this.liveDataInterval = null;
    }
  }

  getLiveData(id: any) {
    if (!id) return;
    this.service.get('live', id).subscribe((response) => {
      console.log('Live data:', response);
      this.data = response;
    });
  }

}
