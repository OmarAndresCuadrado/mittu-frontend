import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { teacherEntity } from '../../../interfaces/teacherEntity';
import { TeacherService } from '../../../services/teacher.service';
import { courseEntity } from '../../../interfaces/coursesEntity';
import { environment } from '../../../../environments/environment.prod';


@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'apellido', 'correo', 'telefono', 'fecha','state', 'profile', 'cursos', 'available', 'calificacion'];
  dataSource: MatTableDataSource<teacherEntity>;
  public environment = environment;
  public listOfCourses: courseEntity[];
  public endpoint_grupal_course_image = environment.course.host_image;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private teacherService: TeacherService
  ) {
    this.listOfCourses = [];
  }

  ngOnInit(): void {
    this.getAllTeachers();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 500);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllTeachers() {
    this.teacherService.getAllTeachers().subscribe((resp => {
      this.dataSource = new MatTableDataSource(resp);
    }));
  }

  watchCourses(element: any) {
    this.listOfCourses = element.courses;
  }

  enableTeacher(row: any) {
    console.log("valor de disable ", row);
    this.teacherService.enableTeacherPlatform(row.idUser).subscribe(resp => {
      console.log("respuesta del servicio de activar profesor ", resp);
    })
    this.dataSource = new MatTableDataSource();
    setTimeout(() => {
      this.getAllTeachers();
    }, 1000);

  }

  disableTeacher(row: any) {
    console.log("valor de disable ", row);
    this.teacherService.disableTeacherPlatform(row.idUser).subscribe(resp => {
      console.log("respuesta del servicio de desactivar profesor ", resp);
    })
    this.dataSource = new MatTableDataSource();
    setTimeout(() => {
      this.getAllTeachers();
    }, 1000);

  }

  profileChoosed(profile:any, teacherID: any) {
    console.log("perfil seleccionado ", profile );
    let objectToSend = {
      "teacherId": teacherID,
      "profile": profile
    }
    this.teacherService.updateTeacherProfile(objectToSend).subscribe(resp => {
      console.log("perfil actualizado");
    })
    this.dataSource = new MatTableDataSource();
    setTimeout(() => {
      this.getAllTeachers();
    }, 2000);
  }

}
