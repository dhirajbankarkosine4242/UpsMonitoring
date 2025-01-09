import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges, NO_ERRORS_SCHEMA} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgSelectOption, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpService } from '../../../../service/http.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgSelectModule } from '@ng-select/ng-select';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'app-history',
  imports: [CommonModule, ReactiveFormsModule, MatDatepickerModule, MatFormFieldModule, NgSelectModule, FormsModule, MultiSelectModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css',
  schemas: [NO_ERRORS_SCHEMA]
})
export class HistoryComponent {

  @Input() deviceId: any;
  form: FormGroup;
  selectedFields: string[] = [];  // Store selected field names
  // isDropdownOpen = false; // Tracks dropdown state

  constructor(private service: HttpService, private fb: FormBuilder) {
    const currentDateTime = new Date().toISOString().slice(0, 16);
    this.form = this.fb.group({
      devId: [[], Validators.required],
      fields: [[], Validators.required],
      startDateTime: [currentDateTime, Validators.required],
      endDateTime: [currentDateTime, Validators.required],
    });
    this.selectedFields;
  }

  listOfItems = [
    { value: 'inputVoltage', name: 'Input Voltage' },
    { value: 'outputVoltage', name: 'Output Voltage' },
    { value: 'batVoltage', name: 'Battery Voltage' },
    { value: 'upsFault', name: 'UPS Fault' },
    { value: 'upsStatus', name: 'UPS Status' }
  ];
  

  // ngOnInit(){
  //   this.getGraph();
  // }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['deviceId'] && this.deviceId) {
      // this.form.patchValue({ devId: this.deviceId });
      this.form.get('devId')?.setValue([this.deviceId]);
      this.onSubmit();                   
    }
  }

  onSubmit() { //getGraph
    const formData = this.form.value;
    // Map selected fields to only the 'value' part of each object
  formData.fields = formData.fields.map((field: any) => field);
    this.service.post('graph', formData).subscribe((response) => {
    })
  }

  download(): void {
    const formData = this.form.value;
    // Map selected fields to only the 'value' part of each object
  formData.fields = formData.fields.map((field: any) => field);
    this.service.post('download', formData).subscribe((response) => {
    })
  }

  // toggleDropdown(): void {
  //   this.isDropdownOpen = !this.isDropdownOpen; // Toggle dropdown visibility
  // }

  // onChange(): void {
  //   // Optional: Add any logic to handle when selection changes
  //   console.log('Selected Fields:', this.selectedFields);
  // }

  // onClearAll() {
  //   const selected = this.listOfItems.map((item) => item.id);
  //   this.form.get('fields')?.setValue(selected)
  // }

  // onSelectAll() {
  //   this.form.get('fields')?.setValue([]);
  // }



}
