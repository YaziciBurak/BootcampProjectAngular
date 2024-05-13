import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { BootcampStateListGroupComponent } from './components/bootcamp-states/bootcamp-state-list-group.component'; 
import { ApplicationStateListComponent } from './components/application-states/application-state-list.component';
import { AdminBootcampsComponent } from './components/admin-bootcamps/admin-bootcamps.component';
import { EmployeeListGroupComponent } from './components/employee/employee-list-group.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { BlacklistComponent } from './components/blacklist/blacklist.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { ApplicantsComponent } from './components/applicants/applicants.component';
import { QuizQuestionsComponent } from './components/quiz-questions/quiz-questions.component';
import { ResultsComponent } from './components/results/results.component';
import { BootcampImageComponent } from './components/bootcamp-image/bootcamp-image.component';
import { InstructorComponent } from './components/instructor/instructor.component';
import { ApplicationComponent } from './components/application/application.component';
import { BootcampContentsComponent } from './components/bootcamp-contents/bootcamp-contents.component';
import { ApplicantBootcampContentsComponent } from './components/applicant-bootcamp-contents/applicant-bootcamp-contents.component';
import { InstructorImageComponent } from './components/instructor-image/instructor-image.component';

export const AdminRoutes: Routes = [
  { path: "", component: AdminComponent, children: [   
    { path: 'bootcampState', component: BootcampStateListGroupComponent },
    { path:'applicationState', component:ApplicationStateListComponent},
    { path:'bootcamp-image', component:BootcampImageComponent},
    { path:'bootcamp-contents', component:BootcampContentsComponent},
    { path:'applicant-bootcamp-contents', component:ApplicantBootcampContentsComponent},
    { path:'admin-bootcamp', component:AdminBootcampsComponent},
    { path: 'blacklist', component:BlacklistComponent},
    { path: 'questions', component:QuestionsComponent},
    { path: 'quiz', component:QuizComponent},
    { path: 'instructor-image', component:InstructorImageComponent},
    { path: 'application', component:ApplicationComponent},
    { path: 'instructor', component:InstructorComponent},
    { path: 'employee', component:EmployeeListGroupComponent},
    { path: 'applicant', component:ApplicantsComponent},
    { path: 'quiz-questions', component:QuizQuestionsComponent},
    { path: 'result', component:ResultsComponent}
    
  ]},
];

