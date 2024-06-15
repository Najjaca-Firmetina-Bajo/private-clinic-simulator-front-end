import {Component, OnInit} from '@angular/core';
import {ContractsService} from "../contracts.service";
import {Company} from "./model/company.model";
import {Equipment} from "./model/equipment.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Contract} from "./model/contract.model";
import {AuthService} from "../../infrastructure/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrl: './contracts.component.css'
})
export class ContractsComponent implements OnInit{
  companies: Company[] = [];
  equipments: Equipment[] = [];
  contractForm: FormGroup;

  constructor(private contractsService: ContractsService,
              private authService: AuthService,
              private snackBar: MatSnackBar,
              private fb: FormBuilder) {
    this.contractForm = this.fb.group({
      company: [null, Validators.required],
      equipment: [null, Validators.required],
      quantity: [null, [Validators.required, Validators.min(1)]],
      deliveryDate: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchCompanies();
  }

  fetchCompanies(): void {
    this.contractsService.getAllCompanies().subscribe(
      (companies: Company[]) => {
        this.companies = companies;
        if (companies.length > 0) {
          this.contractForm.get('company')?.setValue(companies[0]);
          this.equipments = companies[0].equipments;
        }
      },
      (error) => {
        console.error('Error getting authenticated user ID:', error);
      }
    );
  }

  createContract(): void {
    if (this.contractForm.valid) {
      const formValues = this.contractForm.value;
      const contract: Contract = {
        userId: parseInt(<string>this.authService.getUserId(), 10),
        companyId: formValues.company.id,
        equipmentId: formValues.equipment.id,
        quantity: formValues.quantity,
        pickupDate: formValues.deliveryDate
      };

      this.contractsService.createContract(contract).subscribe(
        (response) => {
          console.log('Contract created successfully:', response);
          this.snackBar.open('Contract created successfully', 'Close', {
            duration: 3000
          });
          this.contractForm.reset();
        },
        (error) => {
          console.error('Error creating contract:', error);
          this.snackBar.open('Error creating contract', 'Close', {
            duration: 3000
          });
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }

  onCompanyChange(company: Company): void {
    this.contractForm.get('company')?.setValue(company);
    this.equipments = company.equipments;
    this.contractForm.get('equipment')?.setValue(null); // Reset equipment selection
  }

  futureDateValidator(control: any): {[key: string]: any} | null {
    const selectedDate = new Date(control.value);
    const now = new Date();
    if (selectedDate < now) {
      return { 'futureDate': true };
    }
    return null;
  }

  dateFilter = (date: Date | null): boolean => {
    const today = new Date();
    return date ? date > today : true;
  }
}
