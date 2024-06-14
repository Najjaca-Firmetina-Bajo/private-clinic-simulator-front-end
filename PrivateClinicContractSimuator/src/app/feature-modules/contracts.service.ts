import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Company} from "./contracts/model/company.model";
import { environment } from "../env/enviroment";

@Injectable({
  providedIn: 'root'
})
export class ContractsService {

  constructor( private http: HttpClient ) { }

  getAllCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(environment.apiHost + 'companies')
  }

}
