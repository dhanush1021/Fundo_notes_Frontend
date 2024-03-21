import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../Services/Auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate{
  constructor(private auth:AuthService,private route:Router){}
  canActivate(): boolean  {
    if(! this.auth.gettokenforAuth()){
      this.route.navigateByUrl("/login")
    }
    return this.auth.gettokenforAuth()
  }

}