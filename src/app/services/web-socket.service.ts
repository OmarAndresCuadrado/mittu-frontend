import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { environment } from '../../environments/environment.prod';
import Sw, { SweetAlertIcon } from 'sweetalert2';
import { IfStmt, THIS_EXPR, ThrowStmt } from '@angular/compiler/src/output/output_ast';
import { Mensaje } from '../interfaces/Mensaje';
import { TeacherService } from './teacher.service';


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private autenticationState: boolean = false;
  private endpoint_socket: string = environment.webSocket.host;
  private idTeacher: any;
  private idStudent: any;
  private client: Client;
  private response: any;
  private responseTopicPrivateChat: any
  private socket_teacher_state: any;
  private socket_teacher: any = '/topic/teacher/socket';
  private socket_teacher_on_chat: any = '/topic/teacher/state/chat';
  private socket_teacher_on_chat_final: any = '/topic/private/chat/message';
  private socket_teacher_on_chat_verification: any = '/topic/teacher/state/chat';
  private socket_teacher_private_chat_chanel: any = '/topic/private/chanel/teacher';
  private teacher_state: boolean;
  private teacher_state_chat: boolean;
  public mensaje: Mensaje = new Mensaje();
  public mensajes: Mensaje[] = [];
  public conectado: boolean = false;
  public escribiendo: string = '';
  private socket_teacher_notification_chanel: any = '/topic/notification/chanel/teacher'
  private timer_channel_send = '/app/teacher/student/timer';
  private timer_channel_subscribe = '/topic/teacher/student/timer';
  public url_meeet_for_session: any = '';

  constructor(
    private teacherService: TeacherService
  ) {
    this.client = new Client();
   }
   
  socketInitialConnection() {
    this.idTeacher = sessionStorage.getItem('teacherId');
    this.client.webSocketFactory = () => {
      return new SockJS(this.endpoint_socket)
    }
    this.getIdTeacher(); // esto se ira
    this.client.onConnect = (frame) => {

      this.suscribeToTopicTeacherSocket();
      this.suscribeToTopicTeacherState();
      this.suscribeToTopicPrivateChatVerification(this.idTeacher);
      this.suscribeToTopicPrivateChat('', '');
      this.subcribeToTopicPrivateChatStudentTeacher('', '');
      this.subcribeToPrivateChanelChatTeacher(this.idTeacher);
      this.suscribeToTimerChanel('', '');
      // this.subscrieToNotificationTeacherChanel('');
 
    }

    this.client.onDisconnect = (frame) => {
    }

    return this.client;
  }


  connectToSocket() {
    this.client.activate();
  }

  desconnectFromSocket() {
    this.client.deactivate();
  }

  sendEventToAgent(endpoint: any, payload: any, extra?: any) {
    if (extra) {
      let generalObject: any = {
        id: 0,
        idStudent: payload.idStudent,
        onChat: payload.onChat,
        tipo: extra.tipo
      };
      this.client.publish({
        destination: endpoint,
        body: JSON.stringify(generalObject)
      });
    } else {
      this.client.publish({
        destination: endpoint,
        body: JSON.stringify(payload)
      });
    }
  }

  getResponse() {
    return this.response;
  }

  getStateOfTeacher() {
    return this.teacher_state;
  }

  getStateOfTeacherChat() {
    return this.teacher_state_chat;
  }

  getResponseTopicPrivateChat() {
    return this.responseTopicPrivateChat;
  }


  // TOPICOS PARA LA INSCRIPCION ENTRE EL AGENTE Y EL CLIENTE
  suscribeToTopicTeacherSocket() {
    this.client.subscribe(this.socket_teacher, e => {
      this.response = JSON.parse(e.body);
    });
  }

  suscribeToTimerChanel(idTeacher: any, idStudent: any ) {
    let endpointForPrivateChat = `${this.timer_channel_subscribe}/${idTeacher}/${idStudent}`
    this.client.subscribe(endpointForPrivateChat, e => {
      this.response = JSON.parse(e.body);
    });
  }
  suscribeToTopicTeacherState() {
    this.client.subscribe(this.socket_teacher_state, e => {
      let state_teacher = JSON.parse(e.body);
      this.teacher_state = state_teacher;
    });
  }

  suscribeToTopicPrivateChat(idTeacher: any, idStudent: any) {
    let endpointForPrivateChat = `${this.socket_teacher_on_chat}/${idTeacher}/${idStudent}`
    this.client.subscribe(endpointForPrivateChat, e => {
      let state_on_chat = JSON.parse(e.body);
    });
  }


  suscribeToTopicPrivateChatVerification(idTeacher: any) {
    let endpointForPrivateChatVerification = `${this.socket_teacher_on_chat_verification}/${idTeacher}`
    this.client.subscribe(endpointForPrivateChatVerification, e => {
      let state_on_chat = JSON.parse(e.body);
      return this.teacher_state_chat = state_on_chat;
    });
  }

  subcribeToTopicPrivateChatStudentTeacher(idTeacher: any, idStudent: any) {
    let endpointForPrivateChat = `${this.socket_teacher_on_chat_final}/${idTeacher}/${idStudent}`

    this.client.subscribe(endpointForPrivateChat, e => {
      let mensaje: Mensaje = JSON.parse(e.body) as Mensaje;
      mensaje.fecha = new Date(mensaje.fecha);
      if (!this.mensaje.color && mensaje.tipo == 'NUEVO_USUARIO' && this.mensaje.username == mensaje.username) {
        this.mensaje.color = mensaje.color;
      }
      this.mensajes.push(mensaje);
    });
    return this.mensajes;
  }

  subcribeToPrivateChanelChatTeacher(idTeacher: any) {
    let globalIdTeacher = 0;
    if (idTeacher !== null || idTeacher !== 'null') {
      globalIdTeacher = idTeacher;

    } else {
      globalIdTeacher = this.idTeacher;
    }
    let endpointPrivateChanelChatTeacher = `${this.socket_teacher_private_chat_chanel}/${globalIdTeacher}`;
    this.client.subscribe(endpointPrivateChanelChatTeacher, e => {
      let reponseFromAgent = JSON.parse(e.body);
      let mensaje: any = reponseFromAgent.body as any;
      mensaje.fecha = new Date(mensaje.fecha);
      if (!this.mensaje.color && mensaje.tipo == 'NUEVO_USUARIO' && this.mensaje.username == mensaje.username) {
        this.mensaje.color = mensaje.color;
      }
      this.mensajes.push(mensaje);
    });
    return this.mensajes;
  }





  getIdTeacher() {
    if (this.idTeacher != 'null') {
      this.socket_teacher_state = `/topic/teacher/state/${this.idTeacher}`;
    }
  }

  getIdStudent(IDStudent?: any) {
    return IDStudent;
  }

  getMessages() {
    return this.mensajes;
  }
}
