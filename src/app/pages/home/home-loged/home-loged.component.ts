import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../../services/web-socket.service';
import { Client } from '@stomp/stompjs';
import { environment } from '../../../../environments/environment.prod';
import { interval } from 'rxjs';
import Sw, { SweetAlertIcon } from 'sweetalert2';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { courseEntity } from '../../../interfaces/coursesEntity';
import { CourseService } from '../../../services/course.service';
import { GrupalCoursesService } from '../../../services/grupal-courses.service';
import { grupalCourseEntity } from '../../../interfaces/grupalCourseEntity';
import { ModalService } from '../../../services/modal.service';
import { Mensaje } from '../../../interfaces/Mensaje';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';
import { TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FeedBackService } from 'src/app/services/feed-back.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { StudentService } from 'src/app/services/student.service';
import { TransactionService } from 'src/app/services/transaction.service';


@Component({
  selector: 'app-home-loged',
  templateUrl: './home-loged.component.html',
  styleUrls: ['./home-loged.component.css']
})
export class HomeLogedComponent implements OnInit {

  private client: Client;
  private responseTopicTeacherSocket: any;
  private publis_topic_endpoint = '/app/teacher/socket';
  private timer_channel_send = '/app/teacher/student/timer';
  private timer_channel_subscribe = '/topic/teacher/student/timer';
  private endpoint_socket: string = environment.webSocket.host;
  public reponseFromTopicSocketTeacher: any;
  public array: any[] = [];
  public mensaje: any;
  public coursesToShow: any[] = [];
  public idStudent: any;
  public idTeacher: any;
  public groupCourses: any[] = [];
  public favoritOne: any[] = [];
  public favoritTwo: any[] = [];
  public favoritThree: any[] = [];
  public coursesFonundSearch: courseEntity[] = [];
  public coursesFonundGrupal: grupalCourseEntity[] = [];
  public grupalCourseSelected: grupalCourseEntity;
  public optionOneSelected: boolean = false;
  public optionTwoSelected: boolean = false;
  public chatModalOpen: boolean = false;
  public urlMeetSelected: any;
  public environment = environment;
  public endpoint_course_image = environment.course.host_image;
  public endpoint_grupal_course_image = environment.grupalCourse.host_image;
  public socketClient: any;
  private socket_teacher_notification_chanel: any = '/topic/notification/chanel/teacher';
  private publish_socket_teacher_notification_chanel: any = '/app/notification/chanel/teacher';
  public timeOnSession: any;
  public studentTime: any;
  public seconds: number;
  public minutes: number;
  public totalTime: any;
  public breakLopp: boolean;
  public counter: number;
  public counterTwo: number;
  public isTrue: boolean;
  public showPartOne: boolean;
  public showPartTwo: boolean;
  public showPartThree: boolean;
  public showStartButton: boolean;
  public showStopButton: boolean;
  public studentMinutes: number;
  public showTeacherInfo: boolean;
  public idTeacherSelected: any;
  public feedback: any;
  public radioOne: any;
  public isCheckedOne = false;
  public isCheckedTwo = false;
  public isCheckedThree = false;
  public isCheckedFour = false;
  public isCheckedFive = false;
  public finalCalification: number;
  public isTutoriaAvailable: boolean;
  public bannerTransfer: any;
  public endpoint_image_upload = environment.transfers.host_image;
  public bannerColor: any;


  @ViewChild('editModalHome') editModalHome: TemplateRef<any>; // Note: TemplateRef

  constructor(
    private webSocketService: WebSocketService,
    private router: Router,
    private courseService: CourseService,
    private grupalService: GrupalCoursesService,
    private modalService: ModalService,
    public authService: AuthService,
    private boostrapModalService: NgbModal,
    private feedBackService: FeedBackService,
    private teacherService: TeacherService,
    private studentService: StudentService,
    private transferService: TransactionService
  ) {
    this.timeOnSession = 0;
    this.studentTime = 0;
    this.counter = 0;
    this.seconds = 0;
    this.minutes = 0;
    this.isTrue = false;
    this.showPartOne = true;
    this.showPartTwo = false;
    this.showPartThree = false;
    this.counterTwo = 0;
    this.showTeacherInfo = false;
    this.isTutoriaAvailable = false;
  }

