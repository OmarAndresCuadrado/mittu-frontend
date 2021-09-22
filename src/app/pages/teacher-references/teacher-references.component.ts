import { Component, OnInit } from '@angular/core';
import { TeacherService } from 'src/app/services/teacher.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-teacher-references',
  templateUrl: './teacher-references.component.html',
  styleUrls: ['./teacher-references.component.css']
})
export class TeacherReferencesComponent implements OnInit {

  public teacherDetails: any[] = [];
  public endpoint_teacher_image = environment.teacher.host_image;
  public teacherImage: any;
  

  constructor(
    private teacherService: TeacherService
  ) { }

  ngOnInit(): void {
    this.getTeachersDetailsMethod();
  }


  getTeachersDetailsMethod(): void {
    let testObject = {
      "name": "omardocente",
      "lastName": "omardocente",
      "phone": "1231231",
      "picture": "bb10d349-11a2-4f41-8bcd-a97513c709eb_universo.jpg",
      "hourCost": 1,
      "profile": "Gran Master",
      "busy": true,
      "education": "asd",
      "description": "asd",
      "calification": 3.6,
      "countStudent": 5,
      "email": "omardocente@gmail.com",
      "courses": [
        {
          "id": 2,
          "name": "tutoria 1",
          "description": "tutoria uno descripcion",
          "picture": "8ff7f133-610c-40e2-a03e-7fefe79aa7c3_planet_omega-wallpaper-2560x1080.jpg",
          "fechaDeCreacion": "2021-06-05",
          "busy": true,
          "idTeacher": 1,
          "teacherName": "omardocente omardocente",
          "meetUrlCourse": "una url"
        },
        {
          "id": 3,
          "name": "Casa",
          "description": "muy bonita",
          "picture": "6ad99b81-b9e7-4766-b7e1-d8caeaceff81_planet_omega-wallpaper-2560x1080.jpg",
          "fechaDeCreacion": "2021-06-21",
          "busy": true,
          "idTeacher": 1,
          "teacherName": "omardocente omardocente",
          "meetUrlCourse": "meet"
        }
      ],
      "grupalCourses": [
        {
          "id": 6,
          "name": "curso grupal 1",
          "idTeacher": 1,
          "picture": "84ef00bd-2144-444d-b5ff-5b918b3a1a2c_universo.jpg",
          "classTime": "Lunes a Martes 12:00 am 1:00 pm",
          "urlMeet": "alguna",
          "fechaDeCreacion": "2021-06-05",
          "studentes": [],
          "description": "curso grupal 1 descripcion"
        },
        {
          "id": 7,
          "name": "curso grupal 1",
          "idTeacher": 1,
          "picture": "84ef00bd-2144-444d-b5ff-5b918b3a1a2c_universo.jpg",
          "classTime": "Lunes a Martes 12:00 am 1:00 pm",
          "urlMeet": "alguna",
          "fechaDeCreacion": "2021-06-05",
          "studentes": [],
          "description": "curso grupal 1 descripcion"
        },
        {
          "id": 8,
          "name": "curso grupal 1",
          "idTeacher": 1,
          "picture": "84ef00bd-2144-444d-b5ff-5b918b3a1a2c_universo.jpg",
          "classTime": "Lunes a Martes 12:00 am 1:00 pm",
          "urlMeet": "alguna",
          "fechaDeCreacion": "2021-06-05",
          "studentes": [],
          "description": "curso grupal 1 descripcion"
        },
        {
          "id": 9,
          "name": "curso grupal 1",
          "idTeacher": 1,
          "picture": "84ef00bd-2144-444d-b5ff-5b918b3a1a2c_universo.jpg",
          "classTime": "Lunes a Martes 12:00 am 1:00 pm",
          "urlMeet": "alguna",
          "fechaDeCreacion": "2021-06-05",
          "studentes": [],
          "description": "curso grupal 1 descripcion"
        },
        {
          "id": 10,
          "name": "curso grupal 1",
          "idTeacher": 1,
          "picture": "84ef00bd-2144-444d-b5ff-5b918b3a1a2c_universo.jpg",
          "classTime": "Lunes a Martes 12:00 am 1:00 pm",
          "urlMeet": "alguna",
          "fechaDeCreacion": "2021-06-05",
          "studentes": [],
          "description": "curso grupal 1 descripcion"
        },
        {
          "id": 11,
          "name": "curso grupal 1",
          "idTeacher": 1,
          "picture": "84ef00bd-2144-444d-b5ff-5b918b3a1a2c_universo.jpg",
          "classTime": "Lunes a Martes 12:00 am 1:00 pm",
          "urlMeet": "alguna",
          "fechaDeCreacion": "2021-06-05",
          "studentes": [],
          "description": "curso grupal 1 descripcion"
        }
      ]
    }
    this.teacherService.getTeachersDetails().subscribe(resp => {
      this.teacherDetails = resp;
      this.teacherImage = resp.picture;
      this.teacherDetails.push(testObject);
      this.teacherDetails.push(testObject);
      this.teacherDetails.push(testObject);
      this.teacherDetails.push(testObject);
      this.teacherDetails.push(testObject);
      this.teacherDetails.push(testObject);
      this.teacherDetails.push(testObject);
      this.teacherDetails.push(testObject);
      this.teacherDetails.push(testObject);
      this.teacherDetails.push(testObject);
      this.teacherDetails.push(testObject);
      this.teacherDetails.push(testObject);
      this.teacherDetails.push(testObject);
      this.teacherDetails.push(testObject);
      this.teacherDetails.push(testObject);
      this.teacherDetails.push(testObject);
      this.teacherDetails.push(testObject);
      this.teacherDetails.push(testObject);
      this.teacherDetails.push(testObject);
    });
  }

}
