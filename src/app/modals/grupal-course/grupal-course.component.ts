import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { grupalCourseEntity } from '../../interfaces/grupalCourseEntity';
import { GrupalCoursesService } from '../../services/grupal-courses.service';
import Sw from 'sweetalert2';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.prod';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-grupal-course',
  templateUrl: './grupal-course.component.html',
  styleUrls: ['./grupal-course.component.css']
})
export class GrupalCourseComponent implements OnInit { 

  @Input() grupalCourse?: grupalCourseEntity;
  public endpoint_grupal_course_image = environment.grupalCourse.host_image;

  constructor(
    public modalService: ModalService,
    private grupalCourseService: GrupalCoursesService,
    private router: Router,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.modalService.closeModal();
    this.grupalCourse = null;
  }

  goToProfile():void {
    this.router.navigate(['/student-panel']);
  }

  makeInscription() {
    Sw.fire({
      'title': `Realizar inscripción`,
      'text': `¿ Desea realizar la inscripcion para el curso grupal ${this.grupalCourse.name}?`,
      'icon': `question`,
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: `Inscribirme`,
      cancelButtonText: `Cancelar`,
      confirmButtonColor: '#10d10d',
      cancelButtonColor: '#e3a807',
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
        }, (err) =>  {
          Sw.fire('Inscripción invalida', `Ya te encuentras inscrito al curso grupal ${this.grupalCourse.name}`, 'warning')
      });
      }
    });
  }
  
}
