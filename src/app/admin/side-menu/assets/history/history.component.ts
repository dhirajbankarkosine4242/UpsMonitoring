import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { HttpService } from '../../../../service/http.service';
import { response } from 'express';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-history',
  imports: [],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {

  @Input() deviceId:any;
  form:FormGroup;

  constructor(private service:HttpService, private fb:FormBuilder){
    this.form = this.fb.group({
          devId: [''],
          fields: ['', Validators.required],
          startDateTime: ['', Validators.required],
          endDateTime: [''],
        });
  }

  // ngOnInit(){
  //   this.getGraph();
  // }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['deviceId'] && this.deviceId) {
      this.form.patchValue({ devId: this.deviceId });
      this.getGraph();
    }
  }

  getGraph(){
    const formData = this.form.value;
      this.service.post('graph',formData).subscribe((response)=>{
        console.log("response from graph",+response)
      })
  }

}
