import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { grupalCourseEntity } from '../../interfaces/grupalCourseEntity';
import { GrupalCoursesService } from '../../services/grupal-courses.service';
import Sw from 'sweetalert2';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.prod';
import { AuthService } from '../../services/auth.service';
import { StudentService } from 'src/app/services/student.service';

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

  constructor(
    public modalService: ModalService,
    public studentService: StudentService,
    private grupalCourseService: GrupalCoursesService,
    private router: Router,
    public authService: AuthService    
  ) {
    this.isTutoriaAvailable = false;
   }

  ngOnInit(): void {
   this.idStudent = sessionStorage.getItem('studentId');
  }


  getStudentMoneyMethod() {
    this.studentService.getStudentMoney(this.idStudent).subscribe(resp => {
      if (resp >= +5000) {
        console.log("can have tutoria");
        this.isTutoriaAvailable = true;
      } else {
        console.log("cant have tutoria");
        this.isTutoriaAvailable = false;
      }
    })
  }

  closeModal() {
    this.modalService.closeModal();
    this.grupalCourse = null;
  }

  goToProfile(): void {
    this.router.navigate(['/student-panel']);
  }

  makeInscription() {
    this.getStudentMoneyMethod();
    if (this.isTutoriaAvailable == false) {
      Sw.fire({
        title: 'Querido estudiante, debes contar con al menos 5.000 COP en tu saldo para poder ingresar a la tutoría.',
        text: "¿Deseas recargar saldo?",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#17a2b8',
        cancelButtonColor: '#4d545a',
        confirmButtonText: 'Recargar saldo',
        cancelButtonText: 'Volver'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/student-panel']);
        }
      })
    } else {
      Sw.fire({
        'title': `Realizar inscripción`,
        'text': `¿ Desea realizar la inscripcion para el curso grupal ${this.grupalCourse.name}?`,
        'icon': `question`,
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: `Inscribirme`,
        cancelButtonText: `Cancelar`,
        confirmButtonColor: '#17a2b8',
        cancelButtonColor: '#4d545a',
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
