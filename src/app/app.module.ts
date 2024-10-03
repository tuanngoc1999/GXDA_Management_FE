import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Thêm BrowserAnimationsModule
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker'; // Thêm dòng này
import { MatInputModule } from '@angular/material/input'; // Thêm dòng này
import { MatNativeDateModule } from '@angular/material/core'; // Thêm dòng này
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

import { StudentListComponent } from './components/student-list/student-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; // Thêm HttpClientModule
import { QRCodeModule } from 'angularx-qrcode';

// Angular Material Imports
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { StudentDetailDialogComponent } from './components/student-detail-dialog/student-detail-dialog.component';
import { RegistrationProcessingComponent } from './components/registration-processing/registration-processing.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';
import { StudentApprovalComponent } from './components/student-approval/student-approval.component';
import { RegistrationSectionComponent } from './components/registration-section/registration-section.component';
import { CatechistListComponent } from './components/catechist-list/catechist-list.component';
import { CatechistDetailComponent } from './components/catechist-detail/catechist-detail.component';
import { ClassListComponent } from './components/class-list/class-list.component';
import { ClassDetailComponent } from './components/class-detail/class-detail.component';
import { SelectDialogComponent } from './components/common/select-dialog/select-dialog.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { ScoreComponent } from './components/score/score.component';
import { AddScoresComponent } from './components/score/add-scores/add-scores.component';
import { ProfileDialogComponent } from './components/profile/profile-dialog.component';
import { ProfileListComponent } from './components/profile-list/profile-list.component';
import { StudentImportDialogComponent } from './components/student-import-dialog/student-import-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    StudentListComponent,
    StudentDetailDialogComponent,
    RegistrationProcessingComponent,
    LoginComponent,
    StudentFormComponent,
    StudentDetailComponent,
    StudentApprovalComponent,
    RegistrationSectionComponent,
    CatechistListComponent,
    CatechistDetailComponent,
    ClassListComponent,
    ClassDetailComponent,
    SelectDialogComponent,
    AttendanceComponent,
    ScoreComponent,
    AddScoresComponent,
    ProfileDialogComponent,
    ProfileListComponent,
    StudentImportDialogComponent
  ],
  imports: [
    FormsModule,
    QRCodeModule,
    AppRoutingModule,
    MatCardModule,
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatDatepickerModule, // Thêm dòng này
    MatFormFieldModule, // Thêm dòng này
    MatInputModule, // Thêm dòng này
    MatNativeDateModule // Thêm dòng này
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
