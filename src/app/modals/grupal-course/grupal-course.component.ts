import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { grupalCourseEntity } from '../../interfaces/grupalCourseEntity';
import { GrupalCoursesService } from '../../services/grupal-courses.service';
import Sw from 'sweetalert2';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.prod';
import { AuthService } from '../../services/auth.service';
import { StudentService } from 'src/app/services/student.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-grupal-course',
  templateUrl: './grupal-course.component.html',
  styleUrls: ['./grupal-course.component.css']
})
export class GrupalCourseComponent implements OnInit {

  @Input() grupalCourse?: grupalCourseEntity;
  public endpoint_grupal_course_image = environment.grupalCourse.host_image;
  public isTutoriaAvailable: boolean;
  public idStudent: any;
  public studentMoney: any;

  constructor(
    public modalService: ModalService,
    public studentService: StudentService,
    private grupalCourseService: GrupalCoursesService,
    private router: Router,
    public authService: AuthService,
    private currencyPipe: CurrencyPipe
  ) {
    this.isTutoriaAvailable = false;
  }

  ngOnInit(): void {
    this.idStudent = sessionStorage.getItem('studentId');
    this.getStudentMoneyMethod();
  }

  getStudentMoneyMethod() {
    this.studentService.getStudentMoney(this.idStudent).subscribe(resp => {
      this.studentMoney = resp;
      console.log("dinero actual del estudiante ", this.studentMoney);
    });
  }

  closeModal() {
    this.modalService.closeModal();
    this.grupalCourse = null;
  }

  goToProfile(): void {
    this.router.navigate(['/student-panel']);
  }

  makeInscription() {
    console.log("validacion del dinero de inscripcion dinero estudiante", this.studentMoney , "costo del curso grupal " ,  this.grupalCourse.price);
    console.log("validacion" , this.studentMoney == this.grupalCourse.price);
    let diplsayCourseValueString = this.grupalCourse.price.toString();
    let diplsayCourseValue = this.currencyPipe.transform(diplsayCourseValueString.replace(/\D/g, '').replace(/^0+/, ''), '', '', '1.0-0')
    if (this.studentMoney < this.grupalCourse.price) {
      Sw.fire({
        title: `Querido estudiante, debes contar con ${diplsayCourseValue} COP en tu saldo para poder inscribir el curso grupal.`,
        text: "¿Deseas recargar saldo?",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#17a2b8',
        cancelButtonColor: '#4d545a',
        confirmButtonText: 'Recargar saldo',
        cancelButtonText: 'Volver',
        allowOutsideClick: false
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/student-panel']);
        }
      })
    } else {
      Sw.fire({
        'title': `Realizar inscripción`,
        'html': `¿ Desea realizar la inscripcion para el curso grupal ${this.grupalCourse.name}? Nota: al realizar la inscripción se descontaran <b>${diplsayCourseValue}.00 COP </b> de tu cuenta`,
        'icon': `question`,
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: `Inscribirme`,
        cancelButtonText: `Cancelar`,
        confirmButtonColor: '#17a2b8',
        cancelButtonColor: '#4d545a',
        allowOutsideClick: false
      }).then((result) => {
        if (result.isConfirmed) {
          let studentId = sessionStorage.getItem('studentId');
          let courseId = this.grupalCourse.id;
          let data = {
            "courseId": courseId,
            "studentId": studentId
          }
          this.grupalCourseService.makeInscriptionToGrupalCourse(data).subscribe(resp => {
            if (resp === null || resp === 'null') {
              Sw.fire('Inscripcion realizada', `Te has inscrito al curso ${this.grupalCourse.name}, ahora puedes ver tu nuevo curso inscrito en tu perfil de usuario`, 'success')
              // this.modalService.closeModal();
            }
          }, (err) => {
            Sw.fire('Inscripción invalida', `Ya te encuentras inscrito al curso grupal ${this.grupalCourse.name}`, 'warning')
          });
        }
      });
    }
  }

}
