import { Component, Input, OnInit, Output , EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { teacherEntity } from 'src/app/interfaces/teacherEntity';
import { ModalService } from 'src/app/services/modal.service';
import { CurrencyPipe } from '@angular/common';
import { TeacherService } from 'src/app/services/teacher.service';
import Sw from 'sweetalert2';

@Component({
  selector: 'app-update-teacher',
  templateUrl: './update-teacher.component.html',
  styleUrls: ['./update-teacher.component.css']
})
export class UpdateTeacherComponent implements OnInit {

  @Input() teacherObjectToHeredate: teacherEntity;
  @Output() teacherUpdateEmitter = new EventEmitter<any>();
  teacherForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public modalService: ModalService,
    private currencyPipe: CurrencyPipe,
    private teacherService: TeacherService) {}


  get name() {
    return this.teacherForm.get('name');
  }

  get lastName() {
    return this.teacherForm.get('lastName');
  }

  get phone() {
    return this.teacherForm.get('phone');
  }

  get description() {
    return this.teacherForm.get('description');
  }

  get hourCost() {
    return this.teacherForm.get('hourCost');
  }

  ngOnInit(): void {
    console.log("teacherObjectHeredado " , this.teacherObjectToHeredate);
    this.teacherForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      phone: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2500)]],
      hourCost: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]]
    });

    this.teacherForm.valueChanges.subscribe(form => {
      if (form.hourCost) {
        this.teacherForm.patchValue({
          hourCost: this.currencyPipe.transform(form.hourCost.replace(/\D/g, '').replace(/^0+/, ''), '', '', '1.0-0')
        }, { emitEvent: false });
      }
    });
  }

  updateTeacher() {
    this.teacherForm.patchValue({
      hourCost: this.teacherForm.value.hourCost.replace(/\,/g, '')
    }, { emitEvent: false });

    let actualTeacher = this.teacherObjectToHeredate;
    let updatedTeacher = this.teacherForm.value;

    if (updatedTeacher.name === null) {
      updatedTeacher.name = actualTeacher.name;
    }

    if (updatedTeacher.lastName === null) {
      updatedTeacher.lastName = actualTeacher.lastName;
    }

    if (updatedTeacher.phone === null) {
      updatedTeacher.phone = actualTeacher.phone;
    }

    if (updatedTeacher.description === null) {
      updatedTeacher.description = actualTeacher.description;
    }

    if (updatedTeacher.hourCost === null) {
      updatedTeacher.hourCost = actualTeacher.hourCost;
    }

    if (actualTeacher.name != updatedTeacher.name && updatedTeacher.name.length > 0) {
      actualTeacher.name = updatedTeacher.name;
    }

    if (actualTeacher.lastName != updatedTeacher.lastName && updatedTeacher.lastName.length > 0) {
      actualTeacher.lastName = updatedTeacher.lastName;
    }

    if (actualTeacher.description != updatedTeacher.description && updatedTeacher.description.length > 0) {
      actualTeacher.description = updatedTeacher.description;
    }

    if (actualTeacher.phone != updatedTeacher.phone && updatedTeacher.phone.length > 0) {
      actualTeacher.phone = updatedTeacher.phone;
    }

    if (actualTeacher.hourCost != updatedTeacher.hourCost && updatedTeacher.hourCost.length > 0) {
      actualTeacher.hourCost = updatedTeacher.hourCost;
    }

    this.teacherService.updateTeacher(this.teacherObjectToHeredate.id, actualTeacher).subscribe(resp => {
      //swet alert profesor actualizado
      console.log("profesor actualizado " , resp);
      Sw.fire({
        title: 'Datos Actualizados con exito',
        icon: 'info',
        showCancelButton: false,
        confirmButtonColor: '#17a2b8',
        cancelButtonColor: '#4d545a',
        confirmButtonText: 'Continuar',
        allowOutsideClick: false
      });
    });


    this.modalService.closeModal();
    this.eventOutput();
  }

  closeModal() {
    this.modalService.closeModal();
  }

  eventOutput() {
    this.teacherUpdateEmitter.emit(true);
  }

}
