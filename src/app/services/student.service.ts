import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { studentEntity } from '../interfaces/studentEntity';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  public environment = environment;
  public endpoint_student = environment.student.host;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router) { }



  registerStudent(student: studentEntity): Observable<studentEntity> {
    return this.http.post<studentEntity>(this.endpoint_student, student);
  }

  validateStudent(username: string): Observable<any> {
    return this.http.get<any>(`${this.endpoint_student}/verification/${username}`);
  }

  getAllStudents(): Observable<studentEntity[]> {
    return this.http.get<studentEntity[]>(this.endpoint_student);
  }

  getStudentsById(id): Observable<studentEntity> {
    return this.http.get<studentEntity>(`${this.endpoint_student}/${id}`);
  }

  getStudentTime(studentId: any): Observable<any> {
    return this.http.get<any>(`${this.endpoint_student}/get/time/${studentId}`);
  }

  //POR TRABAJAR CON EL TEMA DE TRANSACCIONES
  addStudentTime(): Observable<any> {
    // return this.http.put<any>(`${this.endpoint_student}/set/time/${studentId}`);
    return null;
  }

  setMoney(bodyObject: any): Observable<any> {
    bodyObject.money;
    bodyObject.studentId;
    return this.http.get<any>(`${this.endpoint_student}/transfer/${bodyObject.money}/${bodyObject.studentId}`);
  }

  getStudentMoney(studentId: any): any {
    let internalUrl = `${this.endpoint_student}/getMoney/${studentId}`;
    return this.http.get<any>(internalUrl);
  }

  uploadStudentPicture(picture: File, id: any): Observable<studentEntity> {
    let formData = new FormData();
    let internalEnpoint = `${environment.student.host}/upload/image`;
    formData.append("studentImage", picture);
    formData.append("id", id);
    return this.http.post<studentEntity>(internalEnpoint, formData).pipe
      (
        map((response: any) => response as studentEntity)
      );
  }

  addNewGrupalCourse(courseCost: any, teacherId: number, studentId: number, grupalCourseId: number): Observable<any> {
    return this.http.get<any>(`${this.endpoint_student}/teacher/set/grupalCourse/${courseCost}/${teacherId}/${studentId}/${grupalCourseId}`)
  }

  getTutoriasDetailsForStudent(studentId: number) {
    let endpointStudentDetails = `${this.endpoint_student}/get/class-details/${studentId}`;
    return this.http.get<any>(endpointStudentDetails);
  }

}
