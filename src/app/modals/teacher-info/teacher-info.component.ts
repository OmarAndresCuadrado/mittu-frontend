import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { TeacherService } from '../../services/teacher.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-teacher-info',
  templateUrl: './teacher-info.component.html',
  styleUrls: ['./teacher-info.component.css']
})
export class TeacherInfoComponent implements OnChanges, OnInit {

  @Input() public idTeacherFor: any;
  public teacherFound: any;
  public endpoint_teacher_image = environment.teacher.host_image;

  constructor(
    private modalService: ModalService,
    private teacherService: TeacherService
  ) { }



  ngOnChanges(changes: SimpleChanges): void {
    this.idTeacherFor = this.idTeacherFor;
    console.log("id del profesor ngOnInt teacher info ", this.idTeacherFor);
    this.teacherService.getTeachersById(this.idTeacherFor).subscribe(resp => {
      console.log("respuesta ", resp);
      this.teacherFound = resp;
      console.log("objeto del teacher ", this.teacherFound);
    });
  }


  ngOnInit(): void {
    console.log("id del profesor ngOnInt teacher info ", this.idTeacherFor);
    this.teacherService.getTeachersById(this.idTeacherFor).subscribe(resp => {
      console.log("respuesta ", resp);
      this.teacherFound = resp;
      console.log("objeto del teacher ", this.teacherFound);
    });
  }

  closeModal() {
    this.modalService.closeModal();
  }

}
