import { Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginComponent } from './features/components/login/login.component';
import { RegisterComponent } from './features/components/register/register.component';
import { BootcampListGroupComponent } from './features/components/bootcamps/bootcamp-list-group/bootcamp-list-group.component';
import { AdminRoutes } from './pages/admin/admin.routes';
import { BootcampDetailComponent } from './features/components/bootcamps/bootcamp-list-group/bootcamp-details/bootcamp-details.component'; 


export const routes: Routes = [
    {path:'',redirectTo:'homepage',pathMatch:'full'},
    {path:'homepage',component:HomepageComponent,children:[
        {path:"",pathMatch:"full",component:BootcampListGroupComponent}  
    ]},
    {path:'admin', children:AdminRoutes },
    {path:'login',component:LoginComponent},
    {path:'register', component:RegisterComponent},
    {path:"bootcamps",pathMatch:"full",component:BootcampListGroupComponent},
    {path:'bootcampDetails/:bootcampId', component:BootcampDetailComponent},
    {path:"bootcamps/instructor/:instructorId",component:BootcampListGroupComponent},
  
];

