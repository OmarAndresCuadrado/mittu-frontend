import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../../services/modal.service';
import { grupalCourseEntity } from '../../interfaces/grupalCourseEntity';
import { GrupalCoursesService } from '../../services/grupal-courses.service';
import Swal from 'sweetalert2';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-grupal-course-form-create',
  templateUrl: './grupal-course-form-create.component.html',
  styleUrls: ['./grupal-course-form-create.component.css']
})
export class GrupalCourseFormCreateComponent implements OnInit {

  @Input() grupalCourse: grupalCourseEntity;
  @Output() grupalCourseEmmiter = new EventEmitter<any>();
  @Input() idTeacherHeredado: number;
  grupalCourseForm: FormGroup;

  constructor(
    public modalService: ModalService,
    public grupalCoursesService: GrupalCoursesService,
    private formBuilder: FormBuilder,
    private currencyPipe: CurrencyPipe
  ) { }

  get name() {
    return this.grupalCourseForm.get('name');
  }

  get description() {
    return this.grupalCourseForm.get('description');
  }

  get classTime() {
    return this.grupalCourseForm.get('classTime');
  }

  get price() {
    return this.grupalCourseForm.get('price');
  }

  get urlMeet() {
    return this.grupalCourseForm.get('urlMeet');
  }

  ngOnInit(): void {
    this.grupalCourseForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      classTime: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      price: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      urlMeet: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]]
    });

    this.grupalCourseForm.valueChanges.subscribe(form => {
      if (form.price) {
        this.grupalCourseForm.patchValue({
          price: this.currencyPipe.transform(form.price.replace(/\D/g, '').replace(/^0+/, ''), '', '', '1.0-0')
        }, { emitEvent: false });
      }
    });
  }

  closeModal() {
    this.modalService.closeModal();
  }

  createGrupalCourseAndCloseModal() {
    this.grupalCourseForm.patchValue({
      price: this.grupalCourseForm.value.price.replace(/\,/g, '')
    }, { emitEvent: false });
    let grupalCourseToCreate = this.grupalCourse = this.grupalCourseForm.value;
    grupalCourseToCreate.idTeacher = this.idTeacherHeredado;
    this.grupalCoursesService.createGrupalCourse(grupalCourseToCreate).subscribe((resp) => {
      Swal.fire({
        title: `Creación exitosa`,
        html: `El curso ${grupalCourseToCreate.name} ha sido creado con exito`,
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
