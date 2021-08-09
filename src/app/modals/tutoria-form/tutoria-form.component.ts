import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../../services/modal.service';
import Swal from 'sweetalert2';
import { courseEntity } from '../../interfaces/coursesEntity';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-tutoria-form',
  templateUrl: './tutoria-form.component.html',
  styleUrls: ['./tutoria-form.component.css']
})
export class TutoriaFormComponent implements OnInit {

  @Input() tutoriaCourse: any;
  @Input() idTeacherHeredado: any;
  @Output() tutoriaCourseEmmiter = new EventEmitter<any>();
  tutoriaCreateForm: FormGroup;

  constructor(
    public modalService: ModalService,
    private formBuilder: FormBuilder,
    private tutoriaCourseService: CourseService
  ) { }

  get name() {
    return this.tutoriaCreateForm.get('name');
  }

  get description() {
    return this.tutoriaCreateForm.get('description');
  }

  get meetUrlCourse() {
    return this.tutoriaCreateForm.get('meetUrlCourse');
  }

  ngOnInit(): void {
    this.tutoriaCreateForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      meetUrlCourse: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]]
    });
  }

  closeModal() {
    this.modalService.closeModal();
  }

  updateTutoriaCourseAndCloseModal(tutoriaCourseFromParent: courseEntity, tutoriaCourseFromParentId: number) {

    let actualTutoriaCourse = this.tutoriaCourse;
    let tutoriaCourseGrupalCourse = this.tutoriaCreateForm.value;

    if (tutoriaCourseGrupalCourse.name === null) {
      tutoriaCourseGrupalCourse.name = actualTutoriaCourse.name;
    }

    if (tutoriaCourseGrupalCourse.description === null) {
      tutoriaCourseGrupalCourse.description = actualTutoriaCourse.description;
    }

    if (tutoriaCourseGrupalCourse.meetUrlCourse === null) {
      tutoriaCourseGrupalCourse.meetUrlCourse = actualTutoriaCourse.meetUrlCourse;
    }

    if (actualTutoriaCourse.name != tutoriaCourseGrupalCourse.name && tutoriaCourseGrupalCourse.name.length > 0) {
      actualTutoriaCourse.name = tutoriaCourseGrupalCourse.name;
    } 

    if (actualTutoriaCourse.description != tutoriaCourseGrupalCourse.description && tutoriaCourseGrupalCourse.description.length > 0) {
      actualTutoriaCourse.description = tutoriaCourseGrupalCourse.description;

    } if (actualTutoriaCourse.meetUrlCourse != tutoriaCourseGrupalCourse.meetUrlCourse && tutoriaCourseGrupalCourse.meetUrlCourse.length > 0) {
      actualTutoriaCourse.meetUrlCourse = tutoriaCourseGrupalCourse.meetUrlCourse;
    }

    actualTutoriaCourse.busy = false;
    actualTutoriaCourse.idTeacher = +this.idTeacherHeredado;
    this.tutoriaCourseService.updateTutoriaCourse(actualTutoriaCourse, tutoriaCourseFromParentId).subscribe((resp) => {
      Swal.fire({
        title: `Edición exitosa`,
        html: `El curso ${actualTutoriaCourse.name} ha sido actualizado con exito`,
        icon: 'success',
        confirmButtonColor: '#5cb85c',
        confirmButtonText: 'Volver a la lista de tutorias',
      }).then((result) => {
        if (result.value) {
          this.modalService.closeModal();
          this.updateTutoriaCourses();
        }
      })
    });
  }

  updateTutoriaCourses() {
    this.tutoriaCourseEmmiter.emit(true);
  }

}
