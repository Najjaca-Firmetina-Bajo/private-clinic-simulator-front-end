import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Company} from "./contracts/model/company.model";
import { environment } from "../env/enviroment";
import {Contract} from "./contracts/model/contract.model";

@Injectable({
  providedIn: 'root'
})
export class ContractsService {

  constructor( private http: HttpClient ) { }

  getAllCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(environment.apiHost + 'companies')
  }

  createContract(contract: Contract): Observable<void> {
    return this.http.post<void>(environment.apiHost + 'contracts', contract)
  }

}
