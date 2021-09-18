import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { teacherEntity } from '../interfaces/teacherEntity';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  public environment = environment;
  public endpoint_teacher = environment.teacher.host;
  public endpoint_student = environment.student.host;
  public onChatToHeredate: any;

  constructor(
    private http: HttpClient) { }

  updateTeacher(teacherId: number, teacherObject: teacherEntity) {
    return this.http.put(`${this.endpoint_teacher}/${teacherId}`, teacherObject);
  }

  registerTeacher(Teacher: teacherEntity): Observable<teacherEntity> {
    return this.http.post<teacherEntity>(this.endpoint_teacher, Teacher);
  }

  validateTeacher(username: string): Observable<any> {
    return this.http.get<any>(`${this.endpoint_student}/verification/${username}`);
  }

  getAllTeachers(): Observable<teacherEntity[]> {
    return this.http.get<teacherEntity[]>(this.endpoint_teacher);
  }

  getTeachersById(id: any): Observable<teacherEntity> {
    return this.http.get<teacherEntity>(`${this.endpoint_teacher}/${id}`)
  }

  getTeacherTime(teacherId: any): Observable<any> {
    return this.http.get<any>(`${this.endpoint_teacher}/get/time/${teacherId}`);
  }

  reduceTimeToStudentAndAddToTeacher(teacherId: any, studentId: any, timeOnClass: any): Observable<any> {
    let body: any = {
      'studentId': studentId,
      'teacherId': teacherId,
      'timeOnTransaction': timeOnClass
    };
    return this.http.post<any>(`${this.endpoint_student}/teacher/get/time`, body);
  }

  saveTeacher() {

    // if(this.isNoAutorizado(e)){
    //   return throwError(e);
    // }

  }

  verifyOnChat(response: any) {
    if (response) {
      this.onChatToHeredate = true;
    }
  }

  uploadTeacherPicture(picture: File, id: any): Observable<teacherEntity> {
    let formData = new FormData();
    let internalEnpoint = `${environment.teacher.host}/upload/image`;
    formData.append("teacherImage", picture);
    formData.append("id", id);
    return this.http.post<teacherEntity>(internalEnpoint, formData).pipe
      (
        map((response: any) => response as teacherEntity)
      );
  }

  enableTeacherPlatform(idTeacher: number): Observable<any> {
    let disableUrl = `${this.endpoint_teacher}/enable/${idTeacher}`;
    return this.http.get<any>(disableUrl);

  }

  disableTeacherPlatform(idTeacher: number): Observable<any> {
    let disableUrl = `${this.endpoint_teacher}/disable/${idTeacher}`;
    return this.http.get<any>(disableUrl);

  }

  updateTeacherProfile(objectToSend: any): Observable<any> {
    let updateProfile = `${this.endpoint_teacher}/post/profile`;
    return this.http.post<any>(updateProfile, objectToSend);

  }

  getTeachersDetails(): Observable<any> {
    let teacherProfileEndpoint = `${this.endpoint_teacher}/get/information`;
    return this.http.get<any>(teacherProfileEndpoint);
  }

  getTutoriasDetailsForTeacher(studentId: number): Observable<any> {
    let teacherDetailsEndpoint = `${this.endpoint_teacher}/get/class-details/${studentId}`;
    return this.http.get<any>(teacherDetailsEndpoint);
  }
}