  autoComplete = new FormControl();
  autoCompleteGrupalCourses = new FormControl();
  filteredOptions: Observable<courseEntity[]>;
  filteredOptionsGrupalCourses: Observable<grupalCourseEntity[]>;


  //buscar una mejor forma para observar los cambios
  ngOnInit(): void {
    let roleUser = JSON.parse(sessionStorage.getItem('user'));
    this.transferService.getBannerInformation(1).subscribe(async resp => {
      await this.showBanner(resp);
    });
    this.idStudent = sessionStorage.getItem('studentId');
    this.filteredOptions = this.autoComplete.valueChanges
      .pipe(
        map(value => typeof value === 'string' ? value : value.name),
        flatMap(value => value ? this._filter(value) : [])
      );

    this.filteredOptionsGrupalCourses = this.autoCompleteGrupalCourses.valueChanges
      .pipe(
        map(value => typeof value === 'string' ? value : value.name),
        flatMap(value => value ? this._filterGrupalCourse(value) : [])
      );

    if (roleUser != null || roleUser != undefined) {
      if (roleUser.roles[0] != "ROLE_TEACHER") {
        this.getStudentMoneyMethod();
      }
    }
  }

  showBanner(resp: any) {
    this.bannerTransfer = resp;
    this.bannerColor = `${this.bannerTransfer.colorBanner}`;
  }

  getStudentMoneyMethod() {
    this.studentService.getStudentMoney(this.idStudent).subscribe(resp => {
      if (resp >= +5000) {
        this.isTutoriaAvailable = true;
      } else {
        this.isTutoriaAvailable = false;
      }
    })
  }

  private _filter(value: string): Observable<courseEntity[]> {
    const filterValue = value.toLowerCase();
    this.courseService.getCourseFiltredByNameAndBusy(filterValue)
      .subscribe(resp => {
        this.coursesFonundSearch = resp;
      });
    return this.courseService.getCourseFiltredByNameAndBusy(filterValue);
  }

  private _filterGrupalCourse(value: string): Observable<grupalCourseEntity[]> {
    const filterValue = value.toLowerCase();
    this.grupalService.getCourseFiltredByName(filterValue)
      .subscribe(resp => {
        this.coursesFonundGrupal = resp;
      });
    return this.grupalService.getCourseFiltredByName(filterValue);
  }

  showName(course?: courseEntity): string | undefined {
    return course ? course.name : undefined
  }

  showNameTwo(grupalCourse?: grupalCourseEntity): string | undefined {
    return grupalCourse ? grupalCourse.name : undefined
  }


  sendEventToAgent(endpoint: any, payload: any, extra?: any) {
    if (extra) {
      let generalObject: any = {
        id: 0,
        idStudent: payload.idStudent,
        onChat: payload.onChat,
        tipo: extra.tipo
      };
      this.socketClient.publish({
        destination: endpoint,
        body: JSON.stringify(generalObject)
      });
    } else {
      this.socketClient.publish({
        destination: endpoint,
        body: JSON.stringify(payload)
      });
    }
  }

  sendInitialMessageToPrivateNotificationChannel() {
    let quemado = this.idTeacher;
    let bodyNotification: any = {
      mensaje: 'ASKING_FOR_MEETING'
    }
    this.sendEventToAgent(`${this.publish_socket_teacher_notification_chanel}/${quemado}`, bodyNotification)
    this.waitingForAnswer();
  }

