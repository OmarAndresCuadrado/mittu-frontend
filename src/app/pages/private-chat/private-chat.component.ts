import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mensaje } from '../../interfaces/Mensaje';
import { WebSocketService } from '../../services/web-socket.service';
import { TeacherService } from '../../services/teacher.service';
import { StudentService } from '../../services/student.service';
import { teacherEntity } from '../../interfaces/teacherEntity';
import { studentEntity } from '../../interfaces/studentEntity';

@Component({
  selector: 'app-private-chat',
  templateUrl: './private-chat.component.html',
  styleUrls: ['./private-chat.component.css']
})
export class PrivateChatComponent implements OnInit {

  public mensaje: Mensaje = new Mensaje();
  public mensajes: Mensaje[] = [];
  public conectado: boolean = false;
  public escribiendo: string = '';
  public username: string;
  public teacher: teacherEntity;
  public student: studentEntity;
  public idFromLocalStorage: any;
  public primary: Boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private webSocketService: WebSocketService,
    private teacherService: TeacherService,
    private studentService: StudentService
  ) { }

  public idTeacher: any;
  public idStudent: any;
  public initialParams: any;

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.initialParams = {
        idTeacher: params['idTeacher'],
        idStudent: params['idStudent']
      }
    });

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

  newUser() {
    this.mensaje.tipo = "NUEVO_USUARIO";
    let payload = this.mensaje;
    this.mensaje.username = this.username;
    this.webSocketService.sendEventToAgent(`/app/private/chat/message/${this.idTeacher}/${this.idStudent}`, payload)
    this.mensajes = this.webSocketService.getMessages();
  }

  subscribeToPrivateChat() {
    this.webSocketService.subcribeToTopicPrivateChatStudentTeacher(this.idTeacher, this.idStudent);
    setTimeout(() => {
      this.newUser();
    }, 3000);
  }

  sendMessage() {
    this.mensaje.tipo = "MENSAJE";
    let payload = this.mensaje;
    this.webSocketService.sendEventToAgent(`/app/private/chat/message/${this.idTeacher}/${this.idStudent}`, payload)
    this.mensaje.texto = '';
    this.mensaje.username = this.username;
    this.mensajes = this.webSocketService.getMessages();
  }


}

