import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../../services/modal.service';
import Swal from 'sweetalert2';
import { courseEntity } from '../../interfaces/coursesEntity';
import { CourseService } from '../../services/course.service';
import { environment } from '../../../environments/environment';
import { TeacherService } from '../../services/teacher.service';
import { teacherEntity } from '../../interfaces/teacherEntity';

@Component({
  selector: 'app-tutoria-form-create',
  templateUrl: './tutoria-form-create.component.html',
  styleUrls: ['./tutoria-form-create.component.css']
})
export class TutoriaFormCreateComponent implements OnInit {

  @Input() tutoriaCourse: courseEntity;
  @Output() tutoriaCourseEmmiter = new EventEmitter<any>();
  @Input() idTeacherHeredado: number;
  modalTutoriaCreateForm: FormGroup;
  public selectedPicture: File;
  public environment = environment;
  public endpoint_course_image = environment.course.host_image;
  public imageNameFromService: any;
  public idTeacher: any;
  public teacherFound: teacherEntity = new teacherEntity();

  constructor(
    public modalService: ModalService,
    private formBuilder: FormBuilder,
    private tutoriaCourseService: CourseService,
    private teacherService: TeacherService
  ) { }

  get name() {
    return this.modalTutoriaCreateForm.get('name');
  }

  get description() {
    return this.modalTutoriaCreateForm.get('description');
  }

  get meetUrlCourse() {
    return this.modalTutoriaCreateForm.get('meetUrlCourse');
  }

  ngOnInit(): void {
    this.modalTutoriaCreateForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      meetUrlCourse: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]]
    });
    this.idTeacher = sessionStorage.getItem('teacherId');
    this.teacherService.getTeachersById(this.idTeacher).subscribe((resp) => {
      this.teacherFound = resp;
    });
  }

  closeModal() {
    this.modalService.closeModal();
  }

  createTutoriaCourseAndCloseModal() {
    let tutoriaCourseToCreate = this.tutoriaCourse = this.modalTutoriaCreateForm.value;
    tutoriaCourseToCreate.busy = false;
    tutoriaCourseToCreate.idTeacher = +this.idTeacherHeredado;
    tutoriaCourseToCreate.name = tutoriaCourseToCreate.name;

    this.tutoriaCourseService.createTutoriaCourse(tutoriaCourseToCreate).subscribe((resp) => {
      Swal.fire({
        title: `Creación exitosa`,
        html: `El curso ${tutoriaCourseToCreate.name} ha sido creado con exito`,
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
