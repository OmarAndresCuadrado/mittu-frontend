import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { userEntity } from '../../interfaces/userEntity';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Client } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { environment } from '../../../environments/environment.prod';
import { WebSocketService } from '../../services/web-socket.service';
import { async } from '@angular/core/testing';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  user: userEntity;
  authenticated: boolean;
  booleanPassword: boolean;
  public conected: boolean = false;
  public environment = environment;
  private client: Client;
  private autenticationState: boolean = false;
  private endpoint_socket: string = environment.webSocket.host;
  private idTeacher;
  private destination_topic = '/app/teacher/socket';
  public notification_topic_chanel = '/notification/chanel/teacher';
  public parent: any;
  public punochilduno: boolean;
  public punochilddos: boolean;
  public punochildtres: boolean;
  public punochildcuatro: boolean;
  public parentFlag: boolean;
  public idAdmin: any;
  public idStudent: any;


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private socketService: WebSocketService) {
    this.user = new userEntity();
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit(): void {
    this.authenticated = false;
    this.authenticated = this.authService.isAuthenticated();
    if (this.authenticated) {
      this.router.navigate(['/home-loged']);
    }

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]]
    });
  }


  login() {
    if (!this.loginForm.valid) {
      alert('Alguna regla de validación no se está cumpliendo');
      return;
    }

    this.authService.login(this.loginForm).subscribe(async resp => {

      await this.getDetailsForLogin(resp);

      setTimeout(() => {
        this.client = this.socketService.socketInitialConnection();
        this.socketService.connectToSocket();
      }, 2000);

      setTimeout(() => {
        let mensajeInicial = { mensaje: 'SESION_START' };
        this.socketService.sendEventToAgent(this.destination_topic, mensajeInicial)
      }, 4000);


    }, (err) => {
      if (err.status == 400) {
        Swal.fire('Credenciales invalidas', 'El usuario o la contraseña son invalidas', 'error');
      }
    });
  }


  funcion() {
    this.parentFlag = true;
    this.punochilduno = true;
    this.punochilddos = true;
    this.punochildtres = true;
    this.punochildcuatro = true;

  }

  funcionDischek() {
    this.parentFlag = false;
    this.punochilduno = false;
    this.punochilddos = false;
    this.punochildtres = false;
    this.punochildcuatro = false;
  }

  teacherRegister() {
    this.router.navigate(['/register-teacher']);
  }

  studentRegister() {
    this.router.navigate(['/register-student']);
  }

  getDetailsForLogin(resp: any) {
    let user = this.authService.user;
    this.authService.saveUser(resp.access_token);
    this.authService.saveToken(resp.access_token);
    this.idStudent = sessionStorage.getItem('studentId');
    this.idTeacher = sessionStorage.getItem('teacherId');
    this.idAdmin = sessionStorage.getItem('adminId');
    if (this.idStudent != 'null') {
      this.router.navigate(['/home-loged']);

    } else if (this.idTeacher != 'null') {
      this.router.navigate(['/teacher-panel']);

    } else if (this.idAdmin == 1) {
      this.router.navigate(['/admin-panel']);
    }
  }

}
