import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { WebSocketService } from '../../services/web-socket.service';

@Component({
  selector: 'app-logged-nvbar',
  templateUrl: './logged-nvbar.component.html',
  styleUrls: ['./logged-nvbar.component.css']
})
export class LoggedNvbarComponent implements OnInit {

  constructor(
    private router: Router,
    public authService: AuthService,
    private webSocketService: WebSocketService

  ) { }

  ngOnInit(): void {
  }

  backToHome() {
    this.router.navigate(['/home-loged']);
  }

  backToHomeTeacher() {
    this.router.navigate(['/home-loged']);
  }

  backToHomeAdmin() {
    this.router.navigate(['/home-loged']);
  }

  closeSession() {
    this.webSocketService.desconnectFromSocket();
    this.authService.logout();
  }

}
