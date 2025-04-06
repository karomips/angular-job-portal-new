import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth.guard';
import { ViewDetailComponent } from './view-detail/view-detail.component';
import { AdminComponent } from './admin/admin.component';
import { EmployeeFormComponent } from './admin/employee-form/employee-form.component';
import { ViewEmployeeComponent } from './admin/view-employee/view-employee.component';
import { JobListComponent } from './job-list/job-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'job-list', component: JobListComponent },
  { path: 'login', component: AuthComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'employee-form', component: EmployeeFormComponent },
      { path: 'view-employee', component: ViewEmployeeComponent }
    ]
  },
  { path: 'my-profile/:id', component: ViewDetailComponent },
  { path: '**', component: PageNotFoundComponent }
];
