import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { WebSocketService } from '../../../services/web-socket.service';
import { TeacherService } from '../../../services/teacher.service';
import { teacherEntity } from '../../../interfaces/teacherEntity';
import { CourseService } from '../../../services/course.service';
import { courseEntity } from '../../../interfaces/coursesEntity';
import Sw from 'sweetalert2';
import { Router } from '@angular/router';
import { GrupalCoursesService } from '../../../services/grupal-courses.service';
import { grupalCourseEntity } from '../../../interfaces/grupalCourseEntity';
import { ModalService } from '../../../services/modal.service';
import Swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';
import { TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import webNotification from 'simple-web-notification';
import { async } from 'rxjs/internal/scheduler/async';
import { RetirementsService } from 'src/app/services/retirements.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
  displayedColumns: string[] = ['Fecha', 'Estado', 'Cantidad retirada'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumnsTwo: string[] = ['FechaDeLaTutoria', 'DuracionDeLaTutoria', 'NombreDelEstudiante', 'PagoRealizadoPorLaTutoria'];
  dataSourceTwo: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginatorTwo: MatPaginator;
  @ViewChild(MatSort) sortTwo: MatSort;


  public conected: boolean
  public idTeacher: any;
  private publis_topic_endpoint = '/app/teacher/socket';
  private publis_topic_endpoint_verify_state_of_chat = '/app/teacher/state/chat';
  private publis_topic_endpoint_private_teacher_chanel = '/app/private/chanel/teacher';
  public teacherName: any;
  public teacherFound: teacherEntity = new teacherEntity();
  public teacherCourses: courseEntity[] = [];
  public chatOnQueue: any;
  public idStudent: any;
  public lastStateOfChat: boolean;
  public stateOfChat: boolean;
  public grupalCourses: grupalCourseEntity[];
  public watchStudents: boolean;
  public onPersonalCourse: boolean;
  public onGrupalCourse: boolean;
  public onTransactions: boolean;
  public grupalCourseSelected: grupalCourseEntity;
  public grupalCourseSelectedToModify: grupalCourseEntity;
  public informationForPrivateChat: any;
  public onChat: boolean = false;
  public algo: boolean = false;
  public tutoriaCourseSelectedToModify: any;
  public totalStudents: any;
  public environment = environment;
  public endpoint_course_image = environment.course.host_image;
  public endpoint_grupal_course_image = environment.grupalCourse.host_image;
  public endpoint_teacher_image = environment.teacher.host_image;
  public idImageToUpload: any;
  public idGruaplImageToUpload: any;
  public teacherImage: any;
  public idTeacherImageToUpload: any;
  public socketClient: any;
  private socket_teacher_notification_chanel: any = '/topic/notification/chanel/teacher'
  private publish_socket_teacher_notification_chanel: any = '/app/notification/chanel/teacher'
  public globalUrlMeet: any;
  private timer_channel_send = '/app/teacher/student/timer';
  private timer_channel_subscribe = '/topic/teacher/student/timer';
  public timeOnSession: any;
  public studentTime: any;
  public showStart: any;
  public globalTeacherId: any;
  public globalStudentId: any;
  public teacherTime: any;
  public timerResponse: any;
  public secondss: number;
  public minutess: number;
  public totalTime: any;
  public breakLopp: boolean;
  public counter: number;
  public counterTwo: number;
  public isTrue: boolean;
  public showPartOne: boolean;
  public showPartTwo: boolean;
  public showStartButton: boolean;
  public showStopButton: boolean;
  public studentMinutes: number;
  public globalIdTeacher: any;
  public gloablIdStudent: any;
  public teacherFoundToUpdate: teacherEntity;
  public onShowTutoriasDetails;
  public bankDetails: any;
  public sentTransaction: boolean;

  @ViewChild('editModal') editModal: TemplateRef<any>;
  @ViewChild('bankModal') bankModal: TemplateRef<any>;
  bankDetailsForm: FormGroup;

  constructor(
    private authService: AuthService,
    private webSocketService: WebSocketService,
    private teacherService: TeacherService,
    private courseService: CourseService,
    private grupalCourseService: GrupalCoursesService,
    private router: Router,
    private modalService: ModalService,
    private boostrapModalService: NgbModal,
    private retirementService: RetirementsService,
    private formBuilder: FormBuilder
  ) {
    this.grupalCourses = [];
    this.watchStudents = false;
    this.onPersonalCourse = false;
    this.onGrupalCourse = false;
    this.onTransactions = false;
    this.globalUrlMeet = '';
    this.showStart = true;
    this.showPartOne = true;
    this.showPartTwo = false;
    this.counter = 0;
    this.breakLopp = true;
    this.counterTwo = 0;
    this.minutess = 0;
    this.secondss = 0;
    this.showStartButton = true;
    this.showStopButton = true;
    this.studentMinutes = 20;
    this.onShowTutoriasDetails = true;
  }

  get bankInformation() {
    return this.bankDetailsForm.get('bankInformation');
  }

  ngOnInit(): void {
    this.idTeacher = sessionStorage.getItem('teacherId');
    this.teacherService.getTeachersById(this.idTeacher).subscribe((resp) => {
      this.teacherFound = resp;
      if (this.teacherFound.picture === null || this.teacherFound.picture === "null" || this.teacherFound.picture === "") {
        this.teacherFound.picture = "default.png";
      }
      this.conected = this.teacherFound.busy;
    });
    this.getTicherTime();

    setTimeout(() => {
      this.getListOfRetirements();
    }, 1000);

    this.getCourses();
    // hacer filtros para traer los cursos que pertenecen al profesor no mas no todos
    this.getAllGrupalCourses();
    setTimeout(() => {
      this.getTeahcerImage();
    }, 1000)
    // setTimeout(() => {
    //   // const source = interval(1000);
    //   // source.subscribe(() => this.getState());
    //   this.getState();
    // }, 1000);


    setTimeout(() => {
      let objetoToPrivateChanel: any = {
        idStudent: this.idStudent,
        onChat: false
      }
      this.webSocketService.sendEventToAgent(`${this.publis_topic_endpoint_private_teacher_chanel}/${this.idTeacher}`, objetoToPrivateChanel);
    }, 2000)

    setTimeout(() => {
      this.socketClient = this.webSocketService.socketInitialConnection();
    }, 2000);

    setTimeout(() => {
      this.subscrieToNotificationTeacherChanel(this.idTeacher);
    }, 3000)

    setTimeout(() => {
      this.sendInitialMessageToPrivateNotificationChannel();
    }, 3000)

    this.getDetailsOfTutorias();
    this.bankDetailsForm = this.formBuilder.group({
      bankInformation: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]]
    });
  }

  ngAfterViewInit() {

  }

  applyFilterTwo(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceTwo.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceTwo.paginator) {
      this.dataSourceTwo.paginator.firstPage();
    }
  }

  getListOfRetirements() {
    this.teacherService.getTeachersById(this.idTeacher).subscribe(async resp => {
      await this.setRetirements(resp);
    });

  }

  setRetirements(resp: any) {
    this.teacherFound = resp;
    this.dataSource = new MatTableDataSource(this.teacherFound.retirements);
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 1000);
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

  getTicherTime() {
    this.teacherService.getTeacherTime(this.idTeacher).subscribe((resp) => {
      this.teacherTime = resp;
    });
  }

  sendInitialMessageToPrivateNotificationChannel() {
    let bodyNotification: any = {
      mensaje: 'INITIAL_CONNECTION_NOTIFICATION_CHANEL'
    }
    this.sendEventToAgent(`${this.publish_socket_teacher_notification_chanel}/${this.idTeacher}`, bodyNotification)
  }

  sendPositiveAnswerToChannel() {
    let bodyNotification: any = {
      mensaje: 'TEACHER_ACCEPT'
    }
    this.sendEventToAgent(`${this.publish_socket_teacher_notification_chanel}/${this.idTeacher}`, bodyNotification)
  }

  sendNegativeAnswerToChannel() {
    let bodyNotification: any = {
      mensaje: 'TEACHER_DENY'
    }
    this.sendEventToAgent(`${this.publish_socket_teacher_notification_chanel}/${this.idTeacher}`, bodyNotification)
  }


  subscrieToNotificationTeacherChanel(idTeacher: any) {
    let endpointToNotificationChanel = `${this.socket_teacher_notification_chanel}/${idTeacher}`;
    this.socketClient.subscribe(endpointToNotificationChanel, e => {
      let responseFromAgent: any = JSON.parse(e.body);
      if (responseFromAgent.body == 'ANSWER_ASKING_FOR_MEETING') {
        this.showSweetAlertForSession();
      }
      if (responseFromAgent.body == 'ANSWER_ESTUDENT_DENY') {
        this.conectar();
        Swal.close();
        setTimeout(() => {
          this.showAlertOfCancel();
        }, 1000);
      }
      if (responseFromAgent.body.mensaje == 'ANSWER_TEACHER_ACCEPT') {
        setTimeout(() => {
          let idTeacher = responseFromAgent.body.idTeacher;
          let idStudent = responseFromAgent.body.idStudent;
          this.subscribeToTimerTeacherStudent(idTeacher, idStudent);
        }, 5000)
        this.globalUrlMeet = responseFromAgent.body.urlMeetOnQueue;
      }
    });
  }

  // cuando se ejecuta este evento crear otro socket para el tema del cronometro
  // el profesor podra parar dicho cronometro cuando la clase finalice

  showAlertOfCancel() {
    Swal.fire('Tutoría cancelada', 'El estudiante a cancelado la solicitud de la tutoría', 'info');
  }

  showSweetAlertForSession() {
    this.conected = true;
    this.playSound();
    this.notificationPopUp();
    Swal.fire({
      title: 'Tienes una solicitud para una tutoria',
      text: '¿ Aceptar solicitud e ir a reunion ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#17a2b8',
      cancelButtonColor: '#4d545a',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Rechazar',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.sendPositiveAnswerToChannel();
        setTimeout(() => {
          this.goToMeetUrl();
        }, 10000);
      }
      if (result.isDismissed) {
        this.sendNegativeAnswerToChannel();
      }
    })
  }

  notificationPopUp() {
    webNotification.showNotification('', {
      body: 'mittu - Nueva solicitud de tutoría',
      icon: '../../../../assets/images/mittu.png',
      autoClose: 15000
    });
  }



  conectar() {
    this.conected = false;
    this.webSocketService.connectToSocket();
    let bodyToEnableTeacherAndCourses: any = {
      idTeacher: this.idTeacher,
      mensaje: 'ENABLE_TEACHER'
    }
    setTimeout(() => {
      this.webSocketService.sendEventToAgent(this.publis_topic_endpoint, bodyToEnableTeacherAndCourses)
    }, 1000);
  }

  desconectar() {
    this.conected = true;
    let bodyToDisableTeacherAndCourses: any = {
      idTeacher: this.idTeacher,
      mensaje: 'DISABLE_TEACHER'
    }
    setTimeout(() => {
      this.webSocketService.sendEventToAgent(this.publis_topic_endpoint, bodyToDisableTeacherAndCourses)
    }, 1000);
  }
  getCourses() {
    this.courseService.getAllCourseFromTeacher(this.idTeacher).subscribe((resp) => {
      this.teacherCourses = resp;
    });
  }

  // getState() {
  //   let bodyToverifyState: any = this.idTeacher;
  //   this.webSocketService.sendEventToAgent(`${this.publis_topic_endpoint_verify_state}/${this.idTeacher}`, bodyToverifyState);
  //   this.conected = this.webSocketService.getStateOfTeacher();
  // }


  // como sacar el ID para que funcione por el momento esta quemado para desactivar el sweet Alert
  getStateOfChat() {
    let bodyToverifyState: any = 'state_of_chat';
    this.webSocketService.sendEventToAgent(`${this.publis_topic_endpoint_verify_state_of_chat}/${this.idTeacher}`, bodyToverifyState);
    this.stateOfChat = this.webSocketService.getStateOfTeacherChat();
    this.idStudent = this.webSocketService.getIdStudent();
    this.sweetAlertConfirmationChat();
  }

  sweetAlertConfirmationChat() {
    if (this.stateOfChat) {
      Sw.fire({
        'title': `Chat pendiente`,
        'text': `Deseas unirte al chat`,
        'icon': `question`,
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: `Unirme`,
        cancelButtonText: `Rechazar`,
        confirmButtonColor: '#17a2b8',
        cancelButtonColor: '#4d545a',
        allowOutsideClick: false
      }).then((result) => {
        if (result.isConfirmed) {
          this.modalService.openModal();
          this.informationForPrivateChat = {
            idTeacher: this.idTeacher,
            idStudent: '1' //HACER DINAMICO
          }
        }
        if (result.isDismissed) {
          let endpoint_topic_private_chat = `/app/teacher/state/chat/${this.idTeacher}/3`;
          let payload: any = false;
          this.webSocketService.sendEventToAgent(endpoint_topic_private_chat, payload);
        }
      });
    }
  }

  getAllGrupalCourses() {
    this.grupalCourseService.getAllGrupalCourses().subscribe((grupalCourses) => {
      const filterCoursesByTeacherId = grupalCourses.filter(object => (object.idTeacher === +this.idTeacher));
      this.grupalCourses = filterCoursesByTeacherId;
      let cantidadDeEstudiantes = 0;
      let cantidadDeEstuiantesTotal = 0;
      this.grupalCourses.forEach((element) => {
        cantidadDeEstuiantesTotal = element.studentes.length + cantidadDeEstuiantesTotal;
      });
      this.totalStudents = cantidadDeEstuiantesTotal;
    });
  }

  watchStudentsMethod() {
    this.watchStudents = true;
  }

  HiddeStudentMethod() {
    this.watchStudents = false;
  }

  showTutoriaDetails() {
    this.onPersonalCourse = false;
    this.onGrupalCourse = false;
    this.onTransactions = false;
    this.onShowTutoriasDetails = true;
    this.getDetailsOfTutorias();
  }

  showPersonalCourses() {
    this.onPersonalCourse = true;
    this.onGrupalCourse = false;
    this.onTransactions = false;
    this.onShowTutoriasDetails = false;
    this.getCourses();
  }

  showGrupalCourses() {
    this.onGrupalCourse = true;
    this.onPersonalCourse = false;
    this.onTransactions = false;
    this.onShowTutoriasDetails = false;
    this.getAllGrupalCourses();
  }

  showTransfers() {
    this.onTransactions = true;
    this.onPersonalCourse = false;
    this.onGrupalCourse = false;
    this.onShowTutoriasDetails = false;
    this.getListOfRetirements();
  }

  goToDetailGroupStudentsModal(grupalCourse: grupalCourseEntity) {
    this.grupalCourseSelected = grupalCourse;
    if (this.grupalCourseSelected.studentes.length <= 0) {
      Swal.fire('Sin estudiantes', 'Este curso no cuenta algun estudiante inscrito', 'warning');
    }
    this.modalService.openModal();
  }

  goToEditGrupalCourse(grupalCourseToEdit: grupalCourseEntity) {
    if (this.grupalCourseSelectedToModify === undefined) {
      this.grupalCourseSelectedToModify = grupalCourseToEdit;
    }
    if (this.grupalCourseSelectedToModify !== undefined) {
      this.grupalCourseSelectedToModify = grupalCourseToEdit;
      this.modalService.openModal();
    }
  }

  goToEditTutoriaCourse(tutoriaCourseToEdit: courseEntity) {
    this.tutoriaCourseSelectedToModify = tutoriaCourseToEdit;
    this.modalService.openModal();
  }

  goToCreateGrupalCourse() {
    this.modalService.openModal();
  }

  goToCreateTutoriaCourse() {
    this.modalService.openModal();
  }

  updateCourses(event: any) {
    if (event) {
      this.grupalCourses = [];
      this.getAllGrupalCourses();
      this.modalService.closeModal();
    }
  }

  updateCoursesButton() {
    this.grupalCourses = [];
    this.getAllGrupalCourses();
    Swal.fire('Exito', 'Ahora podras ver los estudiantes inscritos recientemente en sus respectivos cursos grupales', 'success');
  }

  updateTutoriaCoursesNew(event: any) {
    if (event) {
      this.teacherCourses = [];
      this.getCourses();
    }
  }

  establishIdImage(id) {
    this.idImageToUpload = id;
    this.modalService.openModal();
  }

  establishGruaplIdImage(id) {
    this.idGruaplImageToUpload = id;
    this.modalService.openModal();
  }


  goToMeetUrl() {
    window.open(this.globalUrlMeet, '_blank');
  }

  getTeahcerImage() {
    if ((this.teacherFound.picture != null || this.teacherFound.picture.length >= 0) && this.teacherImage != "default.png") {
      this.teacherImage = this.teacherFound.picture;
    }
  }

  idTeacherToUploadImage() {
    this.idTeacherImageToUpload = this.teacherFound.id;
    this.modalService.openModal();
  }

  refreshPicture() {
    this.teacherImage = '';
    this.teacherService.getTeachersById(this.idTeacher).subscribe((resp) => {
      this.teacherFound = resp;
    });

    setTimeout(() => {
      this.teacherImage = this.teacherFound.picture;
    }, 1000)
  }

  // TIMER SECTION


  subscribeToTimerTeacherStudent(idTeacher: any, idStudent: any) {
    this.globalTeacherId = idTeacher;
    this.globalStudentId = idStudent;

    let endpointToTimmerChanel = `${this.timer_channel_subscribe}/${idTeacher}/${idStudent}`;

    this.socketClient.subscribe(endpointToTimmerChanel, e => {
      let responseFromAgent = JSON.parse(e.body);

      if (responseFromAgent.body.message == 'ANSWER_INITAL_TIMER_CONNECTION_TEACHER') {
        this.openTimmerModal();
      }

      if (responseFromAgent.body.message == 'ANSWER_TIMER_START') {
      }

      if (responseFromAgent.body.message == 'ANSWER_TIMER_STOP') {
        let teacherId = this.globalTeacherId;
        let studenId = this.globalStudentId;
        let timeOnClass = this.minutess;
        this.teacherService.reduceTimeToStudentAndAddToTeacher(teacherId, studenId, timeOnClass).subscribe((resp) => {
          this.timerResponse = resp;
        });
      }

    });

    setTimeout(() => {
      this.initialMessageOnTimerConnection(idTeacher, idStudent);
    }, 3000);
  }


  openTimmerModal() {
    Sw.fire({
      'title': `Tutoría en progreso`,
      'text': `¿ Iniciar cronometro ?`,
      'icon': `success`,
      showCloseButton: true,
      showCancelButton: true,
      showConfirmButton: this.showStart,
      confirmButtonText: `Inicar cronometro`,
      cancelButtonText: `Detener cronometro`,
      confirmButtonColor: '#17a2b8',
      cancelButtonColor: '#4d545a',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.showStart = false;
        this.startTimer(this.globalTeacherId, this.globalStudentId);
      }

    });
  }



  initialMessageOnTimerConnection(idTeacher: any, idStudent: any) {
    let body: any = {
      message: 'INITAL_TIMER_CONNECTION_TEACHER'
    }
    setTimeout(() => {
      this.webSocketService.sendEventToAgent(`${this.timer_channel_send}/${idTeacher}/${idStudent}`, body)
    }, 2000);
  }

  startTimer(idTeacher: any, idStudent: any) {
    this.globalIdTeacher = idTeacher;
    this.gloablIdStudent = idStudent;
    this.openTimerModal();
  }

  stopTimerr() {
    this.breakLopp = false;
    this.showPartOne = false;
    this.showPartTwo = true;
    this.stopTimer(this.globalTeacherId, this.globalStudentId);
  }

  startTimerr() {
    let body: any = {
      message: 'TIMER_START'
    }
    setTimeout(() => {
      this.webSocketService.sendEventToAgent(`${this.timer_channel_send}/${this.globalIdTeacher}/${this.gloablIdStudent}`, body)
    }, 2000);
    this.showPartOne = true;
    this.showStartButton = false;
    this.startTimmer();
    this.startTimmerSeconds();

  }

  stopTimer(idTeacher: any, idStudent: any) {
    let body: any = {
      message: 'TIMER_STOP'
    }
    setTimeout(() => {
      this.webSocketService.sendEventToAgent(`${this.timer_channel_send}/${idTeacher}/${idStudent}`, body)
    }, 2000);
  }

  openTimerModal() {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    this.boostrapModalService.open(this.editModal, ngbModalOptions);
  }

  startTimmer() {
    setTimeout(() => {
      this.counter++;
      if (this.counter < 400 && this.breakLopp) {
        this.minutess = this.counter;
        this.startTimmer();
      }
    }, 60000)
  }

  startTimmerSeconds() {
    setTimeout(() => {
      this.counterTwo++;
      if (this.counterTwo <= 60 && this.breakLopp) {
        this.secondss = this.counterTwo;
        if (this.counterTwo == 60) {
          this.counterTwo = 0;
        }
        this.startTimmerSeconds();
      }
    }, 1000)
  }

  backToHome() {
    this.router.navigate(['/home-loged']);
  }


  closeSession() {
    this.webSocketService.desconnectFromSocket();
    this.authService.logout();
  }

  playSound() {
    let sound = new Audio('../../../../assets/sound/notification.wav');
    sound.play();
  }

  updateTeacherModal() {
    this.teacherFoundToUpdate = this.teacherFound;
    this.modalService.openModal();
  }

  updateTeacherInfo(event: any) {
    if (event) {
      setTimeout(() => {
        this.teacherService.getTeachersById(this.idTeacher).subscribe(resp => {
          this.teacherFound = resp;
        })
      }, 2000);
    }
  }

  getDetailsOfTutorias() {
    this.teacherService.getTutoriasDetailsForTeacher(this.idTeacher).subscribe(resp => {
      this.dataSourceTwo = new MatTableDataSource(resp);
      if (this.dataSourceTwo.data.length > 0) {
        setTimeout(() => {
          this.dataSourceTwo.paginator = this.paginatorTwo;
          this.dataSourceTwo.sort = this.sortTwo;
        }, 1000);
      }
    });
  }

  makeRetirement() {
    if (this.teacherFound.money >= 10000) {
      Sw.fire({
        'title': `Solicitud retiro en proceso`,
        'text': `Al realizar la solicitud de retiro el saldo displonible actual (${this.teacherFound.money}) sera descontado a 0 COP ¿Desea continuar?`,
        'icon': `info`,
        showCloseButton: true,
        showCancelButton: true,
        showConfirmButton: this.showStart,
        confirmButtonText: `Realizar retiro`,
        cancelButtonText: `Cancelar retiro`,
        confirmButtonColor: '#17a2b8',
        cancelButtonColor: '#4d545a',
        allowOutsideClick: false
      }).then((result) => {
        if (result.isConfirmed) {
          this.openBankInformation();
          this.bankDetails = this.bankDetailsForm.value.bankInformation;
          let bodyToBeSendTransaction: any = {
            'name': `${this.teacherFound.name} ${this.teacherFound.lastName}`,
            'cost': this.teacherFound.money,
            'alreadyPaid': false,
            'teacherIdentifier': this.teacherFound.id
          };
          this.retirementService.saveRetirement(bodyToBeSendTransaction).subscribe(async resp => {
            resp;
            let bodyForEmail: any = {
              'idReference': resp.retirementId,
              'accountDetails': this.bankDetails,
              'idTeacher': this.teacherFound.id
            };
            await this.continueTransaction(bodyForEmail);
          });
        }
      });
    } else {
      Sw.fire('Error al realizar la transacción', 'Querido docente debe de contar con mas de 10.000 COP para realizar un retiro.', 'error');
    }
  }

  sendEmaiForNewRetirement(bodyForEmail: any) {
    this.retirementService.sentEmailForNewRetirement(bodyForEmail).subscribe( async resp => {
      await (this.succesfulMessage());
    });
  }

  openBankInformation() {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    this.boostrapModalService.open(this.bankModal, ngbModalOptions);
  }

  continueTransaction(bodyForEmail: any) {
    this.sentTransaction = true;
    if (this.sentTransaction) {
      this.sendEmaiForNewRetirement(bodyForEmail);
    }
  }

  succesfulMessage() {
    Sw.fire({
      'title': `Retiro realizado`,
      'text': `Se ha realizado de manera exitosa la peticion para el retiro`,
      'icon': `success`,
      showCloseButton: true,
      showCancelButton: false,
      confirmButtonText: `Continuar`,
      confirmButtonColor: '#17a2b8',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.getListOfRetirements();
      }
    });
  }

}
