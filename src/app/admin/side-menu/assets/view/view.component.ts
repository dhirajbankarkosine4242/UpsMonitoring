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
  @Input() deviceId:any;
  // @Output() onTabLoad = new EventEmitter<any>();

  constructor(private service: HttpService) { }

  ngOnInit(){
    this.onDevIdClick(this.deviceId);
  }

  onDevIdClick(id: string) {
    if (this.liveDataInterval) {
      clearInterval(this.liveDataInterval);
    }   
    this.service.get('asset', id).subscribe((response: any) => {
      setTimeout(() => {
        this.getLiveData(response.devId);
        this.liveDataInterval = setInterval(() => {
          this.getLiveData(response.devId);
        }, 10000);
      }, 10000);
    });
  }

   getLiveData(id: any) {    
    this.service.get('live', id).subscribe((response) => {
    });
  }

}