  waitingForAnswer() {
    Swal.fire({
      title: 'Se ha enviado la notifcación al profesor',
      text: "Esperando respuesta del profesor",
      icon: 'success',
      showCancelButton: true,
      showConfirmButton: false,
      confirmButtonColor: '#17a2b8',
      cancelButtonColor: '#4d545a',
      confirmButtonText: 'Cancelar notificación de tutoria',
      cancelButtonText: 'Cancelar notificación de tutoria',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isDismissed) {
        let quemado = this.idTeacher;
        let bodyNotification: any = {
          mensaje: 'ESTUDENT_DENY'
        }
        this.sendEventToAgent(`${this.publish_socket_teacher_notification_chanel}/${quemado}`, bodyNotification)
      }
    })
  }

  subscrieToNotificationTeacherChanel(idTeacher: any) {
    let endpointToNotificationChanel = `${this.socket_teacher_notification_chanel}/${idTeacher}`;
    this.socketClient.subscribe(endpointToNotificationChanel, e => {
      let responseFromAgent = JSON.parse(e.body);
      if (responseFromAgent.body.mensaje == 'ANSWER_TEACHER_ACCEPT') {
        this.swalMessageMeetingAcepted();
      }
      if (responseFromAgent.body == 'ANSWER_TEACHER_DENY') {
        this.swalMessageMeetingDeny();
      }
    });
  }

  swalMessageMeetingAcepted() {
    this.desconectar(this.idTeacher);
    Swal.fire({
      title: 'El profesor ha aceptado la solicitud',
      text: "Ya puedes ir a tu tutoria",
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: '#17a2b8',
      cancelButtonColor: '#4d545a',
      confirmButtonText: 'ir a la tutoria',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.goToMeetUrl();
        this.sendPositiveAnswerToChannel();
        this.webSocketService.desconnectFromSocket();
        this.socketClient.deactivate();
        setTimeout(() => {
          this.webSocketService.connectToSocket();
        }, 2000)
        setTimeout(() => {
          this.subscribeToTimerTeacherStudent(this.idTeacher, this.idStudent);
        }, 5000)

      }
    })
  }

  conectar() {
    let bodyToEnableTeacherAndCourses: any = {
      idTeacher: this.idTeacher,
      mensaje: 'ENABLE_TEACHER'
    }
    setTimeout(() => {
      this.webSocketService.sendEventToAgent(this.publis_topic_endpoint, bodyToEnableTeacherAndCourses)
    }, 2000);
  }

  swalMessageMeetingDeny() {
    this.webSocketService.desconnectFromSocket();
    this.socketClient.deactivate();
    setTimeout(() => {
      this.webSocketService.connectToSocket();
    }, 2000)
    Swal.fire({
      title: 'Se ha rechazado la solicitud para la tutoria',
      icon: 'info',
      showCancelButton: false,
      confirmButtonColor: '#17a2b8',
      cancelButtonColor: '#4d545a',
      confirmButtonText: 'Aceptar',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        setTimeout(() => {
          this.webSocketService.connectToSocket();
        }, 2000)
      }
    })
  }

  getNewData() {
    setTimeout(() => {
      this.array = this.webSocketService.getResponse();
      const arrayFilter = this.array.filter(course => course.busy == false)
      this.coursesToShow = arrayFilter;
    }, 2000);
  }

  guardarMensaje(mensaje: any) {
    this.mensaje = mensaje;
  }

  createSessionChat(idTeacherArgument: any, teacherName: any, urlMeet: any) {
    this.idTeacher = idTeacherArgument;
    setTimeout(() => {
      this.desconectar(this.idTeacher);
    }, 2000);
    this.modalService.openModal();
    this.chatModalOpen = true;
    this.urlMeetSelected = urlMeet;
    let quemado = this.idTeacher;
    setTimeout(() => {
      this.socketClient = this.webSocketService.socketInitialConnection();
    }, 2000);

    if (this.isTutoriaAvailable == true) {
      Swal.fire({
        title: '¿ Deseas enviar una notificación para realizar una tutoría ?',
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#17a2b8',
        cancelButtonColor: '#4d545a',
        confirmButtonText: 'Enviar notificacíon',
        cancelButtonText: 'Cancelar',
        allowOutsideClick: false
      }).then((result) => {
        if (result.isConfirmed) {
          setTimeout(() => {
            this.subscrieToNotificationTeacherChanel(quemado);
          }, 2000)

          setTimeout(() => {
            this.sendInitialMessageToPrivateNotificationChannel();
          }, 2000)
        } if (result.isDismissed) {
          this.conectar();
        }
      })
    } else {
      Swal.fire({
        title: 'Querido estudiante, debes contar con al menos 5.000 COP en tu saldo para poder ingresar a la tutoría.',
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
          this.conectar();
        }
        if (result.isDismissed) {
          this.conectar();
        }
      })
    }


  }

  desconectar(idTeacher) {
    let bodyToDisableTeacherAndCourses: any = {
      idTeacher: idTeacher,
      mensaje: 'DISABLE_TEACHER'
    }
    setTimeout(() => {
      this.webSocketService.sendEventToAgent(this.publis_topic_endpoint, bodyToDisableTeacherAndCourses)
    }, 2000);
  }

  goToMeetUrl() {
    window.open(this.urlMeetSelected, '_blank');
  }

  goToDetailGroup(grupalCourse: grupalCourseEntity) {
    this.grupalCourseSelected = grupalCourse;
    this.modalService.openModal();
  }

  optionOneMethod() {
    this.optionOneSelected = true;
    this.optionTwoSelected = false;
  }

  optionTwoMethod() {
    this.optionOneSelected = false;
    this.optionTwoSelected = true;
  }

  sendPositiveAnswerToChannel() {
    let bodyNotification: any = {
      mensaje: 'TEACHER_ACCEPT',
      idStudent: this.idStudent,
      idTeacher: this.idTeacher,
      urlMeetOnQueue: this.urlMeetSelected
    }
    this.sendEventToAgent(`${this.publish_socket_teacher_notification_chanel}/${this.idTeacher}`, bodyNotification)
  }

  // TIMER SECTION

  subscribeToTimerTeacherStudent(idTeacher: any, idStudent: any) {
    let endpointToTimmerChanel = `${this.timer_channel_subscribe}/${idTeacher}/${idStudent}`;

    this.socketClient.subscribe(endpointToTimmerChanel, e => {
      let responseFromAgent = JSON.parse(e.body);


      if (responseFromAgent.body.message == 'ANSWER_INITAL_TIMER_CONNECTION_STUDENT') {
        this.waitingToStarTimer();
      }

      if (responseFromAgent.body.message == 'ANSWER_TIMER_START') {
        this.onClass();
      }

      if (responseFromAgent.body.message == 'ANSWER_TIMER_STOP') {
        // this.timeOnSession;
        // this.studentTime;
        this.showPartOne = false;
        this.showPartTwo = true;
        this.breakLopp = false;
      }

    });

    setTimeout(() => {
      this.initialMessageOnTimerConnection(idTeacher, idStudent);
    }, 3000);
  }


  waitingToStarTimer() {
    Swal.fire('Clase iniciada con exito', 'en breve el profesor iniciara un cronometro para la clase', 'question');
  }

  onClass() {
    this.startTimer();
    this.openModalTimer();

  }


  initialMessageOnTimerConnection(idTeacher: any, idStudent: any) {
    let body: any = {
      message: 'INITAL_TIMER_CONNECTION_STUDENT'
    }
    setTimeout(() => {
      ;
      this.webSocketService.sendEventToAgent(`${this.timer_channel_send}/${idTeacher}/${idStudent}`, body)
    }, 2000);
  }


  openModalTimer() {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    this.boostrapModalService.open(this.editModalHome, ngbModalOptions);
  }

  startTimmer() {
    setTimeout(() => {
      this.counter++;;
      if (this.counter < 400 && this.breakLopp) {
        this.minutes = this.counter;
        this.startTimmer();
      }
    }, 60000)
  }

  startTimmerSeconds() {
    setTimeout(() => {
      this.counterTwo++;
      if (this.counterTwo <= 60 && this.breakLopp) {
        this.seconds = this.counterTwo;
        if (this.counterTwo == 60) {
          this.counterTwo = 0;
        }
        this.startTimmerSeconds();
      }
    }, 1000)
  }
  //

  startTimer() {
    this.counter = 0;
    this.counterTwo = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.showPartOne = true;
    this.breakLopp = true;
    this.startTimmer();
    this.startTimmerSeconds();
  }

  openTeacherInformation(teacherId: any) {
    this.showTeacherInfo = true;
    this.modalService.openModal();
    this.idTeacherSelected = teacherId;
  }

  openFeedBack() {
    this.showPartOne = false;
    this.showPartTwo = false;
    this.showPartThree = true;
  }

  defaultEvents() {
    this.showPartOne = true;
    this.showPartTwo = false;
    this.showStartButton = true;
    this.counter = 0;
    this.counterTwo = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.showPartThree = false;
    this.isCheckedOne = false;
    this.isCheckedTwo = false;
    this.isCheckedThree = false;
    this.isCheckedFour = false;
    this.isCheckedFive = false;
    this.finalCalification = 0;
    this.breakLopp = false;
    this.feedback = "";
  }


  sentCalification() {
    let calification;
    let studentCount;
    let studenName;
    let TeacherName;

    this.teacherService.getTeachersById(this.idTeacher).subscribe(resp => {
      TeacherName = `${resp.name} ${resp.lastName}`;
    });

    this.studentService.getStudentsById(this.idStudent).subscribe(resp => {
      studenName = `${resp.name} ${resp.lastName}`;
    });

    setTimeout(() => {
      let objectToSendFinal: any = {
        "studentId": this.idStudent,
        "studentName": studenName,
        "teacherId": this.idTeacher,
        "teacherName": TeacherName,
        "calification": this.finalCalification,
        "feedBack": this.feedback
      }
      this.feedBackService.createFeedBack(objectToSendFinal).subscribe(resp => {
        resp;
      });
    }, 2000);


    setTimeout(() => {
      this.feedBackService.getCalification(this.idTeacher).subscribe(resp => {
        calification = resp;
      });

      this.feedBackService.getTeacherCalificationStudents(this.idTeacher).subscribe(resp => {
        studentCount = resp;
      });
    }, 2000);

    setTimeout(() => {
      let object: any = {
        "califaction": calification,
        "studentCount": studentCount,
        "teacherId": this.idTeacher
      }

      this.feedBackService.updateTeacherCalification(object).subscribe(resp => {
        resp;
      })
      this.modalService.closeModal();
    }, 3000);

    Swal.fire({
      title: 'Operación exitosa',
      text: "Se ha enviado la calificación",
      icon: 'success',
      showConfirmButton: true,
      confirmButtonColor: '#17a2b8',
      confirmButtonText: 'Continuar',
      allowOutsideClick: false
    })

    setTimeout(() => {
      this.defaultEvents();
    }, 6000);
  }

  startOne() {
    this.isCheckedOne = true;
    this.isCheckedTwo = false;
    this.isCheckedThree = false;
    this.isCheckedFour = false;
    this.isCheckedFive = false;
    this.finalCalification = 1;
  }

  startTwo() {
    this.isCheckedOne = true;
    this.isCheckedTwo = true;
    this.isCheckedThree = false;
    this.isCheckedFour = false;
    this.isCheckedFive = false;
    this.finalCalification = 2;
  }

  startThree() {
    this.isCheckedOne = true;
    this.isCheckedTwo = true;
    this.isCheckedThree = true;
    this.isCheckedFour = false;
    this.isCheckedFive = false;
    this.finalCalification = 3;
  }

  startFour() {
    this.isCheckedOne = true;
    this.isCheckedTwo = true;
    this.isCheckedThree = true;
    this.isCheckedFour = true;
    this.isCheckedFive = false;
    this.finalCalification = 4;
  }

  startFive() {
    this.isCheckedOne = true;
    this.isCheckedTwo = true;
    this.isCheckedThree = true;
    this.isCheckedFour = true;
    this.isCheckedFive = true;
    this.finalCalification = 5;
  }

}
