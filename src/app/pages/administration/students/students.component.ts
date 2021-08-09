import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { StudentService } from '../../../services/student.service';
import { studentEntity } from '../../../interfaces/studentEntity';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'apellido', 'correo', 'telefono', 'fechaDeCreacion'];
  dataSource: MatTableDataSource<studentEntity>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private studentService: StudentService
  ) { }

  ngOnInit() {
    this.getAllStudents();
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

  getAllStudents() {
    this.studentService.getAllStudents().subscribe((resp => {
      this.dataSource = new MatTableDataSource(resp);
    }));
  }

}
