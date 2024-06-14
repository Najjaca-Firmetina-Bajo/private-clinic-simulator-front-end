import { Component } from '@angular/core';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrl: './contracts.component.css'
})
export class ContractsComponent {
  companies: string[] = ['Company A', 'Company B', 'Company C'];
  equipments: string[] = ['Equipment X', 'Equipment Y', 'Equipment Z'];
  quantity: number | undefined;
  deliveryDate: Date | undefined;

}
