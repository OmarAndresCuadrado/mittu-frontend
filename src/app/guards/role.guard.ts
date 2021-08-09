import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login'])
      return false;
    }

    let role = next.data['role'] as string;
    let roleb = next.data['roleb'] as string;
    let rolec = next.data['rolec'] as string;
    if (this.authService.hasRole(role) || this.authService.hasRole(roleb) || this.authService.hasRole(rolec)) {
      return true;
    }

    Swal.fire('Acceso denegado', 'No cuentas con acceso a este recurso', 'info');
    this.router.navigate(['/home'])
    return false;
  }

}
