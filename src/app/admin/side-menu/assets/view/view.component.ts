import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpService } from '../../../../service/http.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view',
  imports: [CommonModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent {

  data: any;
  liveDataInterval: any = null;
  @Input() selectedDeviceId:any;

  //for battery
  batVoltage: number | null = null;
  batteryIcon: string = 'bi bi-battery';
  batteryClass: string = 'battery-low';

  constructor(private service: HttpService) { }

  ngOnInit(){
    // this.onDevIdClick(this.selectedDeviceId);
    this.startPolling();
  }

  // onDevIdClick(id: string) {  
  //   this.service.get('asset', id).subscribe((response: any) => {
  //   });
  // }

  ngOnDestroy() {
    this.stopPolling();
  }

  startPolling() {
    this.stopPolling();
    this.getLiveData(this.selectedDeviceId);
    this.liveDataInterval = setInterval(() => {
      this.getLiveData(this.selectedDeviceId);
    }, 5000);
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
      this.data = response;
      if (response && response.length > 0) {
        const latestData = response[response.length - 1]; 
        this.batVoltage = latestData.batVoltage;
        this.updateBatteryStatus(this.batVoltage);
      }
    });
  }

  updateBatteryStatus(voltage: number | null): void {
    if (voltage === null) {
      this.batteryIcon = 'bi bi-battery';
      this.batteryClass = 'battery-unknown';
      return;
    }  
    if (voltage <= 20) {
      this.batteryIcon = 'bi bi-battery';
      this.batteryClass = 'battery-low';
    } else if (voltage > 20 && voltage <= 70) {
      this.batteryIcon = 'bi bi-battery-half';
      this.batteryClass = 'battery-medium';
    } else {
      this.batteryIcon = 'bi bi-battery-full';
      this.batteryClass = 'battery-full';
    }
  }

}
