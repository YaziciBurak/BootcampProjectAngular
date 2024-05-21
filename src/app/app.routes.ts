import { Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginComponent } from './features/components/login/login.component';
import { RegisterComponent } from './features/components/register/register.component';
import { BootcampListGroupComponent } from './features/components/bootcamps/bootcamp-list-group/bootcamp-list-group.component';
import { AdminRoutes } from './pages/admin/admin.routes';
import { BootcampListPageComponent } from './pages/bootcamp-list-page/bootcamp-list-page.component';
import { BootcampDetailPageComponent } from './pages/bootcamp-detail-page/bootcamp-detail-page.component';
import { ApplicationListPageComponent } from './pages/application-list-page/application-list-page.component';
import { MyBootcampsListPageComponent } from './pages/my-bootcamps-list-page/my-bootcamps-list-page.component';
import { BootcampContentPageComponent } from './pages/bootcamp-content-page/bootcamp-content-page.component';
import { UpdateMyProfilePageComponent } from './pages/update-my-profile-page/update-my-profile-page.component';
import { InstructorListPageComponent } from './pages/instructor-list-page/instructor-list-page.component';
import { UpdatePasswordPageComponent } from './pages/update-password-page/update-password-page.component';
import { QuizPageComponent } from './pages/quiz-page/quiz-page.component';
import { MyCertificatesPageComponent } from './pages/my-certificates-page/my-certificates-page.component';
import { AdminPanelGuard } from './core/guards/login/admin-panel.guard';


export const routes: Routes = [
    { path: '', redirectTo: 'homepage', pathMatch: 'full' },
    {
        path: 'homepage', component: HomepageComponent, children: [
            { path: "", pathMatch: "full", component: BootcampListGroupComponent }
        ]
    },
    { path: 'admin', children: AdminRoutes, canActivate: [AdminPanelGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'bootcamps', component: BootcampListPageComponent },
    { path: 'bootcampDetail/:bootcampId', component: BootcampDetailPageComponent },
    { path: "bootcamps/instructor/:instructorId", component: BootcampListPageComponent },
    { path: 'applications', component: ApplicationListPageComponent },
    { path: 'mybootcamps', component: MyBootcampsListPageComponent },
    { path: 'bootcampContent', component: BootcampContentPageComponent },
    { path: 'updateMyProfile', component: UpdateMyProfilePageComponent },
    { path: 'instructors', component: InstructorListPageComponent },
    { path: 'updatePassword', component: UpdatePasswordPageComponent },
    { path: 'bootcampContentByBootcampId/:bootcampId', component: BootcampContentPageComponent },
    { path: 'quiz', component: QuizPageComponent },
    { path: 'quiz/:quizId', component: QuizPageComponent },
    { path: 'mycertificates', component: MyCertificatesPageComponent },
];

