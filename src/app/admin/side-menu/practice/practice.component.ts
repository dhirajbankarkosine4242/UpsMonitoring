import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { HttpService } from '../../../service/http.service';

@Component({
  selector: 'app-practice',
  // imports: [TableModule, HttpClientModule, ButtonModule, Ripple, Tag],
  imports: [TableModule,ButtonModule],
  templateUrl: './practice.component.html',
  styleUrl: './practice.component.css',
  standalone: true,
  // providers: [CustomerService],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  // styles: [
  //     `:host ::ng-deep .p-rowgroup-footer td {
  //         font-weight: 700;
  //     }

  //     :host ::ng-deep .p-rowgroup-header {
  //         span {
  //             font-weight: 700;
  //         }

  //         .p-row-toggler {
  //             vertical-align: middle;
  //             margin-right: .25rem;
  //         }
  //     }`
  // ],
})
export class PracticeComponent {
  
    data:any;
    selectedDeviceId:any;
  
    constructor(private service:HttpService){};
  
    ngOnInit(): void {
      this.getAssetsList()
    }
    
    getAssetsList() {
      this.service.get('assets').subscribe((response: any[]) => {
        this.data = response;
      });
    }


}
