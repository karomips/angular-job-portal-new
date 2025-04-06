import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeService } from '../../employee-service.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-view-employee',
  imports: [CommonModule],
  templateUrl: './view-employee.component.html',
  styleUrl: './view-employee.component.css'
})
export class ViewEmployeeComponent implements OnInit {
  employeeDetails!: Employee[]
  
  constructor(private employeeService: EmployeeService) {

  }
  ngOnInit(): void {
    this.employeeService.getManagers().subscribe({
      next: (manager) => {
        this.employeeDetails = manager.map(e => {
          return {
            emp_id: e.id,
            email: e.email,
            name: e.name,
            phone_number: e.phoneNumber,
            department: e.department,
            role: e.role,
            gender: e.gender,
            salary: e.salary,
            age: e.age,
            DOB: e.dateOfBirth,
            DOJ: e.dateOfJoin,
            reporting_To: e.reportingTo,
            is_Manager: e.isManager ? this.getTotalReporting(e.id, manager) + ' reports' : 'No',
          } as unknown as Employee
        })
        console.log('Manager:', manager);
      },
      error: (error: any) => {
        console.error('Error:', error);
      }
    })
  }

  getTableHeader(object: any) {
    return Object.keys(object)
  }

  getColumnDetails(object: { [x: string]: any; }, key: string | number) {
    return object[key]
  }

  getTotalReporting(id: any, employeeDetails: any[]) {
    let count = 0;
    employeeDetails.forEach((element: any) => {
      if (element.reportingTo === id) {
        count++
      }
    });
    return count
  }
  deleteEmployee(employee: any) {
    console.log('deleteEmployee', employee)
  }

  editEmployee(employee: any) {
    console.log('editEmployee', employee);
  }
}
