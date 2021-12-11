import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { grupalCourseEntity } from '../interfaces/grupalCourseEntity';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GrupalCoursesService {

  public environment = environment;
  public endpoint_grupal_course = environment.grupalCourse.host;

  constructor(
    private http: HttpClient
  ) { }

  getAllGrupalCourses(): Observable<grupalCourseEntity[]> {
    let internalEnpoint = this.endpoint_grupal_course;
    return this.http.get<grupalCourseEntity[]>(internalEnpoint);
  }

  getCourseFiltredByName(courseName: any): Observable<grupalCourseEntity[]> {
    let internalEnpoint = `${this.endpoint_grupal_course}/search/${courseName}`;
    return this.http.get<grupalCourseEntity[]>(internalEnpoint);
  }

  makeInscriptionToGrupalCourse(data: any): Observable<any> {
    let internalEndpoint = `${this.endpoint_grupal_course}/create/inscription`;
    return this.http.post(internalEndpoint, data);
  }

  getAllgrupalCoursesFromStudent(studentId: any): Observable<grupalCourseEntity[]> {
    let internalEndpoint = `${this.endpoint_grupal_course}/courses/${studentId}`;
    return this.http.get<grupalCourseEntity[]>(internalEndpoint);
  }

  updateGrupalCourseInformation(grupalCourse: grupalCourseEntity, grupalCourseId: any): Observable<grupalCourseEntity> {
    let internalEndpoint = `${this.endpoint_grupal_course}/${grupalCourseId}`;
    return this.http.put<grupalCourseEntity>(internalEndpoint, grupalCourse);
  }

  createGrupalCourse(grupalCourse: grupalCourseEntity) {
    let internalEndpoint = `${this.endpoint_grupal_course}`;
    return this.http.post<grupalCourseEntity>(internalEndpoint, grupalCourse);
  }

  uploadGrupalCoursePicture(picture: File, id: any): Observable<grupalCourseEntity> {
    let formData = new FormData();
    let internalEnpoint = `${environment.grupalCourse.host}/upload/image`;
    formData.append("grupalCourseImage", picture);
    formData.append("id", id);
    return this.http.post<grupalCourseEntity>(internalEnpoint, formData).pipe
      (
        map((response: any) => response as grupalCourseEntity)
      );
  }

  saveGrupalCoursePurchase(grupalCoursePurchaseToSave: any): Observable<any> {
    let urlForPurchase = `${this.endpoint_grupal_course}/purchase`;
    return this.http.post<any>(urlForPurchase, grupalCoursePurchaseToSave);
  }

  listAllGrupalCoursePurchases(): Observable<any[]> {
    let urlForPurchase = `${this.endpoint_grupal_course}/purchase`;
    return this.http.get<any[]>(urlForPurchase);
  }

  setNewMoneyAndAlreadyPaidCourse(idTeacher: any, idGrupalCourse: any): Observable<any> {
    let internalEndpoint = `${this.endpoint_grupal_course}/set/new/money/teacher/${idTeacher}/${idGrupalCourse}`;
    return this.http.get<any>(internalEndpoint);
  }
}
