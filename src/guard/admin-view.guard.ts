import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from 'src/models/role';

@Injectable({
  providedIn: 'root'
})
export class AdminViewGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
    if(localStorage.getItem('role') == Role.ADMIN)
      return true;
    if(localStorage.getItem('role') == Role.USER)
      return false;
    return false;
  }
  
}
