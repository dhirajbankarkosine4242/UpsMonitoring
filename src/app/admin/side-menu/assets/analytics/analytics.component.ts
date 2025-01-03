import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpService } from '../../../../service/http.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-analytics',
  imports: [CommonModule],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent {

  data: any;
  liveDataInterval: any = null;
  @Input() selectedDeviceId: any
  form: FormGroup;

  constructor(private service: HttpService, private fb:FormBuilder) {
    const currentDateTime = new Date().toISOString().slice(0, 16);
    this.form = this.fb.group({
      devId: [[], Validators.required],
      fields: [['inputVoltage'], Validators.required],
      startDateTime: [currentDateTime, Validators.required],
      endDateTime: [currentDateTime, Validators.required],
    });
  }

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
      console.log('Live data:', response);
      this.data = response;
    });
  }

  download(): void {
    this.form.get('devId')?.setValue([this.selectedDeviceId]);
    const formData = this.form.value;
    this.service.post('download', formData).subscribe((response) => {
    })
  }

}
