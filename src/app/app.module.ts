import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HeaderComponent } from './general/header/header.component';
import { FooterComponent } from './general/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterStudentComponent } from './pages/register-student/register-student.component';
import { RegisterTeacherComponent } from './pages/register-teacher/register-teacher.component';
import { StudentsComponent } from './pages/administration/students/students.component';
import { HomeComponent } from './pages/home/home.component';
import { TokenInterceptor } from './interceptors/TokenInterceptor';
import { AuthInterceptor } from './interceptors/AuthInterceptor';
import { PasswordDirective } from './validations/password.directive';
import { UsernameUniqueDirective } from './validations/username-unique.directive';
import { TeachersComponent } from './pages/administration/teachers/teachers.component';
import { CoursesComponent } from './pages/administration/courses/courses.component';
import { SubjectsComponent } from './pages/administration/subjects/subjects.component';
import { HeaderAdministrationComponent } from './general/header-administration/header-administration.component';
import { CourseFormComponent } from './pages/administration/courses/course-form/course-form.component';
import { StudentFormComponent } from './pages/administration/students/student-form/student-form.component';
import { TeacherFormComponent } from './pages/administration/teachers/teacher-form/teacher-form.component';
import { SubjectFormComponent } from './pages/administration/subjects/subject-form/subject-form.component';
import { HomeLogedComponent } from './pages/home/home-loged/home-loged.component';
import { PanelComponent } from './pages/teacher/panel/panel.component';
import { PrivateChatComponent } from './pages/private-chat/private-chat.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GrupalCourseComponent } from './modals/grupal-course/grupal-course.component';
import { StudentPanelComponent } from './pages/student-panel/student-panel.component';
import { SlideVarComponent } from './general/slide-var/slide-var.component';
import { LoggedNvbarComponent } from './general/logged-nvbar/logged-nvbar.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { GrupalCourseStudentsComponent } from './modals/grupal-course-students/grupal-course-students.component';
import { GrupalCourseFormComponent } from './modals/grupal-course-form/grupal-course-form.component';
import { GrupalCourseFormCreateComponent } from './modals/grupal-course-form-create/grupal-course-form-create.component';
import { ChatComponent } from './modals/chat/chat.component';
import { TutoriaComponent } from './modals/tutoria/tutoria.component';
import { TutoriaFormComponent } from './modals/tutoria-form/tutoria-form.component';
import { TutoriaFormCreateComponent } from './modals/tutoria-form-create/tutoria-form-create.component';
import { UploadCourseImageComponent } from './modals/upload-course-image/upload-course-image.component';
import { UploadGrupalCourseImageComponent } from './modals/upload-grupal-course-image/upload-grupal-course-image.component';
import { AdminPanelComponent } from './pages/administration/admin-panel/admin-panel.component';
import { GrupalCourseGeneralComponent } from './pages/administration/grupal-course/grupal-course.component';
import { UploadTeacherImageComponent } from './modals/upload-teacher-image/upload-teacher-image.component';
import { TransactionComponent } from './pages/transaction/transaction.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TeacherTimerComponent } from './modals/teacher-timer/teacher-timer.component';
import { StudentTimerComponent } from './modals/student-timer/student-timer.component';
import { TeacherInfoComponent } from './modals/teacher-info/teacher-info.component';
import { TeacherReferencesComponent } from './pages/teacher-references/teacher-references.component';
import { ModalDetailComponent } from './modal-detail/modal-detail.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { UploadStudentImageComponent } from './modals/upload-student-image/upload-student-image.component';
import { UploadBannerImageComponent } from './modals/upload-banner-image/upload-banner-image.component';
import { CurrencyPipe } from '@angular/common';
import { UpdateTeacherComponent } from './modals/update-teacher/update-teacher.component';
import { SpinnerComponent } from './general/spinner/spinner.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterStudentComponent,
    RegisterTeacherComponent,
    StudentsComponent,
    HomeComponent,
    PasswordDirective,
    UsernameUniqueDirective,
    TeachersComponent,
    CoursesComponent,
    SubjectsComponent,
    HeaderAdministrationComponent,
    CourseFormComponent,
    StudentFormComponent,
    TeacherFormComponent,
    SubjectFormComponent,
    HomeLogedComponent,
    PanelComponent,
    PrivateChatComponent,
    GrupalCourseComponent,
    GrupalCourseGeneralComponent,
    StudentPanelComponent,
    SlideVarComponent,
    LoggedNvbarComponent,
    GrupalCourseStudentsComponent,
    GrupalCourseFormComponent,
    GrupalCourseFormCreateComponent,
    ChatComponent,
    TutoriaComponent,
    TutoriaFormComponent,
    TutoriaFormCreateComponent,
    UploadCourseImageComponent,
    UploadGrupalCourseImageComponent,
    AdminPanelComponent,
    UploadTeacherImageComponent,
    TransactionComponent,
    TeacherTimerComponent,
    StudentTimerComponent,
    TeacherInfoComponent,
    TeacherReferencesComponent,
    ModalDetailComponent,
    UploadStudentImageComponent,
    UploadBannerImageComponent,
    UpdateTeacherComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    NgbModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [CurrencyPipe,
  { provide: LocationStrategy, useClass: HashLocationStrategy },
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
