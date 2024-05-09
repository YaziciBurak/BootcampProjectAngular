import { Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginComponent } from './features/components/login/login.component';
import { RegisterComponent } from './features/components/register/register.component';
import { BootcampListGroupComponent } from './features/components/bootcamps/bootcamp-list-group/bootcamp-list-group.component';
import { AdminRoutes } from './pages/admin/admin.routes';
import { BootcampDetailComponent } from './features/components/bootcamps/bootcamp-list-group/bootcamp-details/bootcamp-details.component'; 
import { BootcampListPageComponent } from './pages/bootcamp-list-page/bootcamp-list-page.component';
import { BootcampDetailPageComponent } from './pages/bootcamp-detail-page/bootcamp-detail-page.component';


export const routes: Routes = [
    {path:'',redirectTo:'homepage',pathMatch:'full'},
    {path:'homepage',component:HomepageComponent,children:[
        {path:"",pathMatch:"full",component:BootcampListGroupComponent}  
    ]},
    {path:'admin', children:AdminRoutes },
    {path:'login',component:LoginComponent},
    {path:'register', component:RegisterComponent},
    {path:'bootcamps', component:BootcampListPageComponent},
    {path:'bootcampDetail/:bootcampId', component:BootcampDetailPageComponent},
    {path:"bootcamps/instructor/:instructorId",component:BootcampListGroupComponent},
];

