import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationProcessingComponent } from './components/registration-processing/registration-processing.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';
import { StudentApprovalComponent } from './components/student-approval/student-approval.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationSectionComponent } from './components/registration-section/registration-section.component';
import { CatechistListComponent } from './components/catechist-list/catechist-list.component';
import { ClassListComponent } from './components/class-list/class-list.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { ScoreComponent } from './components/score/score.component';
import { ProfileListComponent } from './components/profile-list/profile-list.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'registration-processing', component: RegistrationProcessingComponent, canActivate: [AuthGuard]},
  { path: 'student-list', component: StudentListComponent, canActivate: [AuthGuard] },
  { path: 'student-detail/:guid', component: StudentDetailComponent },
  { path: 'student-approval', component: StudentApprovalComponent },
  { path: 'registration-section', component: RegistrationSectionComponent, canActivate: [AuthGuard] },
  { path: 'catechist-list', component: CatechistListComponent, canActivate: [AuthGuard] },
  { path: 'class-list', component: ClassListComponent, canActivate: [AuthGuard] },
  { path: 'attendance', component: AttendanceComponent, canActivate: [AuthGuard] },
  { path: 'score', component: ScoreComponent, canActivate: [AuthGuard] },
  { path: 'profile-list', component: ProfileListComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/student-list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
