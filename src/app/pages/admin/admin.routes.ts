import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { BootcampStateListGroupComponent } from './components/bootcamp-states/bootcamp-state-list-group.component'; 
import { AddBootcampStateFormComponent } from './components/bootcamp-states/add-bootcamp-state-form/add-bootcamp-state-form.component'; 
import { ApplicationStateListComponent } from './components/application-states/application-state-list.component';
import { AddApplicationStateFormComponent } from './components/application-states/add-application-state-form/add-application-state-form.component';
import { AdminBootcampsComponent } from './components/admin-bootcamps/admin-bootcamps.component';
import { EmployeeListGroupComponent } from './components/employee/employee-list-group.component';
import { AddEmployeeFormComponent } from './components/employee/add-employee-form/add-employee-form.component';

import { QuestionsComponent } from './components/questions/questions.component';
import { BlacklistComponent } from './components/blacklist/blacklist.component';

import { InstructorListGroupComponent } from './components/instructor/instructor-list-group/instructor-list-group.component';
import { AddInstructorFormComponent } from './components/instructor/add-instructor-form/add-instructor-form/add-instructor-form.component';




export const AdminRoutes: Routes = [
  { path: "", component: AdminComponent, children: [   
    { path: 'bootcampState', component: BootcampStateListGroupComponent },
    { path: 'addBootcampState', component: AddBootcampStateFormComponent },
    { path:'applicationState', component:ApplicationStateListComponent},
    { path:'addAppliactionState', component:AddApplicationStateFormComponent},
    { path:'admin-bootcamp', component:AdminBootcampsComponent},
    { path: 'blacklist', component:BlacklistComponent},
    { path: 'questions', component:QuestionsComponent},
    { path: 'employee', component:EmployeeListGroupComponent},

    { path: 'addEmployee', component: AddEmployeeFormComponent }

    { path: 'addEmployee', component: AddEmployeeFormComponent },
    { path: 'instructor', component:InstructorListGroupComponent},
    { path: 'addInstructor', component: AddInstructorFormComponent },

  ]},

];

