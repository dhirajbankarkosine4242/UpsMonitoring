
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';

interface City {
  name: string,
  code: string
}
@Component({
  selector: 'app-practice',
  imports: [FormsModule, MultiSelectModule],
  templateUrl: './practice.component.html',
  styleUrl: './practice.component.css',
  standalone: true,
})
export class PracticeComponent {

  cities!: City[];

    selectedCities!: City[];

    ngOnInit() {
        this.cities = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
    }

    
    
}
 
