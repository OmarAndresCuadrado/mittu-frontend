import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../../services/modal.service';
import { grupalCourseEntity } from '../../interfaces/grupalCourseEntity';
import { GrupalCoursesService } from '../../services/grupal-courses.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-grupal-course-form',
  templateUrl: './grupal-course-form.component.html',
  styleUrls: ['./grupal-course-form.component.css']
})
export class GrupalCourseFormComponent implements OnInit {

  @Input() grupalCourse: grupalCourseEntity;
  @Output() grupalCourseEmmiter = new EventEmitter<any>();
  grupalCourseForm: FormGroup;
  grupalCourseToEdit: grupalCourseEntity;

  constructor(
    public modalService: ModalService,
    public grupalCoursesService: GrupalCoursesService,
    private formBuilder: FormBuilder,

  ) {
    this.grupalCourseToEdit = new grupalCourseEntity();
  }

  get description() {
    return this.grupalCourseForm.get('description');
  }

  get classTime() {
    return this.grupalCourseForm.get('classTime');
  }

  get urlMeet() {
    return this.grupalCourseForm.get('urlMeet');
  }

  get name() {
    return this.grupalCourseForm.get('name');
  }

  ngOnInit(): void {
    this.grupalCourseForm = this.formBuilder.group({
      description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      classTime: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      urlMeet: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]]
    });
  }

  closeModal() {
    this.modalService.closeModal();
  }

  updateCourseAndCloseModal(grupalCourse: any, idGrupalCourse: any) {
    let actualGrupalCourse = this.grupalCourse;
    let updateGrupalCourse = this.grupalCourseForm.value;
    if (updateGrupalCourse.classTime === null) {
      updateGrupalCourse.classTime = actualGrupalCourse.classTime;
    }

    if (updateGrupalCourse.classTime === null) {
      updateGrupalCourse.name = actualGrupalCourse.name;
    }

    if (updateGrupalCourse.description === null) {
      updateGrupalCourse.description = actualGrupalCourse.description;
    }

    if (updateGrupalCourse.urlMeet === null) {
      updateGrupalCourse.urlMeet = actualGrupalCourse.urlMeet;
    }

    if (actualGrupalCourse.name != updateGrupalCourse.name && updateGrupalCourse.name.length > 0) {
      actualGrupalCourse.name = updateGrupalCourse.name;

    } if (actualGrupalCourse.classTime != updateGrupalCourse.classTime && updateGrupalCourse.classTime.length > 0) {
      actualGrupalCourse.classTime = updateGrupalCourse.classTime;

    } if (actualGrupalCourse.description != updateGrupalCourse.description && updateGrupalCourse.description.length > 0) {
      actualGrupalCourse.description = updateGrupalCourse.description;

    } if (actualGrupalCourse.urlMeet != updateGrupalCourse.urlMeet && updateGrupalCourse.urlMeet.length > 0) {
      actualGrupalCourse.urlMeet = updateGrupalCourse.urlMeet;
    }

    this.grupalCoursesService.updateGrupalCourseInformation(actualGrupalCourse, idGrupalCourse).subscribe((resp) => {
      Swal.fire({
        title: `Actualización exitosa`,
        html: `El curso ${grupalCourse.name} ha sido actualizado con exito`,
        icon: 'success',
        confirmButtonColor: '#5cb85c',
        confirmButtonText: 'Volver a la lista de cursos grupales',
        allowOutsideClick: false
      }).then((result) => {
        if (result.value) {
          this.modalService.closeModal();
          this.updateGrupalCourses();
        }
      })
    });
  }

  updateGrupalCourses() {
    this.grupalCourseEmmiter.emit(true);
  }

}
