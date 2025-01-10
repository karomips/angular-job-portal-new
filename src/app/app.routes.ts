import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth.guard';
import { ViewDetailComponent } from './view-detail/view-detail.component';
import { AdminComponent } from './admin/admin.component';
import { EmployeeFormComponent } from './admin/employee-form/employee-form.component';
import { ViewEmployeeComponent } from './admin/view-employee/view-employee.component';

export const routes: Routes = [{
    path: '',
    component: HomeComponent,
    pathMatch:'full'
  },{
    path: 'login',
    component: AuthComponent,
     pathMatch:'full'
  },{
    path:'admin',
    component:AdminComponent,
    canActivate:[AuthGuard],
    children:[
      {
        path:'employee-form',
        component:EmployeeFormComponent,
        pathMatch:'full'
      },{
        path:'view-employee',
        component:ViewEmployeeComponent,
        pathMatch:'full'
      }
    ]
  },{
    path:'my-profile/:id',
    component:ViewDetailComponent,
     pathMatch:'full'
  },{
    path: '**',
    component: PageNotFoundComponent
  }
];
