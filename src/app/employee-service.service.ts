import { Injectable } from '@angular/core';
import { IndexDbService } from './database/index-db.service';

export enum ReportingTo{
  MANAGER = 'manager'
}
export interface Employee {
  name: string;
  age: string;
  email: string;
  city: string;
  gender: string;
  phoneNumber: string;
  department: string;
  country: string;
  address: string;
  dateOfJoin: string;
  dateOfBirth: string;
  previousExperience: string;
  salary: string;
  role: string;
  reportingTo: ReportingTo
  isManager: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private dbService: IndexDbService) { }

  addEmployee(employee: any){
    return this.dbService.addEmployee(employee)
  }

  getManager(){
    return this.dbService.getAllEmployees()
  }
}
