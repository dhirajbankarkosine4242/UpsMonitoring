import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { HttpService } from '../../../service/http.service';

@Component({
  selector: 'app-assets',
  imports: [FormsModule, CommonModule],
  templateUrl: './assets.component.html',
  styleUrl: './assets.component.css'
})
export class AssetsComponent {

  data: any;
  selectedId:any
  selectedDeviceDetails: any = null;

  constructor(private service: HttpService) {}

  ngOnInit() {
    this.getAssetsList();
  }

  getAssetsList() {
    this.service.get('assets').subscribe((response: any[]) => {
      this.data = response;
    });
  }

  onDevIdClick(id: string) {
    this.service.get('asset', id).subscribe((response: any) => {
      this.selectedDeviceDetails = response;
      this.selectedId = response.devId;
    });
  }

}
