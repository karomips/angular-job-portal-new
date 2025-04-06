import { Injectable } from '@angular/core';
import { IndexDbService } from './database/index-db.service';
import { map } from 'rxjs';

export enum ReportingTo {
  MANAGER = 'manager'
}

export interface Employee {
  id: any;
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
  reportingTo: ReportingTo;
  isManager: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private dbService: IndexDbService) { }

  // Add a new employee
  addEmployee(employee: Employee) {
    return this.dbService.addEmployee(employee);
  }

  // Get all employees who are managers
  getManagers() {
    return this.dbService.getAllEmployees().pipe(
      map((employees: Employee[]) => employees.filter(employee => employee.isManager))
    );
  }

  // Get all employees, possibly for displaying in a list or other purposes
  getAllEmployees() {
    return this.dbService.getAllEmployees();
  }
}
