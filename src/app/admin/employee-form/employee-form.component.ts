import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../../employee-service.service';
import { Router } from '@angular/router';
import { CountryService } from '../../utils/country.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-employee-form',
  imports: [ReactiveFormsModule, CommonModule, NgSelectModule,MatDatepickerModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css',
  providers: [
    provideNativeDateAdapter()
  ]
})
export class EmployeeFormComponent implements OnInit {
  public employeeForm!: FormGroup;
  public departments = [
    'Development',
    'ITSupport',
    'HR',
    'Finance',
    'Others',
    'Admin',
  ];
  public role = [
    'Software Developer/Engineer',
    'Senior Software Developer/Engineer',
    'Project Manager',
    'Senior Project Manager',
    'HR Executive',
    'HR Manager',
    'Finance Manager',
    'Tester',
    'Tester Lead',
    'Tester Manager',
  ]
  public isManager: any[] = []

  constructor(
    public fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private countryService: CountryService
  ) {

  }
  public countryList: any
  public stateList: any

  ngOnInit() {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      age: [''],
      email: ['', [Validators.required, Validators.email]],
      city: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      department: ['', [Validators.required]],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      address: [''],
      dateOfJoin: [''],
      dateOfBirth: ['', [Validators.required]],
      previousExperience: ['', [Validators.required]],
      salary: ['', [Validators.required, Validators.min(10000)]],
      role: ['', [Validators.required]],
      reportingTo: ['', [Validators.required]],
      isManager: [this.isManager, [Validators.required]]
    })
    this.countryService.getAllCountries().subscribe((countries:any) => {
      this.countryList= countries.data
    });
    this.employeeForm.get('dateOfBirth')?.valueChanges.subscribe(value => {
      this.calculateAge();
    });
  }
  getCountry(){
    this.getStates(this.employeeForm.get('country')!.value)
  }
  getStates(country: string) {
    this.countryService.getAllStates({ country }).subscribe((states: any) => {
      this.stateList = states.data.states;
    });
  }
  calculateAge() {
    const birthDate = new Date(this.employeeForm.get('dateOfBirth')!.value);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    this.employeeForm.get('age')!.setValue(age);
    if (age < 18) {
      this.employeeForm.get('age')!.setValidators(Validators.min(18));
    }
    this.employeeService.getManager().subscribe({
      next: (data: any) => {
        this.isManager = data.filter((data: any) => data.isManager).map((data: any) => {
          return { manager_id: data.id, name: data.name };
        });;
        console.log(this.isManager)
      },
      error: (error: any) => {
        console.error('Error data:', error);
      },
      complete: () => {
        console.log('Completed');
      }
    })
  }
  onSubmit() {
    try {
      const employee = { ...this.employeeForm.value, id: this.employeeForm.get('name')!.value + '0' + (Math.floor(Math.random() * 10) + 1) }
      console.log(employee);
      this.employeeService.addEmployee(employee).subscribe({
        next: (data: any) => {
          console.log('Success data:', data);
          this.router.navigate(['/admin/view-employee']);
          alert('Employee added successfully');
          this.employeeForm.reset();
        },
        error: (error: any) => {
          console.error('Error data:', error);
          alert('Error adding employee');
        },
        complete: () => {
          console.log('Completed');
        }
      });
    } catch (err) {
      console.error(err)
      alert('Error adding employee')
    }
  }

}
