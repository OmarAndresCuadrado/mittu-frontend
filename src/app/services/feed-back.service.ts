import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class FeedBackService {

  public environment = environment;
  public endpoint_feed_back = environment.feedBack.host;
  public endpoint_teacher = environment.teacher.host;
  constructor(
    private http: HttpClient
  ) { }

  getAllFeedBacks(): Observable<any[]> {
    return this.http.get<any[]>(this.endpoint_feed_back);
  }

  //CREAR EL ENVIO
  createFeedBack(objectToSend): Observable<any> {
    let objectToSendFinal: any = {
      "studentId": objectToSend.studentId,
      "studentName":objectToSend.studentName,
      "teacherId": objectToSend.teacherId,
      "teacherName": objectToSend.teacherName,
      "calification": objectToSend.calification,
      "feedBack": objectToSend.feedBack
    }
    return this.http.post<any[]>(this.endpoint_feed_back, objectToSendFinal);
  }

  getCalification(teacherId: any): Observable<any> {
    return this.http.get(`${this.endpoint_teacher}/get/califaction/${teacherId}`);
  }

  getTeacherCalificationStudents(teacherId: any): Observable<any> {
    return this.http.get(`${this.endpoint_teacher}/get/califaction-students/${teacherId}`);
  }

  updateTeacherCalification(object: any): Observable<any> {
    return this.http.post(`${this.endpoint_teacher}/post/califaction`, object);
  }
}
