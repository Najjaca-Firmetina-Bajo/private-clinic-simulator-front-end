import { Component } from '@angular/core';
import {ContractsService} from "../contracts.service";
import {Company} from "./model/company.model";
import {Equipment} from "./model/equipment.model";

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrl: './contracts.component.css'
})
export class ContractsComponent {
  companies: Company[] = [];
  selectedCompany: Company | undefined;
  equipments: Equipment[] = [];
  quantity: number | undefined;
  deliveryDate: Date | undefined;

  constructor( private contractsService: ContractsService ) { }

  ngOnInit(): void {
    this.fetchCompanies();
  }

  fetchCompanies(): void {
    this.contractsService.getAllCompanies().subscribe(
      (companies: Company[]) => {
        this.companies = companies;
        if (companies.length > 0) {
          this.selectedCompany = companies[0];
          this.equipments = companies[0].equipments;
        }
      },
      (error) => {
        console.error('Error getting authenticated user ID:', error);
      }
    );
  }

  onCompanyChange(company: Company): void {
    this.selectedCompany = company;
    this.equipments = company.equipments;
  }
}
