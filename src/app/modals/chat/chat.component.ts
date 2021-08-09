import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { GrupalCoursesService } from '../../services/grupal-courses.service';
import { Router } from '@angular/router';
import { teacherEntity } from '../../interfaces/teacherEntity';
import { TeacherService } from '../../services/teacher.service';
import { WebSocketService } from '../../services/web-socket.service';
import { StudentService } from '../../services/student.service';
import { Mensaje } from '../../interfaces/Mensaje';
import { studentEntity } from '../../interfaces/studentEntity';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Input() idStudent: any;
  @Input() idTeacher: any;
  @Input() urlMeet: any;
  public mensaje: Mensaje = new Mensaje();
  public mensajes: Mensaje[] = [];
  public conectado: boolean = false;
  public escribiendo: string = '';
  public username: string;
  public teacher: teacherEntity;
  public student: studentEntity;
  public idFromLocalStorage: any;
  public primary: Boolean;
  public initialParams: any;
  @Output() goToMeetEventEmiter = new EventEmitter<any>();
  

  constructor(
    private modalService: ModalService,
    private webSocketService: WebSocketService,
    private teacherService: TeacherService,
    private studentService: StudentService
  ) { }

  ngOnInit(): void {

    this.mensajes = [];
      this.initialParams = {
        idTeacher: this.idTeacher,
        idStudent: this.idStudent
    };

    if (sessionStorage.getItem('teacherId') != 'null') {
      this.teacher = new teacherEntity();
      let idFromLocalStorage = sessionStorage.getItem('teacherId');
      this.teacherService.getTeachersById(idFromLocalStorage).subscribe((resp) => {
        this.teacher = resp;
        this.username = `${this.teacher.name} ${this.teacher.lastName}`.toString();
        this.mensaje.color = 'blue';
        this.primary = true;
      });

    } if (sessionStorage.getItem('studentId') != 'null') {
      this.student = new studentEntity();
      let idFromLocalStorage = sessionStorage.getItem('studentId');
      this.studentService.getStudentsById(idFromLocalStorage).subscribe((resp) => {
        this.student = resp;
        this.username = `${this.student.name} ${this.student.lastName}`.toString();
        this.mensaje.color = 'green';
        this.primary = false;
      });
    }


    if (this.initialParams.idTeacher != null || this.initialParams.idTeacher != undefined) {
      this.idTeacher = this.initialParams.idTeacher;
    }

    if (this.initialParams.idTeacher != null || this.initialParams.idTeacher != undefined) {
      this.idStudent = this.initialParams.idStudent;
    }

    setTimeout(() => {
      this.subscribeToPrivateChat();
    }, 3000);
  }

  closeModal() {
    this.modalService.closeModal();
    this.mensajes = [];
  }

  newUser() {
    this.mensaje.tipo = "NUEVO_USUARIO";
    let payload = this.mensaje;
    this.mensaje.username = this.username;
    this.webSocketService.sendEventToAgent(`/app/private/chanel/teacher/${this.idTeacher}`, payload)
    this.mensajes = this.webSocketService.getMessages();
  }

  subscribeToPrivateChat() {
    this.webSocketService.subcribeToPrivateChanelChatTeacher(this.idTeacher);
    setTimeout(() => {
      this.newUser();
    }, 3000);
  }

  sendMessage() {
    this.mensaje.tipo = "MENSAJE";
    let payload = this.mensaje;
    this.webSocketService.sendEventToAgent(`/app/private/chanel/teacher/${this.idTeacher}`, payload)
    this.mensaje.texto = '';
    this.mensaje.username = this.username;
    this.mensajes = this.webSocketService.getMessages();
  }

  goToMeet(){
    this.goToMeetEventEmiter.emit(true);
  }

  onKeydown(event: any) {
    if(event.key === 'Enter') {
      this.sendMessage();
    }
  }
  
}
