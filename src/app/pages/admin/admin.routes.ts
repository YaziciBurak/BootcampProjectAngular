import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { BootcampStateListGroupComponent } from './components/bootcamp-states/bootcamp-state-list-group.component'; 
import { AddBootcampStateFormComponent } from './components/bootcamp-states/add-bootcamp-state-form/add-bootcamp-state-form.component'; 
import { ApplicationStateListComponent } from './components/application-states/application-state-list.component';
import { AddApplicationStateFormComponent } from './components/application-states/add-application-state-form/add-application-state-form.component';


export const AdminRoutes: Routes = [
  { path: "", component: AdminComponent, children: [   
    { path: 'bootcampState', component: BootcampStateListGroupComponent },
    { path: 'addBootcampState', component: AddBootcampStateFormComponent },
    { path:'applicationState', component:ApplicationStateListComponent},
    { path:'addAppliactionState', component:AddApplicationStateFormComponent}
  ]},

];

