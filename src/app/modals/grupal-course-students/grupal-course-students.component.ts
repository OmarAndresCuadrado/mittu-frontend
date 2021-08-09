import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { studentEntity } from '../../interfaces/studentEntity';

@Component({
  selector: 'app-grupal-course-students',
  templateUrl: './grupal-course-students.component.html',
  styleUrls: ['./grupal-course-students.component.css']
})
export class GrupalCourseStudentsComponent implements OnInit {

  @Input() students: studentEntity[];
  @Input() courseName: string;

  constructor(
    public modalService: ModalService,
  ) { }

  ngOnInit(): void {

  }

  closeModal() {
    this.modalService.closeModal();
  }

}
