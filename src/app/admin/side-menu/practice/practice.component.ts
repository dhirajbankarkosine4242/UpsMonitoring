
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../../service/http.service';

interface City {
  name: string,
  code: string
}
@Component({
  selector: 'app-practice',
  imports: [FormsModule, CommonModule],
  templateUrl: './practice.component.html',
  styleUrl: './practice.component.css',
  standalone: true,
})
export class PracticeComponent {

    data: any;
    liveDataInterval: any = null;    

    batVoltage: number | null = null;
    batteryIcon: string = 'bi bi-battery';
    batteryClass: string = 'battery-low';
  // private subscription!: Subscription;
    selectedDeviceId:any = '40a36bc92e68';
    constructor(private service: HttpService) { }
  
    ngOnInit(){
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
        if (response && response.length > 0) {
              const latestData = response[response.length - 1]; 
              this.updateBatteryStatus(latestData.batVoltage);
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
 
