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

  constructor(private service: HttpService) { }

  ngOnInit(){
    this.onDevIdClick(this.selectedDeviceId);
    this.startPolling();
  }

  onDevIdClick(id: string) {  
    this.service.get('asset', id).subscribe((response: any) => {
    });
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
      this.data = response;
    });
  }

}
