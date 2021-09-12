import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { WebSocketService } from '../../services/web-socket.service';
import Sw from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public arrayRoutes: any[] = [];
  public loged: boolean;
  public user: string;
  public noAuth: boolean;



  constructor(
    private atuhService: AuthService,
    private router: Router,
    private webSocketSergice: WebSocketService,
    public authService: AuthService
  ) {
    this.noAuth = false;
  }

  ngOnInit(): void {
    this.verify();
    if (this.authService.hasRole('ROLE_STUDENT')) {
      this.noAuth = true;
    } else if (this.authService.hasRole('ROLE_TEACHER')) {
      this.noAuth = true;
    } else if (this.authService.hasRole('ROLE_ADMIN')) {
      this.noAuth = true;
    } else {
      this.noAuth = this.authService.hasRole();
    }

    if (!this.noAuth) {
      this.swalAlert();
    }
  }

  swalAlert() {
    Sw.fire({
      title: 'Querido visitante',
      text: "Si deseas inscribirte a un curso grupal, tutoría o dictar clases en mittu, recuerda que debes estar registrado en la plataforma.",
      icon: 'info',
      showCancelButton: false,
      confirmButtonColor: '#17a2b8',
      cancelButtonColor: '#4d545a',
      confirmButtonText: 'Continuar',
      allowOutsideClick: false
    });
  }

  verify() {
    this.loged = this.atuhService.isAuthenticated();
    this.user = this.atuhService.user.username;
  }

  logoutt() {
    this.webSocketSergice.desconnectFromSocket();
    this.atuhService.logout();
  }

  teacherRegister() {
    this.router.navigate(['/register-teacher']);
  }

  studentRegister() {
    this.router.navigate(['/register-student']);
  }

  login() {
    this.router.navigate(['/login']);
  }

  myProfile() {
    this.router.navigate(['/student-panel']);
  }

  myProfileTeacher() {
    this.router.navigate(['/teacher-panel']);
  }

  myProfileAdmin() {
    this.router.navigate(['/admin-panel']);
  }

  goToRegisterStudent() {
    this.router.navigate(['/register-student']);
  }

  goToRegisterTeacher() {
    this.router.navigate(['/register-teacher']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

}
