import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterStudentComponent } from './pages/register-student/register-student.component';
import { RegisterTeacherComponent } from './pages/register-teacher/register-teacher.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { StudentsComponent } from './pages/administration/students/students.component';
import { CoursesComponent } from './pages/administration/courses/courses.component';
import { SubjectsComponent } from './pages/administration/subjects/subjects.component';
import { TeachersComponent } from './pages/administration/teachers/teachers.component';
import { StudentFormComponent } from './pages/administration/students/student-form/student-form.component';
import { TeacherFormComponent } from './pages/administration/teachers/teacher-form/teacher-form.component';
import { CourseFormComponent } from './pages/administration/courses/course-form/course-form.component';
import { SubjectFormComponent } from './pages/administration/subjects/subject-form/subject-form.component';
import { HomeLogedComponent } from './pages/home/home-loged/home-loged.component';
import { PanelComponent } from './pages/teacher/panel/panel.component';
import { PrivateChatComponent } from './pages/private-chat/private-chat.component';
import { StudentPanelComponent } from './pages/student-panel/student-panel.component';
import { AdminPanelComponent } from './pages/administration/admin-panel/admin-panel.component';
import { TransactionComponent } from './pages/transaction/transaction.component';
import { TeacherReferencesComponent } from './pages/teacher-references/teacher-references.component';


const routes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: 'home-loged', component: HomeLogedComponent},

  


  // { path: 'administration-student-form', component: StudentFormComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
  // { path: 'administration-student-form/:id', component: StudentFormComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
  // { path: 'administration-student', component: StudentsComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },

  // { path: 'administration-teacher-form', component: TeacherFormComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
  // { path: 'administration-teacher-form/:id', component: TeacherFormComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
  // { path: 'administration-teacher', component: TeachersComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },

  // { path: 'administration-course-form', component: CourseFormComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
  // { path: 'administration-course-form/:id', component: CourseFormComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
  // { path: 'administration-course', component: CoursesComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },

  // { path: 'administration-subject-form', component: SubjectFormComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
  // { path: 'administration-subject-form/:id', component: SubjectFormComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
  // { path: 'administration-subject', component: SubjectsComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },

  { path: 'login', component: LoginComponent },

  { path: 'register-student', component: RegisterStudentComponent },
  { path: 'register-teacher', component: RegisterTeacherComponent },

  { path: 'teacher-panel', component: PanelComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_TEACHER' }},
  { path: 'student-panel', component: StudentPanelComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_STUDENT' }},
  { path: 'admin-panel', component: AdminPanelComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
  { path: 'teacher-references', component: TeacherReferencesComponent},

 // { path: 'teacher-panel', component: PanelComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_TEACHER', roleb: 'ROLE_STUDENT' }},

  {path : 'private-chat', component: PrivateChatComponent, canActivate: [AuthGuard]},

  {path : 'pagos', component: TransactionComponent},

  { path: '', redirectTo: 'home-loged', pathMatch: 'full' },
  { path: '**', component: HomeLogedComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

