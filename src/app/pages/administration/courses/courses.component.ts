import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { courseEntity } from '../../../interfaces/coursesEntity';
import { CourseService } from '../../../services/course.service';
import { environment } from '../../../../environments/environment.prod';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  displayedColumns: string[] = ['algo', 'nombre', 'descripcion', 'urlMeet', 'profesor'];
  dataSource: MatTableDataSource<courseEntity>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public endpoint_course_image = environment.course.host_image;

  constructor(
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
    this.getAllCourses();
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

  getAllCourses() {
    this.courseService.getAllCourses().subscribe((resp) => {
      this.dataSource = new MatTableDataSource(resp);
    });
  }

}
