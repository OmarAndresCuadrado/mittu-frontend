import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { courseEntity } from '../interfaces/coursesEntity';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  public environment = environment;
  public endpoint_course = environment.course.host;

  constructor(
    private http: HttpClient) { }

    getAllCourses(): Observable<courseEntity[]>  {
      return this.http.get<courseEntity[]>(`${environment.course.host}`);
    }

  getAllCourseFromTeacher(idTeacher: any): Observable<courseEntity[]> {
    let internalEnpoint = `${environment.course.host}/teacher/course/${idTeacher}`;
    return this.http.get<courseEntity[]>(internalEnpoint);
  }

  getCourseFiltredByNameAndBusy(courseName: any): Observable<courseEntity[]> {
    let internalEnpoint = `${environment.course.host}/find/course/name/${courseName}`;
    return this.http.get<courseEntity[]>(internalEnpoint);
  }

  createTutoriaCourse(tutoriaCourse: courseEntity): Observable<courseEntity> {
    let internalEndpoint = `${this.endpoint_course}/creation`;
    return this.http.post<courseEntity>(internalEndpoint, tutoriaCourse);
  }

  updateTutoriaCourse(tutoriaCourse: courseEntity, tutoriaCourseId: number) {
    let internalEnpoint = `${environment.course.host}/${tutoriaCourseId}`;
    return this.http.put<courseEntity[]>(internalEnpoint, tutoriaCourse);
  }

  uploadCoursePicture(picture: File, id: any): Observable<courseEntity> {
    let formData = new FormData();
    let internalEnpoint = `${environment.course.host}/upload/image`;
    formData.append("imageCourse", picture);
    formData.append("id", id);
    return this.http.post<courseEntity>(internalEnpoint, formData).pipe
      (
        map((response: any) => response as courseEntity)
      );
  }

}
