import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { userEntity } from '../interfaces/userEntity';
import { stringify } from 'querystring';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public environment = environment;
  public endpoint_student = environment.jwt.host;
  public appUser = environment.appCredentials.name;
  public appPass = environment.appCredentials.pass;
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });


  constructor(
    private http: HttpClient,
    private router: Router) { }

  private _user: userEntity;
  private _token: string;

  public get user(): userEntity {
    if (this._user != null) {
      return this._user;
    } else if (this._user == null && sessionStorage.getItem('user') != null) {
      this._user = JSON.parse(sessionStorage.getItem('user')) as userEntity;
      return this._user;
    }
    return new userEntity();
  }

  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token');
      return this.token;
    }
    return null;
  }

  login(data: any): Observable<any> {
    const credentials = btoa(this.appUser + ':' + this.appPass);
    const httpHeaders = new HttpHeaders(
      {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + credentials
      });

    let params = new URLSearchParams();
    let responseLogin: any;
    params.set('grant_type', 'password');
    params.set('username', data.value.email);
    params.set('password', data.value.password);
    return this.http.post<any>(this.endpoint_student, params.toString(), { headers: httpHeaders })
  }

  saveUser(accessToken: string): void {
    let token = this.decodeToken(accessToken);
    let studentId: any = '';
    let teacherId: any = '';
    let userId: any = '';
    let adminId: any = '';
    this._user = new userEntity();
    this._user.username = token.user_name;
    this._user.roles = token.authorities;
    studentId = token.studentId;
    teacherId = token.teacherId;
    userId = token.userId;
    adminId = token.adminId;
    sessionStorage.setItem('user', JSON.stringify(this._user));
    sessionStorage.setItem('studentId', JSON.stringify(studentId));
    sessionStorage.setItem('teacherId', JSON.stringify(teacherId));
    sessionStorage.setItem('userId', JSON.stringify(userId));
    sessionStorage.setItem('adminId', JSON.stringify(adminId));
  }

  saveToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  decodeToken(accessToken: string): any {
    if (accessToken != null) {
      let stringAccessToken = JSON.stringify(accessToken);
      return JSON.parse(atob(stringAccessToken.split(".")[1]));
    }
    return null;
  }

  isAuthenticated(): boolean {
    let token = this.decodeToken(this.token);
    if (((token != null) && (token.user_name) && (token.user_name.length > 0))) {
      return true;
    } else {
      return false
    }
  }

  hasRole(role?: string): boolean {
    if (this.user.roles.includes(role)) {
      return true;
    }
    return false;

  }


  logout(): void {
    this._token = null;
    this._user = null;
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
