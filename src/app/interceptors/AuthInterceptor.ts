
import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthService,
        private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(e => {
                if (e.status == 401) {
                    Swal.fire('Sin acceso', 'Debes ingresar primero para acceder a este recurso', 'info');

                    if (this.authService.isAuthenticated()) {
                        this.authService.logout();
                    }
                    this.router.navigate(['/login'])
                }

                if (e.status == 403) {
                    Swal.fire('Acceso denegado', 'No cuentas con acceso a este recurso', 'info');
                    this.router.navigate(['/home'])
                }
                return throwError(e);
            })
        );
    }
}