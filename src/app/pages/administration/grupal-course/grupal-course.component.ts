import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { grupalCourseEntity } from '../../../interfaces/grupalCourseEntity';
import { GrupalCoursesService } from '../../../services/grupal-courses.service';
import { studentEntity } from '../../../interfaces/studentEntity';
import { environment } from '../../../../environments/environment.prod';

@Component({
  selector: 'app-grupal-course-general',
  templateUrl: './grupal-course.component.html',
  styleUrls: ['./grupal-course.component.css']
})
export class GrupalCourseGeneralComponent implements OnInit {
  displayedColumns: string[] = ['picture', 'name', 'description', 'classTime', 'urlMeet', 'price', 'totalClases', 'clasesDone', 'studentSubscribed', 'alreadyPaid', 'moneyToBePaid', 'ver'];
  dataSource: MatTableDataSource<grupalCourseEntity>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public studentList: studentEntity[];
  public endpoint_grupal_course_image = environment.grupalCourse.host_image;
  public courseName: any;


  constructor(
    private grupalCourseService: GrupalCoursesService
  ) {
    this.studentList = [];
  }

  ngOnInit(): void {
    this.getAllGrupalCourses();
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

  getAllGrupalCourses() {
    this.grupalCourseService.getAllGrupalCourses().subscribe((resp) => {
      this.dataSource = new MatTableDataSource(resp);
    });
  }

  watchStudents(element: any) {
    this.courseName = element.name;
    this.studentList = element.studentes;
  }

}
